"use client";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

interface Props {
  images: { id: number; base64Image: string }[];
  width?: string;
  height?: string;
}

const ImageCarousel = ({
  images = [],
  width = "w-full",
  height = "h-64",
}: Props) => {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      useKeyboardArrows
      autoPlay={false}
      className={`${width} ${height}`}
    >
      {images.map((item, idx) => (
        <div key={idx} className={`relative ${width} ${height}`}>
          <Image
            src={item.base64Image}
            alt={`Boat Image ${idx}`}
            fill
            className="object-cover rounded-t-2xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
