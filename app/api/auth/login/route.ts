import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { SignJWT } from "jose"; // Import SignJWT from jose
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  // Fetch user from the database
  const user = await prisma.user.findUnique({
    where: { id: "513a2908-4529-4d5a-afaa-232ed4b7fd60" },
  });

  if (!user) {
    return new Response(
      JSON.stringify({ message: "Invalid email or password" }),
      { status: 401 }
    );
  }

  // Check password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return new Response(
      JSON.stringify({ message: "Invalid email or password" }),
      { status: 401 }
    );
  }

  // Ensure the JWT secret is defined
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  // Create JWT token using jose
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);

  // Set the cookie with the JWT token
  return new Response(JSON.stringify({ message: "Login successful" }), {
    status: 200,
    headers: {
      "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=3600;`,
    },
  });
}