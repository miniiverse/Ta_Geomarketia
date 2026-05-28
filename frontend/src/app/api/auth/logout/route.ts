import { NextRequest, NextResponse } from "next/server";
 
export async function POST(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const server = process.env.LARAVEL_API_URL;
 
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
      // Tetap lanjut logout meskipun request ke Laravel gagal
    }
  }
 
  const response = NextResponse.json({ success: true });
  response.cookies.set("token", "", { maxAge: 0, path: "/" });
  return response;
}