import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const twoFARequired = req.cookies.get("twoFARequired")?.value === "true";
  const twoFAValidated = req.cookies.get("twoFAValidated")?.value === "true";
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAuthRoute =
    pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register");

  // ---------------------------
  // Protection dashboard
  // ---------------------------
  if (isDashboardRoute) {
    if (!refreshToken) {
      // Pas connecté → redirect login
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // Bloque seulement si 2FA requis pour l'utilisateur
    if (twoFARequired && !twoFAValidated) {
      return NextResponse.redirect(new URL("/auth/verify-2fa", req.url));
    }
  }

  // ---------------------------
  // Empêcher login/register si déjà connecté
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
