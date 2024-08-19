"use client";
import { SessionProvider } from "next-auth/react";
import StatusPage from "./statuspage/page";

export default function Home() {
  return (
    <SessionProvider>
      <StatusPage />
    </SessionProvider>
  );
}
