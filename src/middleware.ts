// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  // --------- Routes protégées ---------
  const isDashboardRoute = pathname.startsWith("/dashboard");

  if (isDashboardRoute) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // Vérifier le refreshToken via API proxy /api/auth/refresh
    try {
      const res = await fetch(`${req.nextUrl.origin}/api/auth/refresh`, {
        method: "POST",
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      });

      if (!res.ok) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // --------- Routes d'auth ---------
  const isAuthRoute =
    pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register");

  if (isAuthRoute && refreshToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};