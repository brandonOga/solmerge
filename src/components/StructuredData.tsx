import { INDUSTRIES, SERVICES } from "@/lib/content";
import { CONTACT, SITE, SITE_URL } from "@/lib/site";

// schema.org data describing the business, so search engines can show it as a
// local business (address, phone, services) rather than just a web page.
// Check changes with https://search.google.com/test/rich-results
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "AccountingService"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE.name,
      legalName: SITE.legalName,
      slogan: SITE.tagline,
      description: SITE.description,
      url: SITE_URL,
      logo: `${SITE_URL}${SITE.logo}`,
      image: `${SITE_URL}/opengraph-image`,
      telephone: CONTACT.phoneE164,
      email: CONTACT.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT.address.street,
        addressLocality: `${CONTACT.address.locality}, ${CONTACT.address.city}`,
        addressRegion: CONTACT.address.city,
        addressCountry: CONTACT.address.country,
      },
      hasMap: CONTACT.mapsUrl,
      areaServed: { "@type": "Country", name: "Zimbabwe" },
      knowsAbout: INDUSTRIES.map((industry) => industry.name),
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: CONTACT.phoneE164,
        email: CONTACT.email,
        areaServed: "ZW",
        availableLanguage: "English",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: SERVICES.map((service) => ({
          "@type": "OfferCatalog",
          name: service.title,
          description: service.intro,
          itemListElement: service.items.map((item) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: item },
          })),
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE.name,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so no string in the data can close the script tag early
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
