import { BoatCardModel } from "@/models";
import ImageCarousel from "./ImageCarousel";
import EditButtonGroup from "./EditButtonGroup";

export default function BoatCardEdit({ boat }: { boat: BoatCardModel }) {
  return (
    <div className="bg-sky-500  rounded-2xl shadow-md overflow-hidden w-full md:w-[400px]">
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
              className={boat.isAvailable ? "text-min-500" : "text-red-600"}
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
      <EditButtonGroup id={boat.id} name={boat.name} />
    </div>
  );
}
