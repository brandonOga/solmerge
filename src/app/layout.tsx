import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import { SITE, SITE_URL } from "@/lib/site";
import "./globals.css";

// Both Satoshi weights are registered as one family; which one headings use
// is set once by --heading-weight in globals.css
const satoshi = localFont({
  variable: "--font-heading",
  src: [
    { path: "../fonts/Satoshi Medium/Satoshi Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Satoshi-Black.woff2", weight: "900", style: "normal" },
  ],
});

const workSans = localFont({
  variable: "--font-body",
  src: "../fonts/WorkSans-Variable.woff2",
  weight: "100 900",
  style: "normal",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// The share image comes from opengraph-image.tsx, which Next.js adds to the
// openGraph and twitter tags automatically
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: SITE.keywords,
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName, url: SITE_URL }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: "Finance",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_ZW",
    url: "/",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Stops iOS Safari turning numbers in the copy into phone links
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0b1f3f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // is-loading locks scrolling until the Preloader finishes and removes it
      className={`${satoshi.variable} ${workSans.variable} ${plexMono.variable} is-loading`}
    >
      <head>
        {/* Without JavaScript the preloader and reveals never run, so skip
            the loading screen and show everything */}
        <noscript>
          <style>{`
            [data-reveal] { visibility: visible; }
            .preloader { display: none; }
            html.is-loading { overflow: auto; }
          `}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
