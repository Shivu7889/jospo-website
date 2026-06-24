import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page and auth API through without auth check
  if (pathname === "/admin/login" || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    const isSecure = request.nextUrl.protocol === "https:";
    
    // NextAuth v5 / Auth.js uses authjs.session-token while v4 uses next-auth.session-token
    const cookieName = request.cookies.has("__Secure-authjs.session-token")
      ? "__Secure-authjs.session-token"
      : request.cookies.has("authjs.session-token")
      ? "authjs.session-token"
      : request.cookies.has("__Secure-next-auth.session-token")
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";

    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      cookieName,
      secureCookie: isSecure,
    });

    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
