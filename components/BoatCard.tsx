"use client";
import { BoatCardModel } from "@/models/BoatCard";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

export default function BoatCard({ boat }: { boat: BoatCardModel }) {
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
        {boat.imageUrls.map((item, idx) => (
          <div key={idx} className="relative w-full h-64">
            <Image
              src={`http://localhost:7229/${item}`}
              alt={`Image ${idx}`}
              fill
              className="object-cover rounded-t-2xl"
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
            <strong>Durum:</strong>
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
