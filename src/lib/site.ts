// Business details shared by the page, the footer and the SEO metadata
// (meta tags, sitemap, robots, structured data), so they can't drift apart.

// The public address of the site. Set NEXT_PUBLIC_SITE_URL in production
// (e.g. https://solmerge.co.zw); on Vercel the production domain is picked up
// automatically. Canonical links, the sitemap and share images all use it.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:8080")
).replace(/\/$/, "");

export const SITE = {
  name: "SolMerge Financial Advisory",
  legalName: "SolMerge Financial Advisory (Pvt) Ltd",
  tagline: "Smart Strategies. Lasting Wealth.",
  title: "SolMerge Financial Advisory | Finance, IT & Actuarial Services in Harare",
  description:
    "Harare-based consultancy offering accounting, tax, audit and payroll services, actuarial analysis and IT solutions, with insights that drive smarter decisions and sustainable growth.",
  keywords: [
    "financial advisory Zimbabwe",
    "accounting services Harare",
    "bookkeeping Harare",
    "tax advisory Zimbabwe",
    "ZIMRA compliance",
    "NSSA and ZIMDEF compliance",
    "payroll administration",
    "internal audit",
    "actuarial services Zimbabwe",
    "financial modelling",
    "Sage and Pastel implementation",
    "Xero and Odoo implementation",
    "website design Harare",
    "SolMerge",
  ],
  logo: "/assets/SolMerge-logo.jpeg",
};

export const CONTACT = {
  phone: "+263 71 744 6715",
  phoneE164: "+263717446715",
  email: "solmergefa@gmail.com",
  address: {
    street: "6 Rivonia Road",
    locality: "Mt Pleasant",
    city: "Harare",
    country: "ZW",
  },
  mapsUrl: "https://maps.google.com/?q=6+Rivonia+Road,+Mt+Pleasant,+Harare",
};
