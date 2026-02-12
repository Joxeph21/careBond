import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  CONFIG,
  INSTITUTION_ONLY_ROUTE,
  SUPER_ADMIN_ROUTES,
} from "./utils/config";

const PUBLIC_ROUTES = [
  "/login",
  "/forgot-password",
  "/create-password",
  "/2fa",
  "/verify",
];

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const serverCookies = await cookies();

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  const accessToken = serverCookies.get(CONFIG.ACCESS_TOKEN_IDENTIFIER)?.value;
  const refreshTokenValue = serverCookies.get(
    CONFIG.REFRESH_TOKEN_IDENTIFIER,
  )?.value;

  if (!refreshTokenValue && !isPublicRoute) {
    console.log("Middleware: ⛔No refresh token found, redirecting to login");
    const callbackUrl = encodeURIComponent(
      req.nextUrl.pathname + req.nextUrl.search,
    );
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, req.nextUrl.origin),
    );
  }

  const role = serverCookies.get(CONFIG.ADMIN_TYPE_IDENTIFIER)?.value;

  const isSuperAdminRoute = SUPER_ADMIN_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  const isInstitutionRoute = INSTITUTION_ONLY_ROUTE.some((route) =>
    pathname.startsWith(route),
  );



  const notAllowedUrl = new URL("/not-allowed", req.nextUrl.origin);

  if (isSuperAdminRoute && role !== "super_admin") {
    return NextResponse.redirect(notAllowedUrl);
  }

  if (isInstitutionRoute && role === "super_admin") {
    return NextResponse.redirect(notAllowedUrl);
  }

  const response = NextResponse.next();

  if (refreshTokenValue && !accessToken && !isPublicRoute) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/auth/token/refresh/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refreshTokenValue }),
        },
      );

      if (res.ok) {
        const data = await res.json();

        response.cookies.set(CONFIG.ACCESS_TOKEN_IDENTIFIER, data.access, {
          ...CONFIG.BASE_COOKIE_OPTIONS,
        });

        if (data.refresh) {
          response.cookies.set(CONFIG.REFRESH_TOKEN_IDENTIFIER, data.refresh, {
            ...CONFIG.BASE_COOKIE_OPTIONS,
          });
        }

        console.log("Middleware: ✅ Tokens refreshed successfully");
      } else {
        console.log("Middleware: ❌ Refresh failed, clearing cookies");
        response.cookies.delete(CONFIG.ACCESS_TOKEN_IDENTIFIER);
        response.cookies.delete(CONFIG.REFRESH_TOKEN_IDENTIFIER);
      }
    } catch (error) {
      console.error("Middleware: Refresh error", error);
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
