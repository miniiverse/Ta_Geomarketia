import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const server = process.env.LARAVEL_API_URL ?? process.env.NEXT_PUBLIC_SERVER;

  if (!token) {
    return NextResponse.json({ message: "Unauthenticated." }, { status: 401 });
  }

  const body = await request.json();

  const res = await fetch(`${server}/api/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}