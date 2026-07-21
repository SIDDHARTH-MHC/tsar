import { Cormorant_Garamond, Figtree } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@/components/analytics/Analytics";
import { allJsonLd } from "@/lib/seo";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
  preload: true,
});

const sans = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TSAR Darbaar | Scent Branding & Commercial Fragrance Solutions India",
  description:
    "Signature scent identities for hotels, offices, retail and wellness spaces. In-house perfumery, professional installation, 24-hour service - across India. Request a consultation.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://darbaar.tsarperfumes.com",
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TSAR Darbaar | Scent Branding & Commercial Fragrance Solutions India",
    description:
      "Signature scent identities for hotels, offices, retail and wellness spaces. In-house perfumery, professional installation, 24-hour service - across India.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "TSAR Darbaar | Scent Branding India",
    description:
      "Signature scent identities for hotels, offices, retail and wellness spaces across India.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "TSAR Darbaar",
  },
  formatDetection: {
    telephone: true,
    email: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F4EE" },
    { media: "(prefers-color-scheme: dark)", color: "#121112" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = allJsonLd();

  return (
    <html lang="en-IN" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
