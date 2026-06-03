import { NextRequest, NextResponse } from "next/server";

const LARAVEL_URL = process.env.LARAVEL_API_URL ?? "http://localhost:8001";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const res = await fetch(`${LARAVEL_URL}/api/user/projects/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json(
        { success: false, message: "Project not found", detail: err },
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