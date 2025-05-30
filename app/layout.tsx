// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // authOptions'ın doğru yolu
import NextAuthProvider from "@/providers/NextAuthProvider"; // Yeni oluşturduğumuz Client Component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // getServerSession bir Server Component'te çağrılabilir, bu yüzden burada kalabilir.
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-screen flex flex-col overflow-hidden`}
      >
        {/* SessionProvider ve diğer Client Component'leri buraya taşıdık */}
        <NextAuthProvider session={session}>
          <div className="shrink-0">
            <Navbar />
          </div>

          <main className="flex-1 overflow-auto">{children}</main>

          <div className="shrink-0">
            <Footer />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
