"use client";
import { BoatCardModel } from "@/models/BoatCard";
import { Carousel } from "react-responsive-carousel";

export default function BoatCard({ boat }: { boat: BoatCardModel }) {
  console.log(boat.imageUrls[0]);
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full md:w-[400px]">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        useKeyboardArrows
        autoPlay={false}
        className="w-full h-64"
      >
        {boat.imageUrls.map((url, idx) => (
          <div key={idx} className="h-64 w-full">
            <img
              src={`https://localhost:7229/${boat.imageUrls[idx]}`}
              alt={`Image ${idx}`}
              className="object-cover h-64 w-full"
            />
          </div>
        ))}
      </Carousel>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1">{boat.name}</h2>
        <p className="text-sm text-gray-500 mb-2">{boat.description}</p>
        <div className="text-sm text-gray-700 space-y-1">
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
            <strong>Durum:</strong>{" "}
            <span
              className={boat.isAvailable ? "text-green-600" : "text-red-600"}
            >
              {boat.isAvailable ? "Müsait" : "Dolu"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
