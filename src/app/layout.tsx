import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import PublicShell from "@/components/PublicShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jospo.in"),
  title: "JOSPO Cooling Solutions Pvt. Ltd. | India's Trusted Air Cooler Manufacturer",
  description:
    "JOSPO is a leading manufacturer of high-performance desert, commercial & industrial air coolers in Bhiwadi, Rajasthan. Energy-efficient cooling solutions for homes, offices, factories & warehouses. Get a quote today!",
  keywords: [
    "Air Cooler Manufacturer India",
    "Industrial Air Cooler Manufacturer",
    "Desert Air Cooler Manufacturer",
    "Commercial Air Cooler Supplier",
    "Air Cooler Factory Rajasthan",
    "Heavy Duty Air Cooler",
    "Industrial Cooling Solutions",
    "JOSPO Air Cooler",
    "Air Cooler Manufacturer Bhiwadi",
    "Cooling Solutions Rajasthan",
  ],
  authors: [{ name: "JOSPO Cooling Solutions Pvt. Ltd." }],
  creator: "JOSPO Cooling Solutions Pvt. Ltd.",
  publisher: "JOSPO Cooling Solutions Pvt. Ltd.",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website", locale: "en_IN", url: "https://jospo.in", siteName: "JOSPO Cooling Solutions",
    title: "JOSPO Cooling Solutions | India's Trusted Air Cooler Manufacturer",
    description: "High-performance desert, commercial & industrial air coolers. Energy-efficient cooling for homes, offices, factories & warehouses.",
    images: [{ url: "/images/hero-bg.png", width: 1200, height: 630, alt: "JOSPO Cooling Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JOSPO Cooling Solutions | India's Trusted Air Cooler Manufacturer",
    description: "High-performance desert, commercial & industrial air coolers.",
    images: ["/images/hero-bg.png"],
  },
  alternates: { canonical: "https://jospo.in" },
};

const localBusinessSchema = {
  "@context": "https://schema.org", "@type": "LocalBusiness", "@id": "https://jospo.in",
  name: "JOSPO Cooling Solutions Pvt. Ltd.",
  description: "Leading manufacturer of high-quality air coolers for residential, commercial, and industrial cooling applications.",
  url: "https://jospo.in", telephone: "+919602243363", email: "jospoindia@gmail.com",
  address: { "@type": "PostalAddress", streetAddress: "F-37E, RIICO Industrial Area, Near Banjara Chowk", addressLocality: "Khuskhera, Bhiwadi", addressRegion: "Rajasthan", postalCode: "301707", addressCountry: "IN" },
  geo: { "@type": "GeoCoordinates", latitude: 28.16, longitude: 76.89 },
  openingHours: "Mo-Sa 09:00-18:00", priceRange: "$$",
  sameAs: ["https://www.instagram.com/jospo.pvt"], image: "/images/hero-bg.png",
};

const organizationSchema = {
  "@context": "https://schema.org", "@type": "Organization",
  name: "JOSPO Cooling Solutions Pvt. Ltd.", url: "https://jospo.in", logo: "/images/hero-bg.png",
  contactPoint: { "@type": "ContactPoint", telephone: "+919602243363", contactType: "sales", areaServed: "IN", availableLanguage: ["English", "Hindi"] },
  sameAs: ["https://www.instagram.com/jospo.pvt"],
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Which cooler is best for my room?", acceptedAnswer: { "@type": "Answer", text: "The ideal cooler depends on your room size. For rooms up to 40 sq. m, the JOSPO Rolex 35L or 65L is perfect. For larger spaces, consider the Signature 100L or Defender 135L." } },
    { "@type": "Question", name: "How much electricity do JOSPO coolers consume?", acceptedAnswer: { "@type": "Answer", text: "JOSPO coolers consume 114W to 450W — far less than AC systems. Running costs range from ₹2–₹8 per hour." } },
    { "@type": "Question", name: "Do you supply across India?", acceptedAnswer: { "@type": "Answer", text: "Yes, JOSPO supplies air coolers to dealers, distributors, and customers across all Indian states." } },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0A4DA2" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem('jospo-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}`,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <PublicShell>
            <Navbar />
          </PublicShell>
          {children}
          <PublicShell>
            <Footer />
            <WhatsAppButton />
            <ScrollToTop />
          </PublicShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
