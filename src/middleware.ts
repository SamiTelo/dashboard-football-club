import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

// Decode access_token
async function getPayload(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;

  const twoFARequired =
    req.cookies.get("twoFARequired")?.value === "true";

  const twoFAValidated =
    req.cookies.get("twoFAValidated")?.value === "true";

  const { pathname } = req.nextUrl;

  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAdminRoute = pathname.startsWith("/dashboard/users");

  const isAuthRoute =
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register") ||
    pathname.startsWith("/auth/verify-2fa");

  // ---------------------------------------------
  // 1. PROTECTION DASHBOARD
  // ---------------------------------------------
  if (isDashboardRoute) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // 2FA check
    if (twoFARequired && !twoFAValidated) {
      return NextResponse.redirect(
        new URL("/auth/verify-2fa", req.url)
      );
    }

    // ---------------------------------------------
    // RBAC ADMIN ROUTES
    // ---------------------------------------------
    if (isAdminRoute) {
      const payload = await getPayload(accessToken);

      const role = payload?.role;

      if (!["ADMIN", "SUPERADMIN"].includes(role as string)) {
        return NextResponse.redirect(
          new URL("/dashboard?error=unauthorized", req.url)
        );
      }
    }
  }

  // ---------------------------------------------
  // BLOQUER AUTH SI DÉJÀ CONNECTÉ
  // ---------------------------------------------
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// ---------------------------------------------
// matcher
// ---------------------------------------------
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};