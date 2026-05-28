import { NextRequest, NextResponse } from "next/server";
 
export async function POST(request: NextRequest) {
  const body = await request.json();
  const server = process.env.LARAVEL_API_URL;
 
  try {
    const res = await fetch(`${server}/api/password/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: body.email,
        otp: body.otp,
      }),
    });
 
    const data = await res.json();
 
    if (!res.ok) {
      const message =
        data.errors?.otp?.[0] ?? data.message ?? "OTP verification failed.";
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