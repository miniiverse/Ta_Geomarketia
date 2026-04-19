import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isProtectedUserRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/transactions") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/myanalysis");
  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  // Kalau tidak ada token, langsung redirect tanpa hit Laravel
  if ((isAdminRoute || isProtectedUserRoute) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Kalau ada token, validasi ke Laravel dan ambil role dari sana
  let role: string | null = null;
  if (token) {
    try {
      const server = process.env.NEXT_PUBLIC_SERVER;
      const res = await fetch(`${server}/api/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        // Token tidak valid / expired → hapus cookie dan redirect login
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("token");
        response.cookies.delete("role");
        return response;
      }

      const data = await res.json();
      role = data.user.role; // "admin" atau "user" — dari database, bukan cookie
    } catch {
      // Laravel tidak bisa dihubungi
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Admin route: harus role admin
  if (isAdminRoute) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // User route: admin tidak boleh masuk
  if (isProtectedUserRoute) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard-admin", request.url));
    }
  }

  // Sudah login tapi akses halaman auth → redirect sesuai role
  if (isAuthRoute && token) {
    const destination = role === "admin" ? "/admin/dashboard-admin" : "/dashboard";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "/transactions/:path*",
    "/myanalysis/:path*",
    "/login",
    "/register",
  ],
};