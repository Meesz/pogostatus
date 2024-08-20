import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  let decoded;
  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl.origin));
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token.value, secret);
    decoded = payload;

    return NextResponse.next();
  } catch (err) {
    // Clear the invalid token
    const response = NextResponse.redirect(
      new URL("/signin", req.nextUrl.origin)
    );
    response.cookies.delete("token"); // Ensure token is deleted
    return response;
  }
}

export const config = {
  matcher: ["/"],
};
