import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const server = process.env.LARAVEL_API_URL ?? process.env.NEXT_PUBLIC_SERVER;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(`${server}/api/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { message: "Gagal menghubungi server." },
      { status: 503 }
    );
  }
}