"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BoatCardModel, UpdateBoatFormData } from "@/models"; // UpdateBoatFormData'yı
import toast from "react-hot-toast";
import TextInput from "@/elements/TextInput";
import SelectBox from "@/elements/SelectBox";
import Image from "next/image";
import { X } from "lucide-react";

interface EditBoatFormProps {
  ownerId: number;
  countries: {
    id: number;
    name: string;
  }[];
  token: string;
  boat: BoatCardModel; // Mevcut tekne bilgileri
}

const EditBoatForm = ({
  ownerId,
  countries,
  token,
  boat,
}: EditBoatFormProps) => {
  const router = useRouter();
  // State'leri boat prop'undan gelen başlangıç değerleriyle doldur
  const [selectedCountryId, setSelectedCountryId] = useState<number>(
    boat.countryId
  );
  const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<number>(boat.cityId);
  const [districts, setDistricts] = useState<{ id: number; name: string }[]>(
    []
  );
  const [selectedDistrictId, setSelectedDistrictId] = useState<number>(
    boat.districtId
  );
  const [isAvailable, setIsAvailable] = useState<boolean>(boat.isAvailable);
  // Mevcut resimlerin yönetimi için state'ler
  const [existingBoatImages, setExistingBoatImages] = useState<
    { id: number; base64Image: string }[]
  >([]);

  const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
  // Silinecek resimlerin ID'leri

  // Yeni eklenecek resim dosyaları
  const [newImages, setNewImages] = useState<File[]>([]);

  // Form verileri için state, UpdateBoatFormData tipinde olacak
  const [form, setForm] = useState<UpdateBoatFormData>({
    name: "",
    description: "",
    pricePerHour: null,
    capacity: null,
    isAvailable: true,
    districtId: null,
    ownerId: ownerId, // ownerId'yi doğrudan prop'tan al
    newImages: [], // Başlangıçta boş
    imagesToDelete: [], // Başlangıçta boş
  });

  // Ülke, Şehir, İlçe seçimlerini yönet
  const handleSelectCountryId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountryId(Number(e.target.value));
    setSelectedCityId(0); // Ülke değişince şehir ve ilçe resetlensin
    setSelectedDistrictId(0);
    setCities([]);
    setDistricts([]);
  };

  const handleSelectCityId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCityId(Number(e.target.value));
    setSelectedDistrictId(0); // Şehir değişince ilçe resetlensin
    setDistricts([]);
  };

  const handleSelectDistrictId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = Number(e.target.value);
    setSelectedDistrictId(districtId);
    setForm((prevForm) => ({ ...prevForm, districtId: districtId }));
  };

  // Yeni resim dosyalarını yönet
  const handleNewFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewImages((prevImages) => [...prevImages, ...files]);
  };

  // Mevcut resimlerden birini silme işlemi
  const handleDeleteExistingImage = (imageId: number) => {
    // UI'dan kaldır
    setExistingBoatImages((prevImages) =>
      prevImages.filter((img) => img.id !== imageId)
    );

    // Silinecekler listesine ekle
    setImagesToDelete((prevIds) => [...prevIds, imageId]);
    setForm((prevForm) => ({
      ...prevForm,
      imagesToDelete: [...prevForm.imagesToDelete, imageId],
    }));
  };

  // Yeni yüklenmiş (ama henüz API'ye gönderilmemiş) bir resmi silme işlemi
  const handleDeleteNewImage = (index: number) => {
    setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Form input değişikliklerini yönet
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Form gönderimi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    if (newImages && newImages.length > 0) {
      newImages.map((file) => {
        formData.append("NewImages", file);
      });
    } else {
      formData.append("NewImages", "");
    }

    form.imagesToDelete.forEach((id) => {
      formData.append("ImagesToDelete", id.toString());
    });

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/boats/${boat.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("Tekne başarıyla güncellendi!");
        router.push(`/my-boats`);
      }
    } catch (error) {
      console.error("Tekne güncellenirken hata oluştu:", error);
      toast.error("Tekne güncellenirken bir hata oluştu.");
    }
  };

  const getCitiesByCountryId = async (id: number) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/cities/${id}`
      );
      if (res.status === 200) setCities(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Şehirler çekilirken hata oluştu.");
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
      toast.error("İlçeler çekilirken hata oluştu.");
    }
  };

  useEffect(() => {
    if (selectedCountryId !== 0) {
      getCitiesByCountryId(selectedCountryId);
    }
  }, [selectedCountryId]);

  useEffect(() => {
    if (selectedCityId !== 0) {
      getDistrictsByCityId(selectedCityId);
    }
  }, [selectedCityId]);

  // İlk render'da ve `boat` prop'u değiştiğinde formu ve resimleri doldur
  useEffect(() => {
    if (boat) {
      setForm({
        name: boat.name,
        description: boat.description,
        pricePerHour: boat.pricePerHour,
        capacity: boat.capacity,
        isAvailable: boat.isAvailable,
        districtId: boat.districtId,
        ownerId: ownerId,
        newImages: [], // Yeni resimler her zaman başlangıçta boş olmalı
        imagesToDelete: [], // Silinecek resimler de başlangıçta boş olmalı
      });
      setExistingBoatImages(boat.images); // Mevcut resimleri state'e kaydet
      setSelectedCountryId(boat.countryId);
      setSelectedCityId(boat.cityId);
      setSelectedDistrictId(boat.districtId);
    }
  }, [boat, ownerId]); // ownerId bağımlılığı eklendi

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      isAvailable: isAvailable,
    }));
  }, [isAvailable]);

  return (
    <Container>
      <form
        onSubmit={handleSubmit}
        className="bg-navy text-neutral max-w-md w-full mx-auto p-6 rounded-2xl shadow-lg flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Tekne Düzenle</h2>

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
          minValue={0}
        />

        <div className="flex items-center justify-between gap-2">
          <label htmlFor="isAvailable" className="text-lg">
            Müsait mi?
          </label>
          <div
            className={`relative inline-flex items-center cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
              isAvailable ? "bg-green-700" : "bg-red-700"
            } w-12 h-6`}
            onClick={() => setIsAvailable(!isAvailable)}
          >
            <span
              className={`inline-block w-5 h-5 transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out ${
                isAvailable ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </div>
        </div>

        {/* Konum Seçiciler */}
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

        <SelectBox
          handleSelectId={handleSelectDistrictId}
          selectedCountryId={selectedDistrictId}
          selectData={districts}
          title="İlçe Seçiniz"
        />

        {/* Resim Yükleme ve Önizleme */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="file-upload"
            className="bg-green-700 text-center w-full p-2 rounded-lg cursor-pointer"
          >
            Yeni resim seçmek için tıklayınız
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            onChange={handleNewFileChange}
            className="hidden"
          />

          {existingBoatImages.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Mevcut Resimler</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {existingBoatImages.map((image) => (
                  <div key={image.id} className="relative group">
                    <Image
                      alt={`Mevcut Resim ${image.id}`}
                      className="object-cover rounded-lg w-full h-24"
                      width={100}
                      height={100}
                      src={image.base64Image}
                      priority={false}
                    />
                    <button
                      type="button" // Formu submit etmemesi için type="button"
                      onClick={() => handleDeleteExistingImage(image.id)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 "
                      aria-label="Resmi Sil"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Yeni Yüklenen Resimlerin Önizlemesi ve Silme Butonları */}
          {newImages.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">
                Yeni Yüklenecek Resimler
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {newImages.map((file, index) => (
                  <div key={index} className="relative group">
                    <Image
                      alt={`Yeni Resim ${index}`}
                      className="object-cover rounded-lg w-full h-24"
                      width={100}
                      height={100}
                      src={URL.createObjectURL(file)} // Yeni yüklenen dosyaları URL olarak göster
                      priority={false}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteNewImage(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Resmi Sil"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-400 transition-colors text-white font-semibold py-2 rounded-lg"
        >
          Güncelle
        </button>
      </form>
    </Container>
  );
};

export default EditBoatForm;
