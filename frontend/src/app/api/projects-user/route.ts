import { NextRequest, NextResponse } from "next/server";

const LARAVEL_URL = process.env.LARAVEL_API_URL ?? "http://localhost:8001";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const params = new URLSearchParams();
  [
    "category",
    "city_id",
    "search",
    "price_sort",
    "page",
    "per_page",
    "project_date_year",
    "last_update_year",
  ].forEach((key) => {
    const val = searchParams.get(key);
    if (val) params.set(key, val);
  });

  try {
    const res = await fetch(`${LARAVEL_URL}/api/user/projects?${params}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json(
        { success: false, message: "Laravel error", detail: err },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { success: false, message: "Cannot reach Laravel API" },
      { status: 503 }
    );
  }
}