import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const server = process.env.NEXT_PUBLIC_SERVER;

  if (token) {
    try {
      await fetch(`${server}/api/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch {
    }
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("token", "", { maxAge: 0, path: "/" });
  response.cookies.set("role", "", { maxAge: 0, path: "/" });
  return response;
}