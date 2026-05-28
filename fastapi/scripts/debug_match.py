"""Diagnose why sync_cluster_ids reports rows as unmatched.

Picks one ``.db`` file (default: Kuliner) and one row whose name + lat/lng
should obviously match a Postgres row in the corresponding dataset, then
prints both sides so we can see exactly where the join key diverges.
"""

from __future__ import annotations

import os
import sqlite3
import sys
from pathlib import Path

from dotenv import load_dotenv
import psycopg
from psycopg.rows import dict_row

FASTAPI_ROOT = Path(__file__).resolve().parent.parent
DB_DIR = FASTAPI_ROOT / "db"
ENV_FILE = FASTAPI_ROOT / ".env"
DB_KEY = sys.argv[1] if len(sys.argv) > 1 else "Indonesia.Batam.Kuliner.202406162232"

load_dotenv(ENV_FILE)
db_url = os.environ["POSTGRES_URL"]

# 1) Read first 5 SQLite rows
sqlite_path = DB_DIR / f"{DB_KEY}.db"
conn = sqlite3.connect(sqlite_path)
conn.row_factory = sqlite3.Row
sqlite_rows = list(
    conn.execute(
        "SELECT name, latitude, longitude, cluster_id FROM places "
        "WHERE name IS NOT NULL AND latitude IS NOT NULL AND longitude IS NOT NULL "
        "LIMIT 5"
    )
)
conn.close()

print(f"=== SQLite ({sqlite_path.name}) — first 5 ===")
for r in sqlite_rows:
    print(f"  name={r['name']!r}")
    print(f"  lat={r['latitude']!r}  ({type(r['latitude']).__name__})")
    print(f"  lng={r['longitude']!r}  ({type(r['longitude']).__name__})")
    print(f"  cluster_id={r['cluster_id']!r}")
    print()

# 2) Look up the same names in Postgres and print stored coords
with psycopg.connect(db_url, row_factory=dict_row) as pg:
    cur = pg.execute(
        "SELECT id FROM datasets WHERE db_key = %s", (DB_KEY,)
    )
    ds = cur.fetchone()
    assert ds, f"no dataset for {DB_KEY}"
    dataset_id = ds["id"]

    print(f"=== Postgres dataset_id={dataset_id} ===")
    for r in sqlite_rows:
        rows = pg.execute(
            """
            SELECT id, place_name, latitude, longitude, cluster_id
            FROM places
            WHERE dataset_id = %s AND place_name = %s
            LIMIT 3
            """,
            (dataset_id, r["name"]),
        ).fetchall()
        print(f"  search by name={r['name']!r}")
        if not rows:
            print("    (no Postgres row with that exact name)")
            continue
        for pgrow in rows:
            print(
                f"    pg id={pgrow['id']} "
                f"lat={pgrow['latitude']!r} lng={pgrow['longitude']!r} "
                f"cluster={pgrow['cluster_id']!r}"
            )
        print()
