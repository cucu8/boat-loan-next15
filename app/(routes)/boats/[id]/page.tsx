import Container from "@/components/Container";
import ImageCarousel from "@/components/ImageCarousel";
import { BoatCardModel } from "@/models";
import { notFound } from "next/navigation";

// Veri çekme fonksiyonu sayfanın dışında tanımlanmış, bu harika!
async function getBoatData(id: string): Promise<BoatCardModel | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boats/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      // Eğer API 404 döndürürse veya veri bulunamazsa null döndür
      if (res.status === 404) {
        return null;
      }
      console.error(`Failed to fetch boat with ID ${id}: ${res.statusText}`);
      return null;
    }
    const boat: BoatCardModel = await res.json();
    return boat;
  } catch (error) {
    console.error(`Error fetching boat with ID ${id}:`, error);
    return null;
  }
}

export async function generateMetadata({ params }: any) {
  const { id } = params;
  const boat = await getBoatData(id);

  // Eğer tekne bulunamazsa, özel bir "bulunamadı" meta verisi dön
  // Bu durumda sayfa içeriği de 404 döndürmelidir (aşağıda notFound() kullanımı ile)
  if (!boat) {
    return {
      title: "Tekne Bulunamadı | Tekne Kiralama Hizmeti",
      description:
        "Aradığınız tekne veya yat bulunamadı. Lütfen diğer ilanlarımıza göz atın.",
      robots: {
        index: false, // Bu sayfayı indeksleme
        follow: false,
      },
    };
  }

  //const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${boat.name} Kiralama - ${boat.districtName} | ${boat.pricePerHour}₺/saat | Tekne Kiralama`,

    description: `${boat.name} teknesini ${boat.districtName} bölgesinde ${boat.pricePerHour}₺/saat fiyatla kiralayın. ${boat.capacity} kişi kapasiteli bu eşsiz tekne ile unutulmaz bir deneyim yaşayın. Tekne özellikleri ve iletişim bilgileri.`,

    // Anahtar Kelimeler: Arama motorlarına sayfanın içeriği hakkında ipuçları verir.
    keywords: [
      boat.name.toLowerCase(),
      `${boat.districtName.toLowerCase()} tekne kiralama`,
      `${boat.name.toLowerCase()} kiralama`,
      `${boat.name.toLowerCase()} fiyat`,
      `${boat.capacity} kişilik tekne`,
      "tekne kiralama",
      "yat kiralama",
      "gulet kiralama",
      "deniz tatili",
      `${boat.districtName.toLowerCase()} yat kiralama`,
    ],

    // // Open Graph (Sosyal Medya Paylaşımı): Facebook, LinkedIn gibi platformlarda URL paylaşıldığında nasıl görüneceğini belirler.
    // openGraph: {
    //   title: `${boat.name} Kiralama - ${boat.districtName} | ${boat.pricePerHour}₺/saat`,
    //   description: `Tekneniz.com.tr üzerinden ${boat.name} teknesini ${boat.districtName} bölgesinde kiralayın. ${boat.description.substring(0, 150)}...`, // Açıklamadan bir kesit
    //   url: `https://www.siteniz.com/boats/${boat.id}`, // Kendi domain adresinizi ve dinamik URL'yi ekleyin
    //   siteName: 'Tekne Kiralama Türkiye',
    //   images: [
    //     {
    //       url: boat.images && boat.images.length > 0 ? boat.images[0] : '[https://www.siteniz.com/images/default-boat-image.jpg](https://www.siteniz.com/images/default-boat-image.jpg)', // Teknenin ilk görseli veya varsayılan bir görsel
    //       width: 1200,
    //       height: 630,
    //       alt: `${boat.name} - Tekne Görseli`,
    //     },
    //     ...previousImages, // Global layout'tan gelen diğer görselleri de ekle
    //   ],
    //   locale: 'tr_TR',
    //   type: 'product', // Bu bir ürün veya hizmet olduğu için 'product' tipi daha uygun olabilir.
    //   // Schema.org'daki Product şemasının karşılığı.
    //   // Daha spesifik olarak, eğer bir ürün listesi veya belirli bir hizmetse farklı tipler de kullanılabilir.
    //   // Örneğin: "offer" veya "service"
    // },

    // // Twitter Kartları: Twitter'da URL paylaşıldığında nasıl görüneceğini belirler.
    // twitter: {
    //   card: 'summary_large_image', // Geniş görsel içeren bir kart tipi
    //   title: `${boat.name} Kiralama - ${boat.districtName} | ${boat.pricePerHour}₺/saat`,
    //   description: `Tekneniz.com.tr üzerinden ${boat.name} teknesini ${boat.districtName} bölgesinde kiralayın.`,
    //   creator: '@kullaniciadiniz', // Kendi Twitter kullanıcı adınızı ekleyin
    //   images: [boat.images && boat.images.length > 0 ? boat.images[0] : '[https://www.siteniz.com/images/twitter-default-boat-image.jpg](https://www.siteniz.com/images/twitter-default-boat-image.jpg)'],
    // },

    // Robots: Arama motoru botlarına indeksleme ve takip talimatları.
    robots: {
      index: true,
      follow: true,
      nocache: true, // Eğer içerik sık güncelleniyorsa, botların daha sık ziyaret etmesini teşvik edebilir
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false, // Görsellerin indekslenmesine izin ver
        "max-video-preview": -1, // Video önizlemesi için kısıtlama yok
        "max-snippet": -1, // Snippet uzunluğu için kısıtlama yok
      },
    },

    // Canonical URL: Yinelenen içerik sorunlarını önlemek için sayfanın tercih edilen URL'sini belirtir.
    alternates: {
      canonical: `https://www.siteniz.com/boats/${boat.id}`, // Dinamik ve temiz URL'niz
    },
  };
}

