import { NextRequest, NextResponse } from "next/server";

const SERVER = process.env.LARAVEL_URL ?? process.env.NEXT_PUBLIC_SERVER;

function getToken(request: NextRequest) {
  return request.cookies.get("token")?.value;
}

export async function GET(request: NextRequest) {
  const token = getToken(request);
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const res = await fetch(`${SERVER}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!res.ok) throw new Error(`Laravel error: ${res.status}`);

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error("users GET error:", err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
