import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

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
      <Toaster />
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-screen flex flex-col overflow-hidden`}
      >
        <ThemeProvider>
          <div className="shrink-0">
            <Navbar />
          </div>

          <main className="flex-1 overflow-auto">{children}</main>

          <div className="shrink-0">
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
