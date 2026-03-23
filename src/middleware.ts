import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  const { pathname } = request.nextUrl;

  // Routes protégées
  const isDashboardRoute = pathname.startsWith("/dashboard");

  // Rediriger vers login si pas connecté
  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Empêcher accès login/register si déjà connecté
  const isAuthRoute =
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register");

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};