"use client";

import React, { useEffect, useState } from "react";
import Container from "./Container";
import { AllBoatsQueries, BoatCardModel } from "@/models";
import BoatCard from "./BoatCard";
import { buildUrlWithQueryParams } from "@/libs";
import TextInput from "@/elements/TextInput";
import BoatsSpinner from "@/elements/Spinner";
import { Frown } from "lucide-react";

interface GetAllBoatsProps {
  boats: BoatCardModel[];
}

const GetAllBoats = ({ boats }: GetAllBoatsProps) => {
  const [allBoats, setAllBoats] = useState<BoatCardModel[]>(boats);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [queries, setQueries] = useState<AllBoatsQueries>({
    capacity: "",
    price: "",
    city: "",
    disctrict: "",
  });

  const getBoats = async (queriesProps?: AllBoatsQueries) => {
    setIsLoading(true);
    const url = buildUrlWithQueryParams(
      `${process.env.NEXT_PUBLIC_API_URL}/boats`,
      queriesProps ?? queries
    );
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setAllBoats(data);
    } catch (error) {
      console.error("Tekneler getirilirken bir hata oluştu:", error);
      setAllBoats([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearQueries = () => {
    setQueries({
      capacity: "",
      price: "",
      city: "",
      disctrict: "",
    });
    getBoats({
      capacity: "",
      price: "",
      city: "",
      disctrict: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQueries((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGetWithQueriesBoats = () => {
    getBoats();
  };

  if (isLoading)
    return (
      <Container>
        <BoatsSpinner />
      </Container>
    );

  return (
    <Container>
      <TextInput
        placeholder="Kapasite"
        handleChange={handleChange}
        name="capacity"
        title="Kapasite"
        value={queries.capacity}
        hiddenTitle
        extraClass="w-full sm:w-min"
      />
      <TextInput
        placeholder="Saatlik Ücret"
        handleChange={handleChange}
        name="price"
        title="Saatlik Ücret"
        value={queries.price}
        hiddenTitle
        extraClass="w-full sm:w-min"
      />
      <TextInput
        placeholder="Şehir"
        handleChange={handleChange}
        name="city"
        title="Şehir"
        value={queries.city}
        hiddenTitle
        extraClass="w-full sm:w-min"
      />
      <TextInput
        placeholder="İlçe"
        handleChange={handleChange}
        name="disctrict"
        title="İlçe"
        value={queries.disctrict}
        hiddenTitle
        extraClass="w-full sm:w-min"
      />
      <Container>
        <button
          onClick={handleClearQueries}
          className="bg-navy text-sky-500 w-full md:w-min rounded px-4 cursor-pointer "
        >
          Temizle
        </button>
        <button
          onClick={handleGetWithQueriesBoats}
          className="bg-navy w-full text-sky-500 md:w-min rounded px-4 cursor-pointer"
        >
          Ara
        </button>
      </Container>
      <Container>
        {allBoats && allBoats.length > 0 ? (
          allBoats.map((boat: BoatCardModel) => (
            <BoatCard key={boat.id} boat={boat} />
          ))
        ) : (
          <div className="flex flex-row gap-2">
            <span>Aradığınız Kritere uygun tekne bulunamadı</span>
            <Frown size={24} color="gray" />
          </div>
        )}
      </Container>
    </Container>
  );
};

export default GetAllBoats;
