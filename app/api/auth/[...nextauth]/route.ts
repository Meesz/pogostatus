// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Password",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.password) {
          return null;
        }

        // Fetch the user with id 1 from the database
        const user = await prisma.user.findUnique({
          where: {
            id: "c03e4a92-85dc-45d0-a4f9-24aa4bb574ee",
          },
        });

        if (!user) {
          return null;
        }

        // Compare the entered password with the stored password
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (isValidPassword) {
          // If the password is correct, return the user object
          return { id: user.id.toString(), name: "Authenticated User" };
        }

        // Return null if the password is incorrect
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
});

export { handler as GET, handler as POST };
