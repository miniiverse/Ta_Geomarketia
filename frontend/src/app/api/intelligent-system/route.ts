import { NextRequest, NextResponse } from "next/server";

const FASTAPI =
  process.env.FASTAPI_URL ??
  process.env.NEXT_PUBLIC_FASTAPI_URL ??
  process.env.NEXT_PUBLIC_FASTAPI ??
  "http://127.0.0.1:8080";

function jsonError(message: string, status = 500) {
  return NextResponse.json({ message }, { status });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const dbName = searchParams.get("db_name");

  if (!dbName) return jsonError("db_name required", 400);

  try {
    if (action === "categories") {
      const res = await fetch(
        `${FASTAPI}/api/v1/${encodeURIComponent(dbName)}/places/categories`,
        { cache: "no-store" },
      );

      if (!res.ok) {
        return jsonError(`FastAPI categories error: ${res.status}`, res.status);
      }

      const data: unknown = await res.json();
      return NextResponse.json(data);
    }

    if (action === "recommendation") {
      const category = searchParams.get("category");
      const limit = searchParams.get("limit") ?? "5";
      const subdistrict =
        searchParams.get("subdistrict") ?? searchParams.get("sub_district");

      if (!category) return jsonError("category required", 400);

      const params = new URLSearchParams({
        category,
        limit,
      });
      if (subdistrict) params.set("subdistrict", subdistrict);

      const res = await fetch(
        `${FASTAPI}/api/v1/${encodeURIComponent(dbName)}/recommendation/location?${params.toString()}`,
        {
          method: "POST",
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
          body: "{}",
        },
      );

      if (!res.ok) {
        return jsonError(
          `FastAPI recommendation error: ${res.status}`,
          res.status,
        );
      }

      const data: unknown = await res.json();
      return NextResponse.json(data);
    }

    return jsonError("Unsupported intelligent-system action", 400);
  } catch (error) {
    return jsonError(
      error instanceof Error ? error.message : "Failed to load data",
    );
  }
}