export default async function BoatDetailPage({ params }: any) {
  const { id } = params;
  const boat = await getBoatData(id);
  if (!boat) {
    notFound();
  }

  return (
    <Container extraClasses="flex flex-col items-center gap-6 md:px-20 py-8">
      <div className="w-full max-w-4xl bg-navy text-neutral rounded-2xl shadow-xl overflow-hidden">
        {/* Görseller */}
        <ImageCarousel
          images={boat.images}
          height="h-[300px] md:h-[400px]"
          width="w-full"
        />

        <div className="p-6 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <h1 className="text-3xl font-bold">{boat.name}</h1>
            <span className="text-xl font-semibold bg-sand text-black px-4 py-1 rounded-lg shadow">
              {boat.pricePerHour} ₺ / saat
            </span>
          </div>

          {/* Açıklama */}
          <p className="text-base">{boat.description}</p>

          {/* Etiketler */}
          <div className="flex flex-wrap gap-3">
            <span className="bg-mint-500 text-white px-4 py-1 rounded-full text-sm">
              Kapasite: {boat.capacity} kişi
            </span>
            <span
              className={`px-4 py-1 rounded-full text-sm font-medium
          ${
            boat.isAvailable ? "bg-sky-500 text-white" : "bg-red-400 text-white"
          }`}
            >
              {boat.isAvailable ? "Uygun" : "Mevcut Değil"}
            </span>
            <span className="bg-sky-400 text-white px-4 py-1 rounded-full text-sm">
              Lokasyon: {boat.districtName}
            </span>
          </div>

          {/* Sahip Bilgisi */}
          <div className="mt-4 border-t border-neutral-100 pt-4 flex flex-col gap-1 text-sm">
            <div>
              <span className="font-semibold">Sahibi:</span> {boat.ownerName}
            </div>
            {boat.ownerPhoneNumber && (
              <div>
                <span className="font-semibold">Telefon:</span>
                {boat.ownerPhoneNumber}
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
