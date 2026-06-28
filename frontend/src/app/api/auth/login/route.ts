import { NextRequest, NextResponse } from "next/server";
 
export async function POST(request: NextRequest) {
  const body = await request.json();
  const server = process.env.LARAVEL_API_URL;
 
  try {
    const res = await fetch(`${server}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
 
    const data = await res.json();
 
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }
 
    const response = NextResponse.json({
      success: true,
      user: data.user,
    });
 
    response.cookies.set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 30,
    });
 
    return response;
  } catch {
    return NextResponse.json(
      { message: "Failed to connect to the server." },
      { status: 503 }
    );
  }
}