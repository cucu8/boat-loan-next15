// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServerSession } from "next-auth";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { authOptions } from "@/libs/auth";

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
  title: "Tekne Kiralama Türkiye | Uygun Fiyatlı Yat ve Gulet Kiralama",
  description:
    "Türkiye'nin en güzel koylarında tekne kiralama hizmetleri. Uygun fiyatlarla yat, gulet ve katamaran seçenekleriyle unutulmaz bir deniz tatili planlayın.",
  keywords:
    "tekne kiralama, yat kiralama, gulet kiralama, katamaran kiralama, Türkiye tekne, deniz tatili, mavi tur, İstanbul tekne kiralama, Fethiye tekne kiralama",
  openGraph: {
    title: "Tekne Kiralama Türkiye | Uygun Fiyatlı Yat ve Gulet Kiralama",
    description:
      "Türkiye'nin en güzel koylarında tekne kiralama hizmetleri. Uygun fiyatlarla yat, gulet ve katamaran seçenekleriyle unutulmaz bir deniz tatili planlayın.",
    url: "https://www.tekneniz.com.tr",
    siteName: "Tekne Kiralama Türkiye",
    images: [
      {
        url: "https://www.tekneniz.com.tr/images/og-image.jpg", // Paylaşıldığında görünecek görsel
        width: 1200,
        height: 630,
        alt: "Tekne Kiralama",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    // Twitter kartları için meta etiketleri
    card: "summary_large_image",
    title: "Tekne Kiralama Türkiye | Uygun Fiyatlı Yat ve Gulet Kiralama",
    description:
      "Türkiye'nin en güzel koylarında tekne kiralama hizmetleri. Uygun fiyatlarla yat, gulet ve katamaran seçenekleriyle unutulmaz bir deniz tatili planlayın.",
    creator: "@tekneniz", // Twitter kullanıcı adınız
    images: ["https://www.tekneniz.com.tr/images/twitter-image.jpg"],
  },
  robots: {
    // Arama motoru botlarına yönelik talimatlar
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  // Alternatif diller için canonik veya hreflang etiketleri eklenebilir
  // alternates: {
  //   canonical: 'https://www.tekneniz.com.tr',
  //   languages: {
  //     'en-US': 'https://www.tekneniz.com.tr/en',
  //     'de-DE': 'https://www.tekneniz.com.tr/de',
  //   },
  // },
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
      </body>
    </html>
  );
}
