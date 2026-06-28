import { NextRequest, NextResponse } from "next/server";
 
export async function POST(request: NextRequest) {
  const body = await request.json();
  const server = process.env.LARAVEL_API_URL;

  console.log("SERVER:", server);
 
  try {
    const res = await fetch(`${server}/api/password/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email: body.email }),
    });
 
    const data = await res.json();
 
    if (!res.ok) {
      const message =
        data.errors?.email?.[0] ?? data.message ?? "Failed to send OTP.";
      return NextResponse.json({ message }, { status: res.status });
    }
 
    return NextResponse.json({ success: true, message: data.message });
  } catch {
    return NextResponse.json(
      { message: "Failed to connect to the server." },
      { status: 503 }
    );
  }
}