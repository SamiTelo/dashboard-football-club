import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const twoFAValidated = req.cookies.get("twoFAValidated")?.value === "true";
  const { pathname } = req.nextUrl;

  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAuthRoute =
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register");

  //  Protection dashboard
  // - Dashboard accessible seulement si refreshToken existant
  // - ET si 2FA validé pour admin/superadmin
  if (isDashboardRoute) {
    if (!refreshToken) {
      // Pas connecté
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (!twoFAValidated) {
      // 2FA non validé pour admin/superadmin
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  //  Empêcher l’accès à login/register si déjà connecté et 2FA validé
  if (isAuthRoute && refreshToken && twoFAValidated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// Routes sur lesquelles le middleware s’applique
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};