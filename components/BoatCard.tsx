import { BoatCardModel } from "@/models";
import Link from "next/link";
import ImageCarousel from "./ImageCarousel";

export default function BoatCard({ boat }: { boat: BoatCardModel }) {
  return (
    <div className="bg-sky-500 rounded-2xl shadow-md overflow-hidden w-full md:w-[400px]">
      <ImageCarousel imageUrls={boat.imageUrls} />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1">{boat.name}</h2>
        <p className="text-sm mb-2">{boat.description}</p>
        <div className="text-sm space-y-1">
          <p>
            <strong>Fiyat/saat:</strong> {boat.pricePerHour}₺
          </p>
          <p>
            <strong>Kapasite:</strong> {boat.capacity} kişi
          </p>
          <p>
            <strong>İlçe:</strong> {boat.districtName}
          </p>
          <p>
            <strong>Sahibi:</strong> {boat.ownerName}
          </p>
          <p>
            <strong>Durum:</strong>
            <span
              className={boat.isAvailable ? "text-green-600" : "text-red-600"}
            >
              {boat.isAvailable ? "Müsait" : "Dolu"}
            </span>
          </p>
          <p>
            <strong>Telefon Numarası</strong>
            <span>{boat.ownerPhoneNumber}</span>
          </p>
        </div>
      </div>
      <Link href={`/boats/${boat.id}`}>
        <button className="bg-navy text-neutral w-full h-10 cursor-pointer">
          Kirala
        </button>
      </Link>
    </div>
  );
}
