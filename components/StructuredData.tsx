import Script from 'next/script';

interface StructuredDataProps {
  type?: 'website' | 'organization' | 'service';
}

export default function StructuredData({ type = 'website' }: StructuredDataProps) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Teknekiralagez.com",
    "alternateName": "Tekne Kiralama Türkiye",
    "url": "https://teknekiralagez.com",
    "description": "Türkiye'nin en güvenilir tekne kiralama platformu. İstanbul, Bodrum, Antalya ve tüm sahil şehirlerinde uygun fiyatlarla tekne kiralayın.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://teknekiralagez.com/boats?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Teknekiralagez.com",
      "url": "https://teknekiralagez.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://teknekiralagez.com/logo.png"
      }
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Teknekiralagez.com",
    "url": "https://teknekiralagez.com",
    "logo": "https://teknekiralagez.com/logo.png",
    "description": "Türkiye'nin en güvenilir tekne kiralama platformu",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "TR",
      "addressLocality": "İstanbul"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "Turkish"
    },
    "sameAs": [
      "https://www.facebook.com/teknekiralagez",
      "https://www.instagram.com/teknekiralagez",
      "https://twitter.com/teknekiralagez"
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Tekne Kiralama Hizmeti",
    "description": "Türkiye'nin tüm sahil şehirlerinde tekne kiralama hizmeti",
    "provider": {
      "@type": "Organization",
      "name": "Teknekiralagez.com",
      "url": "https://teknekiralagez.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Turkey"
    },
    "serviceType": "Tekne Kiralama",
    "category": "Turizm ve Eğlence"
  };

  const getSchema = () => {
    switch (type) {
      case 'organization':
        return organizationSchema;
      case 'service':
        return serviceSchema;
      default:
        return websiteSchema;
    }
  };

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getSchema()),
      }}
    />
  );
}