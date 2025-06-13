"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import axios from "axios";
import toast from "react-hot-toast";
import TextInput from "@/elements/TextInput";
import { UpdatePasswordFormData } from "@/models";
import { encrypt } from "@/libs";
import { signOut } from "next-auth/react";

interface PasswordEditFormProps {
  token: string;
  id: number | string;
}

const PasswordEditForm = ({ token, id }: PasswordEditFormProps) => {
  const router = useRouter();

  const [form, setForm] = useState<UpdatePasswordFormData>({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.newPassword !== form.newPasswordConfirm) {
      toast.error("Yeni şifreler eşleşmiyor.");
      return;
    }

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/${id}/change-password`,
        {
          currentPassword: encrypt(form.currentPassword),
          newPassword: encrypt(form.newPassword),
          newPasswordConfirm: encrypt(form.newPasswordConfirm),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("Şifreniz başarıyla güncellendi!");
        setForm({
          currentPassword: "",
          newPassword: "",
          newPasswordConfirm: "",
        });
        signOut();
        router.push("/");
      }
    } catch (error: any) {
      console.error("Şifre güncellenirken hata oluştu:", error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message || "Mevcut şifreniz yanlış.");
      } else {
        toast.error("Şifre güncellenirken bir hata oluştu.");
      }
    }
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit}
        className="bg-navy text-neutral max-w-md w-full mx-auto p-6 rounded-2xl shadow-lg flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Şifre Değiştir</h2>

        <TextInput
          handleChange={handleChange}
          value={form.currentPassword}
          type="password"
          name="currentPassword"
          title="Mevcut Şifre"
          placeholder="Mevcut Şifreniz"
        />

        <TextInput
          handleChange={handleChange}
          value={form.newPassword}
          type="password"
          name="newPassword"
          title="Yeni Şifre"
          placeholder="Yeni Şifreniz"
        />

        <TextInput
          handleChange={handleChange}
          value={form.newPasswordConfirm}
          type="password"
          name="newPasswordConfirm"
          title="Yeni Şifre (Tekrar)"
          placeholder="Yeni Şifrenizi Tekrar Girin"
        />

        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-400 transition-colors text-white font-semibold py-2 rounded-lg"
        >
          Şifreyi Güncelle
        </button>
      </form>
    </Container>
  );
};

export default PasswordEditForm;
