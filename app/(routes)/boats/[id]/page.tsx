import Container from "@/components/Container";
import ImageCarousel from "@/components/ImageCarousel";
import { BoatCardModel } from "@/models/BoatCard";
import { IdParams } from "@/models/General";

export default async function BoatDetailPage({ params }: IdParams) {
  const { id } = await params;
  const res = await fetch(`http://localhost:3000/api/boats/${id}`);
  const boat: BoatCardModel = await res.json();

  return (
    <Container extraClasses="flex flex-col items-center gap-6 md:px-20 py-8">
      <div className="w-full max-w-4xl bg-navy text-neutral rounded-2xl shadow-xl overflow-hidden">
        {/* Görseller */}
        <ImageCarousel
          imageUrls={boat.imageUrls}
          height="h-[300px] md:h-[400px]"
          width="w-full"
        />

        {/* İçerik */}
        <div className="p-6 flex flex-col gap-4">
          {/* Başlık ve Fiyat */}
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
                <span className="font-semibold">Telefon:</span>{" "}
                {boat.ownerPhoneNumber}
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
