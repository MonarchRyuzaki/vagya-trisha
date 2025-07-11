import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { getBaseUrl } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VagyaTrisha - Professional Astrologer & Spiritual Guide",
  description:
    "Welcome to VagyaTrisha's spiritual sanctuary. Get expert astrological guidance, birth chart readings, relationship compatibility analysis, and spiritual healing. Professional astrology services with personalized consultations.",
  keywords: [
    "astrology",
    "astrologer VagyaTrisha",
    "birth chart reading",
    "horoscope",
    "spiritual guidance",
    "tarot reading",
    "numerology",
    "palmistry",
    "relationship compatibility",
    "career astrology",
    "spiritual healing",
    "astrological consultation",
    "professional astrologer",
  ],
  openGraph: {
    title: "VagyaTrisha - Professional Astrologer & Spiritual Guide",
    description:
      "Welcome to VagyaTrisha's spiritual sanctuary. Get expert astrological guidance, birth chart readings, relationship compatibility analysis, and spiritual healing.",
    url: getBaseUrl(),
    type: "website",
  },
  twitter: {
    title: "VagyaTrisha - Professional Astrologer & Spiritual Guide",
    description:
      "Welcome to VagyaTrisha's spiritual sanctuary. Get expert astrological guidance, birth chart readings, relationship compatibility analysis, and spiritual healing.",
  },
  alternates: {
    canonical: getBaseUrl(),
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
