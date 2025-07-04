"use client";

import React, { useState } from "react";
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
      {/* Arama Formu */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
          Tekne Ara
        </h2>
        
        {/* Arama Alanları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <TextInput
            placeholder="Kapasite"
            handleChange={handleChange}
            name="capacity"
            title="Kapasite"
            value={queries.capacity}
            hiddenTitle
            extraClass="w-full"
          />
          <TextInput
            placeholder="Saatlik Ücret"
            handleChange={handleChange}
            name="price"
            title="Saatlik Ücret"
            value={queries.price}
            hiddenTitle
            extraClass="w-full"
          />
          <TextInput
            placeholder="Şehir"
            handleChange={handleChange}
            name="city"
            title="Şehir"
            value={queries.city}
            hiddenTitle
            extraClass="w-full"
          />
          <TextInput
            placeholder="İlçe"
            handleChange={handleChange}
            name="disctrict"
            title="İlçe"
            value={queries.disctrict}
            hiddenTitle
            extraClass="w-full"
          />
        </div>
        
        {/* Butonlar */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleClearQueries}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Temizle
          </button>
          <button
            onClick={handleGetWithQueriesBoats}
            className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Ara
          </button>
        </div>
      </div>
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
