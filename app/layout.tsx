import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { ThemeChanger } from "@/components/ThemeToggle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-screen flex flex-col overflow-hidden`}
      >
        <ThemeProvider>
          {/* Navbar: Sabit */}
          <div className="shrink-0">
            <Navbar />
          </div>

          {/* Main: Scrollable */}
          <main className="flex-1 overflow-auto">{children}</main>

          {/* Footer: Sabit */}
          <div className="shrink-0">
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
