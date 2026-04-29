import { NextRequest, NextResponse } from "next/server";

const LARAVEL_URL = process.env.LARAVEL_API_URL ?? "http://localhost:8001";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); 
  const province_id = searchParams.get("province_id");

  let endpoint = "";
  if (type === "categories") endpoint = "/api/user/categories";
  else if (type === "provinces") endpoint = "/api/user/provinces";
  else if (type === "cities")
    endpoint = `/api/user/cities${province_id ? `?province_id=${province_id}` : ""}`;
  else
    return NextResponse.json(
      { success: false, message: "Invalid type" },
      { status: 400 },
    );

  try {
    const res = await fetch(`${LARAVEL_URL}${endpoint}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { success: false, message: "Cannot reach Laravel" },
      { status: 503 },
    );
  }
}
