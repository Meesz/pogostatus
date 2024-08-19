// middleware.ts
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const url = req.nextUrl.clone();

  if (!token) {
    if (url.pathname === "/") {
      return NextResponse.next();
    } else if (url.pathname !== "/signin") {
      // Use req.nextUrl instead of req.url to avoid Invalid URL error
      return NextResponse.redirect(new URL("/signin", req.nextUrl.origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // Protect all routes except for specific Next.js system routes
};
