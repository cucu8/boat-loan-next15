// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServerSession } from "next-auth";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { authOptions } from "@/libs/auth";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  weight: ["400"], // Specify the weights you need (e.g., '400', '700')
  subsets: ["latin"], // Specify the subsets you need
  variable: "--font-dancing-script", // Assign a CSS variable
  display: "swap", // This is default and recommended
});

export const metadata: Metadata = {
  title: {
    default: "Tekne Kiralama - Teknekiralagez.com | Türkiye'nin En Güvenilir Tekne Kiralama Platformu",
    template: "%s | Teknekiralagez.com"
  },
  description: "Türkiye'nin en güvenilir tekne kiralama platformu. İstanbul, Bodrum, Antalya ve tüm sahil şehirlerinde uygun fiyatlarla tekne kiralayın. Günlük tekne kiralama, yat turu ve deniz tatili için hemen rezervasyon yapın.",
  keywords: "tekne kiralama, bot kiralama, yat kiralama, deniz tatili, tekne turu, istanbul tekne kiralama, bodrum tekne kiralama, antalya tekne kiralama, günlük tekne kiralama, yat turu, deniz gezisi, tekne rezervasyonu",
  authors: [{ name: "Teknekiralagez.com" }],
  creator: "Teknekiralagez.com",
  publisher: "Teknekiralagez.com",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://teknekiralagez.com"),
  openGraph: {
    title: "Tekne Kiralama - Teknekiralagez.com | Türkiye'nin En Güvenilir Tekne Kiralama Platformu",
    description: "Türkiye'nin en güvenilir tekne kiralama platformu. İstanbul, Bodrum, Antalya ve tüm sahil şehirlerinde uygun fiyatlarla tekne kiralayın. Günlük tekne kiralama, yat turu ve deniz tatili için hemen rezervasyon yapın.",
    url: "https://teknekiralagez.com",
    siteName: "Teknekiralagez.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tekne Kiralama - Teknekiralagez.com",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tekne Kiralama - Teknekiralagez.com | Türkiye'nin En Güvenilir Tekne Kiralama Platformu",
    description: "Türkiye'nin en güvenilir tekne kiralama platformu. İstanbul, Bodrum, Antalya ve tüm sahil şehirlerinde uygun fiyatlarla tekne kiralayın.",
    images: ["/og-image.jpg"],
    creator: "@teknekiralagez",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://teknekiralagez.com",
  },
  verification: {
     google: "google-site-verification",
   },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} h-screen flex flex-col`}
      >
        <StructuredData type="website" />
        <StructuredData type="organization" />
        <StructuredData type="service" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthProvider session={session}>
            <div className="fixed top-0 left-0 w-full z-50">
              <Navbar />
            </div>
            <main className="flex-1 overflow-auto pt-[64px] pb-[64px]">
              {children}
            </main>
            <div className="fixed bottom-0 left-0 w-full z-50">
              <Footer />
            </div>
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
