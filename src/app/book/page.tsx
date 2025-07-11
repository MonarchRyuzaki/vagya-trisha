import { BookingForm } from "@/components/booking-form";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getBaseUrl } from "@/lib/utils";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Book Consultation - Schedule Your Astrological Reading",
  description:
    "Book your personalized astrological consultation with VagyaTrisha. Choose from birth chart readings, relationship compatibility analysis, career guidance, and spiritual healing sessions. Easy online booking available.",
  keywords: [
    "book astrology consultation",
    "schedule astrological reading",
    "astrology appointment",
    "birth chart reading booking",
    "spiritual consultation booking",
    "astrologer appointment",
    "online astrology session",
    "book tarot reading",
  ],
  openGraph: {
    title:
      "Book Consultation - Schedule Your Astrological Reading | VagyaTrisha",
    description:
      "Book your personalized astrological consultation with VagyaTrisha. Choose from birth chart readings, relationship compatibility analysis, career guidance, and spiritual healing sessions.",
    url: `${getBaseUrl()}/book`,
  },
  twitter: {
    title:
      "Book Consultation - Schedule Your Astrological Reading | VagyaTrisha",
    description:
      "Book your personalized astrological consultation with VagyaTrisha. Choose from birth chart readings, relationship compatibility analysis, career guidance, and spiritual healing sessions.",
  },
  alternates: {
    canonical: `${getBaseUrl()}/book`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Book() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <Suspense fallback={<div>Loading...</div>}>
          <BookingForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
