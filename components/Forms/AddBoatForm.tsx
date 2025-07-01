"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AddBoatFormData } from "@/models";
import toast from "react-hot-toast";
import TextInput from "@/elements/TextInput";
import SelectBox from "@/elements/SelectBox";
import Image from "next/image";
import { X } from "lucide-react";
import Spinner from "@/elements/Spinner";

interface AddBoatFormProps {
  ownerId: number;
  countries: {
    id: number;
    name: string;
  }[];
  token: string;
}

const AddBoatForm = ({ ownerId, countries, token }: AddBoatFormProps) => {
  const router = useRouter();

  const [selectedCountryId, setSelectedCountryId] = useState<number>(1);
  const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<number>(0);
  const [districts, setDistricts] = useState<{ id: number; name: string }[]>(
    []
  );
  const [selectedDistrictId, setSelectedDistrictId] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<AddBoatFormData>({
    name: "",
    description: "",
    pricePerHour: null,
    capacity: null,
    isAvailable: true,
    districtId: null,
    images: [],
    ownerId: ownerId,
  });

  const handleSelectCountryId = (e: any) => {
    setSelectedCountryId(e.target.value);
  };

  const handleSelectCityId = (e: any) => {
    setSelectedCityId(e.target.value);
  };

  const handleSelectDistrictId = (e: any) => {
    setSelectedDistrictId(e.target.value);
    setForm({ ...form, districtId: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = [...form.images, ...files];

    setForm({ ...form, images: newFiles });
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = form.images.filter((_, i) => i !== index);

    setForm({ ...form, images: updatedImages });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("Name", form.name);
    formData.append("Description", form.description);
    formData.append("PricePerHour", form.pricePerHour?.toString() || "0");
    formData.append("Capacity", form.capacity?.toString() || "0");
    formData.append("IsAvailable", form.isAvailable.toString());
    formData.append("DistrictId", form.districtId?.toString() || "0");
    formData.append("OwnerId", form.ownerId.toString());

    const now = new Date().toISOString();
    formData.append("AvailableFrom", now);
    formData.append("AvailableTo", now);

    form.images.forEach((file) => {
      formData.append("Images", file);
    });

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/boats`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        toast.success("Tekne başarıyla eklendi!");
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error?.response?.statusText || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const getCitiesByCountryId = async (id: number) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/cities/${id}`
      );

      if (res.status === 200) setCities(res.data);
    } catch (error: any) {
      toast.error(error?.data?.message || "Bir hata oluştu.");
    }
  };

  const getDistrictsByCityId = async (id: number) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/districts/${id}`
      );

      if (res.status === 200) setDistricts(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Bir hata oluştu.");
    }
  };

  useEffect(() => {
    getCitiesByCountryId(selectedCountryId);
    if (selectedCityId !== 0) {
      getDistrictsByCityId(selectedCityId);
    }
  }, [selectedCountryId, selectedCityId]);

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
          placeholder="Tekne adını girin"
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
          placeholder="Saatlik ücreti girin"
        />

        <TextInput
          handleChange={handleChange}
          value={form.capacity ?? ""}
          type="number"
          name="capacity"
          title="Kapasite"
          minValue={0}
          placeholder="Kapasiteyi girin"
        />

        <SelectBox
          handleSelectId={handleSelectCountryId}
          selectedCountryId={selectedCountryId}
          selectData={countries}
          title="Ülke Seçiniz"
          disabled
        />

        <SelectBox
          handleSelectId={handleSelectCityId}
          selectedCountryId={selectedCityId}
          selectData={cities}
          title="Şehir Seçiniz"
        />

        <SelectBox
          handleSelectId={handleSelectDistrictId}
          selectedCountryId={selectedDistrictId}
          selectData={districts}
          title="İlçe Seçiniz"
        />

        <div className="flex items-center flex-col gap-2">
          <label
            htmlFor="file-upload"
            className="bg-green-700 text-center w-full p-2 rounded-lg"
          >
            Resim seçmek için tıklayınız
          </label>
          {form.images.length > 0 &&
            form.images.map((image, index) => (
              <div
                key={index}
                className={`bg-sky-500 text-white px-2 py-1 rounded-lg relative`}
              >
                <button
                  type="button" // Formu submit etmemesi için type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 "
                  aria-label="Resmi Sil"
                >
                  <X size={16} />
                </button>
                <Image
                  alt={`Image`}
                  className="object-cover rounded-t-2xl"
                  width={150}
                  height={100}
                  src={URL.createObjectURL(image)}
                  priority={false}
                />
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-1">
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-400 transition-colors text-white font-semibold py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? <Spinner /> : "Tekne Ekle"}
        </button>
      </form>
    </Container>
  );
};

export default AddBoatForm;
