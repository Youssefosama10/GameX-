import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const AUTH_PATHS = ["/cart", "/wishlist", "/profile", "/orders", "/library", "/checkout"];

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    if (token?.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  if (AUTH_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart",
    "/cart/:path*",
    "/wishlist",
    "/wishlist/:path*",
    "/profile",
    "/profile/:path*",
    "/orders",
    "/orders/:path*",
    "/library",
    "/library/:path*",
    "/checkout",
    "/checkout/:path*",
    "/dashboard",
    "/dashboard/:path*",
  ],
};
