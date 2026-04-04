import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const twoFARequired = req.cookies.get("twoFARequired")?.value === "true";
  const twoFAValidated = req.cookies.get("twoFAValidated")?.value === "true";
  const { pathname } = req.nextUrl;

  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAuthRoute =
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register") ||
    pathname.startsWith("/auth/verify-2fa"); // inclure verify-2fa pour éviter boucle

  // ---------------------------
  // Protection dashboard
  // ---------------------------
  if (isDashboardRoute) {
    // Pas connecté → login
    if (!refreshToken) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // 2FA requis mais pas validé → verify-2fa
    if (twoFARequired && !twoFAValidated) {
      return NextResponse.redirect(new URL("/auth/verify-2fa", req.url));
    }
  }

  // ---------------------------
  // Empêcher login/register si déjà connecté et 2FA validé
  // ---------------------------
  if (isAuthRoute && refreshToken && (!twoFARequired || twoFAValidated)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// Routes sur lesquelles le middleware s’applique
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};