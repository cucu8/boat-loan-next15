import React from "react";
import Link from "next/link"; // Next.js'in Link bileşenini kullanıyoruz

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-navy text-neutral p-4 sm:p-6 md:p-8">
      <div className="text-center">
        <h1 className="text-8xl sm:text-9xl font-extrabold text-sand tracking-widest animate-pulse">
          404
        </h1>
        <p className="text-2xl sm:text-3xl font-semibold mb-6">
          Sayfa Bulunamadı!
        </p>
        <p className="text-lg sm:text-xl text-neutral-200 mb-8 max-w-xl mx-auto">
          Aradığınız sayfa ya taşınmış ya da hiç var olmamış olabilir. Lütfen
          adresin doğruluğunu kontrol edin veya aşağıdaki bağlantıları kullanın.
        </p>

        <Link
          href="/"
          className="inline-block px-8 py-3 bg-mint-500 text-white font-semibold rounded-full shadow-lg hover:bg-mint-600 transition-all duration-300 transform hover:scale-105 mr-4"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
