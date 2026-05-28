"""Apply Drizzle SQL migrations directly via psycopg.

Useful when ``drizzle-kit migrate`` hangs against the Supabase transaction
pooler. Reads the migration files from the frontend repo, picks up the
ones not yet recorded in ``drizzle.__drizzle_migrations``, and applies
them in order.

Usage::

    python scripts/apply_migrations.py            # apply pending migrations
    python scripts/apply_migrations.py --dry-run  # preview what would run
    python scripts/apply_migrations.py --force    # re-apply everything

Env vars: same as the ETL — ``POSTGRES_URL`` (preferred), then
``SUPABASE_DB_URL``, then ``DATABASE_URL``. Read from ``fastapi/.env``.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import sys
from pathlib import Path

try:
    from dotenv import load_dotenv
except ImportError:  # pragma: no cover
    def load_dotenv(*_a, **_kw):  # type: ignore[misc]
        return False

import psycopg

FASTAPI_ROOT = Path(__file__).resolve().parent.parent
REPO_ROOT = FASTAPI_ROOT.parent
MIGRATIONS_DIR = REPO_ROOT / "frontend" / "lib" / "db" / "migrations"
META_JOURNAL = MIGRATIONS_DIR / "meta" / "_journal.json"
ENV_FILE = FASTAPI_ROOT / ".env"

DB_URL_KEYS = ("POSTGRES_URL", "SUPABASE_DB_URL", "DATABASE_URL")


def resolve_db_url() -> str:
    if ENV_FILE.exists():
        load_dotenv(ENV_FILE, override=False)
    for key in DB_URL_KEYS:
        v = os.environ.get(key)
        if v:
            return v
    raise SystemExit(
        "No Postgres URL found. Set one of "
        f"{', '.join(DB_URL_KEYS)} in fastapi/.env"
    )


def load_journal() -> list[dict]:
    """Load the Drizzle meta journal so we apply migrations in order."""
    if not META_JOURNAL.exists():
        raise SystemExit(f"Journal not found: {META_JOURNAL}")
    with META_JOURNAL.open("r", encoding="utf-8") as fh:
        data = json.load(fh)
    entries = data.get("entries", [])
    return sorted(entries, key=lambda e: e["idx"])


def hash_for(sql: str) -> str:
    """Match drizzle-kit's hashing scheme: sha256 of the migration SQL."""
    return hashlib.sha256(sql.encode("utf-8")).hexdigest()


def ensure_ledger(conn: psycopg.Connection) -> None:
    with conn.cursor() as cur:
        cur.execute('CREATE SCHEMA IF NOT EXISTS "drizzle"')
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS "drizzle"."__drizzle_migrations" (
                id SERIAL PRIMARY KEY,
                hash TEXT NOT NULL,
                created_at BIGINT
            )
            """
        )


def applied_hashes(conn: psycopg.Connection) -> set[str]:
    with conn.cursor() as cur:
        cur.execute('SELECT hash FROM "drizzle"."__drizzle_migrations"')
        return {row[0] for row in cur.fetchall()}


def split_statements(sql: str) -> list[str]:
    """Drizzle separates statements with `--> statement-breakpoint`.

    Falls back to a naive splitter only if that marker is absent.
    """
    marker = "--> statement-breakpoint"
    if marker in sql:
        parts = [p.strip() for p in sql.split(marker)]
    else:
        parts = [p.strip() for p in sql.split(";")]
    return [p for p in parts if p]


def apply(dry_run: bool, force: bool) -> int:
    journal = load_journal()
    db_url = resolve_db_url()
    print(f"→ Connecting to {db_url.split('@')[-1]}")

    with psycopg.connect(db_url, autocommit=False) as conn:
        ensure_ledger(conn)
        already = set() if force else applied_hashes(conn)
        print(f"→ {len(already)} migration(s) already recorded")

        any_applied = False
        for entry in journal:
            tag = entry["tag"]
            sql_path = MIGRATIONS_DIR / f"{tag}.sql"
            if not sql_path.exists():
                print(f"  ! {tag}.sql missing — skipped")
                continue

            sql = sql_path.read_text(encoding="utf-8")
            digest = hash_for(sql)
            if digest in already and not force:
                print(f"  · {tag}  (already applied)")
                continue

            print(f"  → {tag}  ({sql_path.stat().st_size:,} bytes)")
            statements = split_statements(sql)
            with conn.cursor() as cur:
                for stmt in statements:
                    cur.execute(stmt)
                cur.execute(
                    'INSERT INTO "drizzle"."__drizzle_migrations" (hash, created_at) '
                    "VALUES (%s, %s)",
                    (digest, entry.get("when", 0)),
                )
            any_applied = True

        if dry_run:
            print("→ Dry run — rolling back")
            conn.rollback()
        else:
            conn.commit()
            print("→ Committed" if any_applied else "→ Nothing to do")

    return 0


def register(tag: str, dry_run: bool) -> int:
    """Record a migration in the ledger without running its SQL.

    Use this when a migration's effects are already present in the
    database (e.g. it was applied successfully but the ledger insert
    failed, or you adopted an existing schema).
    """
    journal = load_journal()
    entry = next((e for e in journal if e["tag"] == tag), None)
    if entry is None:
        raise SystemExit(
            f"Unknown migration tag '{tag}'. Available: "
            + ", ".join(e["tag"] for e in journal)
        )

    sql_path = MIGRATIONS_DIR / f"{tag}.sql"
    digest = hash_for(sql_path.read_text(encoding="utf-8"))
    db_url = resolve_db_url()
    print(f"→ Connecting to {db_url.split('@')[-1]}")

    with psycopg.connect(db_url, autocommit=False) as conn:
        ensure_ledger(conn)
        if digest in applied_hashes(conn):
            print(f"  · {tag}  (already in ledger — nothing to do)")
            return 0
        with conn.cursor() as cur:
            cur.execute(
                'INSERT INTO "drizzle"."__drizzle_migrations" (hash, created_at) '
                "VALUES (%s, %s)",
                (digest, entry.get("when", 0)),
            )
        if dry_run:
            print("→ Dry run — rolling back")
            conn.rollback()
        else:
            conn.commit()
            print(f"→ Registered {tag}.")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument(
        "--force",
        action="store_true",
        help="Re-apply every migration in the journal, ignoring the ledger.",
    )
    parser.add_argument(
        "--register",
        metavar="TAG",
        help="Record TAG in the ledger without running its SQL. Useful when "
        "a migration's effects are already present in the database.",
    )
    args = parser.parse_args()
    if args.register:
        return register(args.register, dry_run=args.dry_run)
    return apply(dry_run=args.dry_run, force=args.force)


if __name__ == "__main__":
    raise SystemExit(main())
