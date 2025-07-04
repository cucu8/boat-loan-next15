"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import axios from "axios";
import toast from "react-hot-toast";
import TextInput from "@/elements/TextInput";
import { encrypt } from "@/libs";
import Spinner from "@/elements/Spinner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Geçerli bir email adresi girin")
    .required("Email adresi zorunludur"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10,11}$/, "Geçerli bir telefon numarası girin")
    .required("Telefon numarası zorunludur"),
  name: Yup.string()
    .min(2, "Kullanıcı adı en az 2 karakter olmalıdır")
    .max(50, "Kullanıcı adı en fazla 50 karakter olabilir")
    .required("Kullanıcı adı zorunludur"),
  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .required("Şifre zorunludur"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Şifreler eşleşmiyor")
    .required("Şifre tekrarı zorunludur"),
});

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    phoneNumber: "",
    name: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any
  ) => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/users/register`, {
        ...values,
        password: encrypt(values.password),
        confirmPassword: encrypt(values.confirmPassword),
        userType: 0,
      });
      if (res.status === 200) {
        resetForm();
        toast.success("Kayıt başarılı!");
        router.push("/login");
      }
    } catch (error: any) {
      console.error("CLİENT Registration error:", error);

      if (error.message?.includes("Encryption secret key")) {
        toast.error(
          "Sistem yapılandırma hatası. Lütfen daha sonra tekrar deneyin."
        );
      } else if (error?.response?.data?.error) {
        toast.error(error?.response?.data?.error);
      } else {
        toast.error("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form className="bg-navy text-neutral max-w-md w-full mx-auto p-6 rounded-2xl shadow-lg flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-center">Kayıt Ol</h2>

            {/* Email */}
            <div>
              <Field
                as={TextInput}
                handleChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                type="email"
                name="email"
                title="Email"
                placeholder="Email adresinizi girin"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            {/* Telefon */}
            <div>
              <Field
                as={TextInput}
                handleChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
                type="tel"
                name="phoneNumber"
                title="Telefon"
                placeholder="Telefon numaranızı girin"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            {/* Kullanıcı Adı */}
            <div>
              <Field
                as={TextInput}
                handleChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                type="text"
                name="name"
                title="Kullanıcı Adı"
                placeholder="Kullanıcı adınızı girin"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            {/* Şifre */}
            <div>
              <Field
                as={TextInput}
                handleChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                type="password"
                name="password"
                title="Şifre"
                placeholder="Şifrenizi girin"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            {/* Şifre Tekrar */}
            <div>
              <Field
                as={TextInput}
                handleChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                type="password"
                name="confirmPassword"
                title="Şifre Tekrar"
                placeholder="Şifrenizi tekrar girin"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-400 transition-colors text-white font-semibold py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Kaydol"}
            </button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
