"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import TextInput from "@/elements/TextInput";
import SelectBox from "@/elements/SelectBox";
import Image from "next/image";
import { X } from "lucide-react";
import Spinner from "@/elements/Spinner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Tekne adı en az 2 karakter olmalıdır")
    .max(100, "Tekne adı en fazla 100 karakter olabilir")
    .required("Tekne adı zorunludur"),
  description: Yup.string()
    .min(10, "Açıklama en az 10 karakter olmalıdır")
    .max(500, "Açıklama en fazla 500 karakter olabilir")
    .required("Açıklama zorunludur"),
  pricePerHour: Yup.number()
    .min(1, "Saatlik ücret en az 1 TL olmalıdır")
    .required("Saatlik ücret zorunludur"),
  capacity: Yup.number()
    .min(1, "Kapasite en az 1 kişi olmalıdır")
    .required("Kapasite zorunludur"),
  districtId: Yup.number()
    .min(1, "İlçe seçimi zorunludur")
    .required("İlçe seçimi zorunludur"),
});

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
  const [images, setImages] = useState<File[]>([]);

  const initialValues = {
    name: "",
    description: "",
    pricePerHour: "",
    capacity: "",
    districtId: "",
  };

  const handleSelectCountryId = (e: any) => {
    setSelectedCountryId(e.target.value);
  };

  const handleSelectCityId = (e: any) => {
    setSelectedCityId(e.target.value);
  };

  const handleSelectDistrictId = (e: any, setFieldValue: any) => {
    setSelectedDistrictId(e.target.value);
    setFieldValue("districtId", e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = [...images, ...files];

    if (newFiles.length > 5) {
      toast.error("Maksimum 5 resim yükleyebilirsiniz!");
      return;
    }

    setImages(newFiles);
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleSubmit = async (values: typeof initialValues, { resetForm }: any) => {
    setLoading(true);

    if (images.length === 0) {
      toast.error("En az 1 resim yüklemelisiniz!");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("Name", values.name);
    formData.append("Description", values.description);
    formData.append("PricePerHour", values.pricePerHour.toString());
    formData.append("Capacity", values.capacity.toString());
    formData.append("IsAvailable", "true");
    formData.append("DistrictId", values.districtId.toString());
    formData.append("OwnerId", ownerId.toString());

    const now = new Date().toISOString();
    formData.append("AvailableFrom", now);
    formData.append("AvailableTo", now);

    images.forEach((file) => {
      formData.append("Images", file);
    });

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/boats`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        toast.success("Tekne başarıyla eklendi!");
        resetForm();
        setImages([]);
        setSelectedCountryId(1);
        setSelectedCityId(0);
        setSelectedDistrictId(0);
        router.push("/");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Bir hata oluştu. Lütfen tekrar deneyin."
      );
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, setFieldValue }) => (
          <Form className="bg-navy text-neutral max-w-md w-full mx-auto p-6 rounded-2xl shadow-lg flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-center">Tekne Ekle</h2>

            {/* Tekne Adı */}
            <div>
              <Field
                as={TextInput}
                handleChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                type="text"
                name="name"
                title="Tekne Adı"
                placeholder="Tekne adını girin"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            {/* Açıklama */}
            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="text-sm">
                Açıklama
              </label>
              <Field
                as="textarea"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={3}
                className="rounded-md px-3 py-2 bg-sky-400 text-navy focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Tekne açıklamasını girin"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            {/* Saatlik Ücret */}
            <div>
              <Field
                as={TextInput}
                handleChange={handleChange}
                onBlur={handleBlur}
                value={values.pricePerHour}
                type="number"
                name="pricePerHour"
                title="Saatlik Ücret (₺)"
                minValue={1}
                placeholder="Saatlik ücreti girin"
              />
              <ErrorMessage
                name="pricePerHour"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            {/* Kapasite */}
            <div>
              <Field
                as={TextInput}
                handleChange={handleChange}
                onBlur={handleBlur}
                value={values.capacity}
                type="number"
                name="capacity"
                title="Kapasite"
                minValue={1}
                placeholder="Kapasiteyi girin"
              />
              <ErrorMessage
                name="capacity"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm">Ülke Seçiniz</label>
              <SelectBox
                handleSelectId={handleSelectCountryId}
                selectedCountryId={selectedCountryId}
                selectData={countries}
                title="Ülke Seçiniz"
                disabled
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm">Şehir Seçiniz</label>
              <SelectBox
                handleSelectId={handleSelectCityId}
                selectedCountryId={selectedCityId}
                selectData={cities}
                title="Şehir Seçiniz"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm">İlçe Seçiniz</label>
              <SelectBox
                handleSelectId={(e: any) => handleSelectDistrictId(e, setFieldValue)}
                selectedCountryId={selectedDistrictId}
                selectData={districts}
                title="İlçe Seçiniz"
              />
              <ErrorMessage
                name="districtId"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            <div className="flex items-center flex-col gap-2">
              <label
                htmlFor="file-upload"
                className="bg-green-700 text-center w-full p-2 rounded-lg cursor-pointer hover:bg-green-600 transition-colors"
              >
                Resim seçmek için tıklayınız (Maksimum 5 adet)
              </label>
              <div className="text-sm text-gray-300">
                Yüklenen resim sayısı: {images.length}/5
              </div>
              {images.length > 0 &&
                images.map((image, index) => (
                  <div
                    key={index}
                    className={`bg-sky-500 text-white px-2 py-1 rounded-lg relative`}
                  >
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                      aria-label="Resmi Sil"
                    >
                      <X size={16} />
                    </button>
                    <Image
                      alt={`Image ${index + 1}`}
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
              className="bg-sky-500 hover:bg-sky-400 transition-colors text-white font-semibold py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Tekne Ekle"}
            </button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddBoatForm;
