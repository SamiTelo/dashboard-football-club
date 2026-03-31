import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  // --------- Routes protégées ---------
  const isDashboardRoute = pathname.startsWith("/dashboard");

  // Si l'utilisateur n'est pas connecté, redirige vers login
  if (isDashboardRoute && !refreshToken) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  } 

  // --------- Routes d'auth ---------
  const isAuthRoute =
    pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register");

  // Si l'utilisateur est déjà connecté, bloque l'accès aux pages login/register
  if (isAuthRoute && refreshToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Si aucune condition, continuer
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};