"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import axios from "axios";
import toast from "react-hot-toast";

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
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="rounded-md px-3 py-2 bg-neutral-100 text-black focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Telefon */}
        <div className="flex flex-col gap-1">
          <label htmlFor="phoneNumber" className="text-sm">
            Telefon
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            required
            className="rounded-md px-3 py-2 bg-neutral-100 text-black focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Kullanıcı Adı */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm">
            Kullanıcı Adı
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="rounded-md px-3 py-2 bg-neutral-100 text-black focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Şifre */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm">
            Şifre
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="rounded-md px-3 py-2 bg-neutral-100 text-black focus:outline-none focus:ring-2 focus:ring-mint-500"
          />
        </div>

        {/* Şifre Tekrar */}
        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword" className="text-sm">
            Şifre Tekrar
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="rounded-md px-3 py-2 bg-neutral-100 text-black focus:outline-none focus:ring-2 focus:ring-mint-500"
          />
        </div>

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
