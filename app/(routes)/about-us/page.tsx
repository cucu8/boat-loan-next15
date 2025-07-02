import Container from "@/components/Container";
import { Metadata } from "next";
import React from "react";
import { Anchor, Star, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda | Tekne Kirala Gez",
  description:
    "Tekne Kirala Gez ekibi, vizyonumuz, misyonumuz ve denizcilik tutkumuz hakkında bilgi alın.",
  keywords: "hakkımızda, tekne kiralama, ekip, vizyon, misyon, denizcilik",
  openGraph: {
    title: "Hakkımızda | Tekne Kirala Gez",
    description:
      "Tekne Kirala Gez ekibi, vizyonumuz, misyonumuz ve denizcilik tutkumuz hakkında bilgi alın.",
    url: "https://teknekiralagez.com/about-us",
    siteName: "Tekne Kirala Gez",
    images: [
      {
        url: "https://teknekiralagez.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tekne Kirala Gez - Hakkımızda",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hakkımızda | Tekne Kirala Gez",
    description:
      "Tekne Kirala Gez ekibi, vizyonumuz, misyonumuz ve denizcilik tutkumuz hakkında bilgi alın.",
    creator: "@tekneniz",
    images: ["https://teknekiralagez.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://teknekiralagez.com/about-us",
  },
};

const AboutUs = () => {
  return (
    <Container>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-10 bg-gradient-to-b from-sky-100 to-white rounded-2xl shadow-md mb-8">
        <Anchor className="w-12 h-12 text-sky-600 mb-4" />
        <h1 className="text-4xl font-extrabold text-navy mb-2 text-center">
          Denizle Buluşmanın En Kolay Yolu
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl text-center">
          Türkiye&apos;nin dört bir yanındaki tekne sahipleriyle deniz
          tutkunlarını buluşturan, yenilikçi ve ücretsiz bir platformuz.
          Hayalinizdeki tekneye ulaşmak artık çok daha kolay!
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <Star className="w-8 h-8 text-yellow-400 mb-2" />
          <h2 className="text-2xl font-bold mb-2 text-navy">Misyonumuz</h2>
          <p className="text-gray-700 text-center">
            Tekne kiralamayı herkes için erişilebilir, kolay ve güvenilir hale
            getirmek. Tekne sahiplerinin teknelerini ücretsiz listeleyebildiği,
            deniz severlerin ise aradıkları tekneyi kolayca bulabildiği bir
            ortam sunmak.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <Heart className="w-8 h-8 text-pink-500 mb-2" />
          <h2 className="text-2xl font-bold mb-2 text-navy">Vizyonumuz</h2>
          <p className="text-gray-700 text-center">
            Türkiye&apos;nin en kapsamlı ve güvenilir tekne kiralama platformu
            olmak; denizcilik kültürünü yaygınlaştırmak ve herkesin denizle
            buluşmasını sağlamak.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="flex flex-col items-center py-6">
        <h3 className="text-xl font-bold text-navy mb-2">
          Denizle buluşmaya hazır mısınız?
        </h3>
        <p className="text-gray-700 mb-4 text-center">
          Hemen ücretsiz üye olun, teknenizi listeleyin veya hayalinizdeki
          tekneyi keşfedin!
        </p>
        <a
          href="/register"
          className="bg-sky-500 hover:bg-sky-400 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
        >
          Ücretsiz Üye Ol
        </a>
      </section>
    </Container>
  );
};

export default AboutUs;
