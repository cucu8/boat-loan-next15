"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const { data: session, status } = useSession();
  console.log("SESSION on client:", session);

  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (res?.ok) {
      toast.success("Giriş başarılı!");
      router.push("/"); // yönlendir
    } else {
      toast.error("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit}
        className="bg-navy text-neutral max-w-md w-full mx-auto p-6 rounded-2xl shadow-lg flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Giriş Yap</h2>

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

        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-400 transition-colors text-white font-semibold py-2 rounded-lg"
        >
          Giriş Yap
        </button>
      </form>
    </Container>
  );
};

export default Login;
