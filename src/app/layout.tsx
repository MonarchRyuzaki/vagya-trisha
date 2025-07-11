import { Toaster } from "@/components/ui/toaster";
import { getBaseUrl } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "VagyaTrisha - Professional Astrologer & Spiritual Guide",
    template: "%s | VagyaTrisha",
  },
  description:
    "Professional astrology services by VagyaTrisha. Get personalized birth chart readings, relationship compatibility analysis, career guidance, and spiritual healing. Book your consultation today.",
  keywords: [
    "astrology",
    "astrologer",
    "birth chart",
    "horoscope",
    "spiritual guidance",
    "tarot reading",
    "numerology",
    "palmistry",
    "relationship compatibility",
    "career astrology",
    "VagyaTrisha",
  ],
  authors: [{ name: "VagyaTrisha" }],
  creator: "VagyaTrisha",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: getBaseUrl(),
    title: "VagyaTrisha - Professional Astrologer & Spiritual Guide",
    description:
      "Professional astrology services by VagyaTrisha. Get personalized birth chart readings, relationship compatibility analysis, career guidance, and spiritual healing.",
    siteName: "VagyaTrisha",
  },
  twitter: {
    card: "summary_large_image",
    title: "VagyaTrisha - Professional Astrologer & Spiritual Guide",
    description:
      "Professional astrology services by VagyaTrisha. Get personalized birth chart readings, relationship compatibility analysis, career guidance, and spiritual healing.",
    creator: "@vagyatrisha",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: getBaseUrl(),
    languages: {
      "en-US": "/en-US",
    },
  },
  category: "Spirituality",
  classification: "Astrology Services",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  generator: "Next.js",
  applicationName: "VagyaTrisha",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "VagyaTrisha",
  },
  other: {
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
  },
  bookmarks: [getBaseUrl()],
  archives: [`${getBaseUrl()}/blog`],
  assets: [`${getBaseUrl()}/assets`],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png" },
      { url: "/apple-icon-x3.png", sizes: "180x180", type: "image/png" },
    ],
  },
  // Additional metadata for astrology/spiritual services
  // This helps categorize the content appropriately
  // Also useful for specialized search engines or directories
  abstract:
    "Professional astrology and spiritual guidance services by VagyaTrisha",
  // Note: Some metadata properties are Next.js specific and may not be standard HTML meta tags
  // Always test your metadata using tools like:
  // - Google's Rich Results Test
  // - Facebook's Sharing Debugger
  // - Twitter's Card Validator
  // - LinkedIn's Post Inspector
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/sparkles.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/sparkles.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Belleza&display=swap"
          rel="stylesheet"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "VagyaTrisha",
              jobTitle: "Professional Astrologer",
              description:
                "Expert astrological guidance and spiritual counseling",
              url: getBaseUrl(),
              image: `${getBaseUrl()}/about_image.jpg`,
              sameAs: [
                // Add your social media profiles
                "https://www.instagram.com/vagyatrisha",
                "https://www.facebook.com/vagyatrisha",
                "https://twitter.com/vagyatrisha",
              ],
              knowsAbout: [
                "Astrology",
                "Spiritual Guidance",
                "Birth Chart Reading",
                "Tarot Reading",
                "Relationship Compatibility",
                "Career Guidance",
              ],
              offers: {
                "@type": "Service",
                name: "Astrological Consultation",
                description:
                  "Personalized astrological readings and spiritual guidance",
              },
            }),
          }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
