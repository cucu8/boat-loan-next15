"use client";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

interface Props {
  imageUrls: string[];
  width?: string;
  height?: string;
}

const ImageCarousel = ({
  imageUrls = [],
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
      {imageUrls.map((item, idx) => (
        <div key={idx} className={`relative ${width} ${height}`}>
          <Image
            src={`http://localhost:7229/${item}`}
            alt={`Image ${idx}`}
            fill
            className="object-cover rounded-t-2xl"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
