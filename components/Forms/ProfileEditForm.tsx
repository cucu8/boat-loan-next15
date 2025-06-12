"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import axios from "axios";
import toast from "react-hot-toast";
import TextInput from "@/elements/TextInput";

interface UpdateUserFormData {
  email: string;
  phoneNumber: string;
}

interface EditUserFormProps {
  user: any;
  token: string;
}

const ProfileEditForm = ({ user, token }: EditUserFormProps) => {
  const router = useRouter();

  const [form, setForm] = useState<UpdateUserFormData>({
    email: "",
    phoneNumber: "",
  });

  console.log(user);

  useEffect(() => {
    if (user) {
      setForm({
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("Kullanıcı bilgileri başarıyla güncellendi!");
        //router.push(`/profile`); // Redirect to user profile or dashboard
      }
    } catch (error) {
      console.error("Kullanıcı güncellenirken hata oluştu:", error);
      toast.error("Kullanıcı güncellenirken bir hata oluştu.");
    }
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit}
        className="bg-navy text-neutral max-w-md w-full mx-auto p-6 rounded-2xl shadow-lg flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">
          Kullanıcı Bilgilerini Düzenle
        </h2>

        {/* Email */}
        <TextInput
          handleChange={handleChange}
          value={form.email}
          type="email" // Use type="email" for email validation
          name="email"
          title="E-posta"
        />

        {/* Phone Number */}
        <TextInput
          handleChange={handleChange}
          value={form.phoneNumber}
          type="tel" // Use type="tel" for phone numbers
          name="phoneNumber"
          title="Telefon Numarası"
        />

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

export default ProfileEditForm;
