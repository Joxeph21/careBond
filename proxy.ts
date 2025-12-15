import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { CONFIG } from "./utils/config";

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
    pathname.startsWith(route)
  );

  const refresh = serverCookies.get(CONFIG.REFRESH_TOKEN_IDENTIFIER)?.value;

  if (!refresh && !isPublicRoute) {
    console.log("Middleware: ⛔No refresh token found, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }



  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

