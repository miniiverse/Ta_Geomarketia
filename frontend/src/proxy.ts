import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
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

  if ((isAdminRoute || isProtectedUserRoute) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && !token) {
    return NextResponse.next();
  }

  let role: string | null = null;
  if (token) {
    try {
      const server = process.env.LARAVEL_API_URL ?? process.env.NEXT_PUBLIC_SERVER;
      const res = await fetch(`${server}/api/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        if (isAuthRoute) {
          const response = NextResponse.next();
          response.cookies.delete("token");
          response.cookies.delete("role");
          return response;
        }

        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("token");
        response.cookies.delete("role");
        return response;
      }

      const data = await res.json();
      role = data.user.role;
    } catch {
      if (isAuthRoute) return NextResponse.next();
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (isAdminRoute) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (isProtectedUserRoute) {
    if (role === "admin") {
      return NextResponse.redirect(
        new URL("/admin/dashboard-admin", request.url),
      );
    }
  }

  if (isAuthRoute && token) {
    const destination =
      role === "admin" ? "/admin/dashboard-admin" : "/dashboard";
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
