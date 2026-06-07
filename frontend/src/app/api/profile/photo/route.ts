import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const server = process.env.LARAVEL_API_URL ?? process.env.NEXT_PUBLIC_SERVER;

  if (!token) {
    return NextResponse.json({ message: "Unauthenticated." }, { status: 401 });
  }

  // Ambil FormData dari request, forward langsung ke Laravel
  const formData = await request.formData();

  const res = await fetch(`${server}/api/profile/photo`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      // Jangan set Content-Type — fetch otomatis urus boundary FormData
    },
    body: formData,
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}