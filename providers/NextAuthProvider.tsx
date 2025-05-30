// app/providers/NextAuthProvider.tsx
"use client"; // Bu dosyanın bir Client Component olduğunu belirtir

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import React from "react";

interface NextAuthProviderProps {
  children: React.ReactNode;
  session: any; // `Session` türünü next-auth'tan import edebilirsiniz
}

export default function NextAuthProvider({
  children,
  session,
}: NextAuthProviderProps) {
  return (
    <SessionProvider session={session}>
      <Toaster />
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
