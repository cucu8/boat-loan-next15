import Container from "@/components/Container";
import ErrorComponent from "@/components/Error";
import GetAllBoats from "@/components/GetAllBoats";
import { withFetch } from "@/libs";
import { BoatCardModel } from "@/models";

export default async function Home() {
  const { data: boats, error } = await withFetch<BoatCardModel[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/boats`,
    []
  );

  return (
    <Container>
      {error ? (
        <p className="text-red-500 text-center">
          <ErrorComponent />
        </p>
      ) : (
        <GetAllBoats boats={boats} />
      )}
    </Container>
  );
}

export const metadata = {
  title: "Tekne Kirala Gez | Türkiye'nin En Kolay Tekne Kiralama Platformu",
  description:
    "Türkiye'nin dört bir yanında uygun fiyatlı, güvenilir ve kolay tekne kiralama. Yat, gulet, katamaran ve daha fazlası. Hemen keşfet!",
  keywords:
    "tekne kiralama, yat kiralama, gulet kiralama, katamaran kiralama, deniz tatili, mavi tur, Türkiye, uygun fiyat, güvenilir",
  openGraph: {
    title: "Tekne Kirala Gez | Türkiye'nin En Kolay Tekne Kiralama Platformu",
    description:
      "Türkiye'nin dört bir yanında uygun fiyatlı, güvenilir ve kolay tekne kiralama. Yat, gulet, katamaran ve daha fazlası. Hemen keşfet!",
    url: "https://teknekiralagez.com/",
    siteName: "Tekne Kirala Gez",
    images: [
      {
        url: "https://teknekiralagez.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tekne Kirala Gez - Ana Sayfa",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tekne Kirala Gez | Türkiye'nin En Kolay Tekne Kiralama Platformu",
    description:
      "Türkiye'nin dört bir yanında uygun fiyatlı, güvenilir ve kolay tekne kiralama. Yat, gulet, katamaran ve daha fazlası. Hemen keşfet!",
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
    canonical: "https://teknekiralagez.com/",
  },
};
