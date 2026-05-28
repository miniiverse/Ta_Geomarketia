import { NextRequest, NextResponse } from "next/server";
 
export async function POST(request: NextRequest) {
  const body = await request.json();
  const server = process.env.LARAVEL_API_URL;
 
  try {
    const res = await fetch(`${server}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
 
    const data = await res.json();
 
    if (!res.ok) {
      // Tangkap pesan validasi dari Laravel (termasuk error Gmail)
      const message =
        data.errors?.email?.[0] ??
        data.errors?.username?.[0] ??
        data.errors?.password?.[0] ??
        data.message ??
        "Registration failed.";
      return NextResponse.json({ message }, { status: res.status });
    }
 
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Failed to connect to the server." },
      { status: 503 }
    );
  }
}