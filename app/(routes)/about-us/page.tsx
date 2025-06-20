import Container from "@/components/Container";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Hakkımızda | Tekne Kiralama Hizmetleri",
  description:
    "Tekne kiralama şirketimiz hakkında detaylı bilgi, vizyonumuz ve ekibimiz.",
  keywords: "hakkımızda, tekne kiralama şirketi, misyon, vizyon",
};

const AboutUs = () => {
  return (
    <Container>
      Tekne kiralama platformumuz, Türkiye&apos;nin dört bir yanındaki tekne
      sahiplerini ve deniz tutkunlarını bir araya getiren yepyeni bir başlangıç.
      Amacımız, tekne kiralamayı herkes için daha kolay, erişilebilir ve
      ücretsiz hale getirmek. Platformumuzda, tekne sahipleri teknelerini
      tamamen ücretsiz olarak listeleyebilirler. İster özel kullanımınız için
      bir tekneniz olsun, ister ticari amaçla kiralıyor olun, Türkiye&apos;nin
      herhangi bir il ve ilçesinde teknenizi bizimle paylaşabilirsiniz. Bu
      sayede, deniz severler için geniş bir yelpazede tekne seçenekleri
      sunarken, tekne sahiplerinin de teknelerini daha geniş kitlelere
      ulaştırmalarına olanak tanıyoruz. Denizin özgürlüğünü yaşamak isteyenler
      için, platformumuz kapsamlı bir tekne portföyü sunuyor. Konum, tekne tipi,
      kişi kapasitesi gibi filtrelerle aradığınız tekneyi kolayca bulabilir,
      doğrudan tekne sahipleriyle iletişime geçerek rezervasyonunuzu
      yapabilirsiniz. Biz, denizcilik tutkusunu paylaşan bir ekibiz ve tekne
      kiralama deneyimini daha şeffaf ve güvenilir hale getirmeyi hedefliyoruz.
      Siz de bu denize açılan kapıda yerinizi alın!
    </Container>
  );
};

export default AboutUs;
