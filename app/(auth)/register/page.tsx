"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import axios from "axios";
import toast from "react-hot-toast";
import TextInput from "@/elements/TextInput";
import { decrypt, encrypt } from "@/libs";

const Register = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    phoneNumber: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/api/users/register", {
      ...form,
      password: encrypt(form.password),
      confirmPassword: decrypt(form.confirmPassword),
      userType: 0,
    });

    if (res.status === 200) {
      setForm({
        email: "",
        phoneNumber: "",
        name: "",
        password: "",
        confirmPassword: "",
      });
      toast.success("Kayıt başarılı!");
      router.push("/login");
    }
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit}
        className="bg-navy text-neutral max-w-md w-full mx-auto p-6 rounded-2xl shadow-lg flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Kayıt Ol</h2>

        {/* Email */}
        <TextInput
          handleChange={handleChange}
          value={form.email}
          type="email"
          name="email"
          title="Email"
        />

        {/* Telefon */}
        <TextInput
          handleChange={handleChange}
          value={form.phoneNumber}
          type="tel"
          name="phoneNumber"
          title="Telefon"
        />

        {/* Kullanıcı Adı */}
        <TextInput
          handleChange={handleChange}
          value={form.name}
          type="text"
          name="name"
          title="Kullanıcı Adı"
        />

        {/* Şifre */}
        <TextInput
          handleChange={handleChange}
          value={form.password}
          type="password"
          name="password"
          title="Şifre"
        />

        {/* Şifre Tekrar */}
        <TextInput
          handleChange={handleChange}
          value={form.confirmPassword}
          type="password"
          name="confirmPassword"
          title="Şifre Tekrar"
        />

        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-400 transition-colors text-white font-semibold py-2 rounded-lg"
        >
          Kaydol
        </button>
      </form>
    </Container>
  );
};

export default Register;
