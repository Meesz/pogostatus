import { jwtVerify, JWTPayload } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  if (!token) {
    return redirectToSignIn(req);
  }

  try {
    const secret = getJwtSecret();
    const { payload } = await verifyToken(token.value, secret);

    // You can use the decoded payload here if needed
    // For example: req.headers.set("X-User-Id", payload.sub);

    return NextResponse.next();
  } catch (err) {
    return handleInvalidToken(req);
  }
}

function getJwtSecret(): Uint8Array {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return new TextEncoder().encode(jwtSecret);
}

async function verifyToken(
  token: string,
  secret: Uint8Array
): Promise<{ payload: JWTPayload }> {
  return await jwtVerify(token, secret);
}

function redirectToSignIn(req: NextRequest): NextResponse {
  return NextResponse.redirect(new URL("/signin", req.nextUrl.origin));
}

function handleInvalidToken(req: NextRequest): NextResponse {
  const response = redirectToSignIn(req);
  response.cookies.delete("token");
  return response;
}

export const config = {
  matcher: ["/"],
};
