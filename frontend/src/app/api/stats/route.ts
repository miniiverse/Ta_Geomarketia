import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const SERVER = process.env.NEXT_PUBLIC_SERVER;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${SERVER}/api/stats`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message ?? "Gagal mengambil data stats.");

    return NextResponse.json(data);
  } catch (error) {
    console.error("Stats Error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data dari server" },
      { status: 500 }
    );
  }
}