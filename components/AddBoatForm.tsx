"use client";
import Container from "@/components/Container";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import TextInput from "@/elements/TextInput";
import { AddBoatFormData } from "@/models";
import SelectBox from "@/elements/SelectBox";

interface AddBoatFormProps {
  ownerId: number;
  countries: {
    id: number;
    name: string;
  }[];
}

const AddBoatForm = ({ ownerId, countries }: AddBoatFormProps) => {
  const router = useRouter();
  const [selectedCountryId, setSelectedCountryId] = useState<number>(1);
  const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<number>(1);

  const [form, setForm] = useState<AddBoatFormData>({
    name: "",
    description: "",
    pricePerHour: null,
    capacity: null,
    isAvailable: true,
    districtId: null,
    imagesUrls: [],
    ownerId: ownerId,
  });

  const handleSelectCountryId = (e: any) => {
    setSelectedCountryId(e.target.value);
  };

  const handleSelectCityId = (e: any) => {
    setSelectedCityId(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const fileNames = files.map((file) => file.name);

    setForm({ ...form, imagesUrls: fileNames });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    // try {
    //   const res = await axios.post("http://localhost:3000/api/boats", form);

    //   if (res.status === 200) {
    //     toast.success("Tekne başarıyla eklendi!");
    //     router.push("/boats");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   toast.error("Bir hata oluştu.");
    // }
  };

  const getCitiesByCountryId = async (id: number) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/cities/${id}`);

      if (res.status === 200) setCities(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Bir hata oluştu.");
    }
  };

  useEffect(() => {
    getCitiesByCountryId(selectedCountryId);
  }, [selectedCountryId]);

  return (
    <Container>
      <form
        onSubmit={handleSubmit}
        className="bg-navy text-neutral max-w-md w-full mx-auto p-6 rounded-2xl shadow-lg flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Tekne Ekle</h2>

        {/* Tekne Adı */}
        <TextInput
          handleChange={handleChange}
          value={form.name}
          type="text"
          name="name"
          title="Tekne Adı"
        />

        {/* Açıklama */}
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm">
            Açıklama
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            className="rounded-md px-3 py-2 bg-neutral-100 text-black focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <TextInput
          handleChange={handleChange}
          value={form.pricePerHour ?? ""}
          type="number"
          name="pricePerHour"
          title="Saatlik Ücret (₺)"
          minValue={0}
        />

        <TextInput
          handleChange={handleChange}
          value={form.capacity ?? ""}
          type="number"
          name="capacity"
          title="Kapasite"
        />

        <SelectBox
          handleSelectId={handleSelectCountryId}
          selectedCountryId={selectedCountryId}
          selectData={countries}
          title="Ülke Seçiniz"
        />

        <SelectBox
          handleSelectId={handleSelectCityId}
          selectedCountryId={selectedCityId}
          selectData={cities}
          title="Şehir Seçiniz"
        />

        <div className="flex items-center flex-col gap-2">
          <label
            htmlFor="file-upload"
            className="bg-green-700 text-center w-full p-2 rounded-lg"
          >
            Resim seçmek için tıklayınız
          </label>
          {form.imagesUrls.length > 0 &&
            form.imagesUrls.map((url, index) => (
              <span
                key={index}
                className={`bg-sky-500 text-white px-2 py-1 rounded-lg`}
              >
                {url}
              </span>
            ))}
        </div>
        <div className="flex flex-col gap-1">
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-400 transition-colors text-white font-semibold py-2 rounded-lg"
        >
          Ekle
        </button>
      </form>
    </Container>
  );
};

export default AddBoatForm;
