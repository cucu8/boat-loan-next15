"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { encrypt } from "@/libs";
import Container from "@/components/Container";
import toast from "react-hot-toast";
import TextInput from "@/elements/TextInput";
import Spinner from "@/elements/Spinner";

const Login = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: form.email,
        password: encrypt(form.password),
        redirect: false,
      });
      if (res?.ok) {
        toast.success("Giriş başarılı!");
        router.push("/");
      } else {
        toast.error("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
      }
    } finally {
      setLoading(false);
    }
  };
  console.log(loading);
  return (
    <Container>
      <form
        onSubmit={handleSubmit}
        className="bg-navy text-neutral max-w-md w-full mx-auto p-6 rounded-2xl shadow-lg flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Giriş Yap</h2>

        {/* Email */}
        <TextInput
          handleChange={handleChange}
          value={form.email}
          type="email"
          name="email"
          title="Email"
          placeholder="Email"
        />

        {/* Şifre */}
        <TextInput
          handleChange={handleChange}
          value={form.password}
          type="password"
          name="password"
          title="Şifre"
          placeholder="Şifre"
        />

        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-400 transition-colors text-white font-semibold py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? <Spinner /> : "Giriş Yap"}
        </button>
      </form>
    </Container>
  );
};

export default Login;
