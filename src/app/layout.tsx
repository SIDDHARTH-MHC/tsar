import { Cormorant_Garamond, Figtree } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
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
    "Signature scent identities for hotels, offices, retail and wellness spaces. In-house perfumery, professional installation, 24-hour service — across India. Request a consultation.",
  metadataBase: new URL("https://darbaar.tsarperfumes.com"),
  openGraph: {
    title: "TSAR Darbaar | Scent Branding & Commercial Fragrance Solutions India",
    description:
      "Signature scent identities for hotels, offices, retail and wellness spaces. In-house perfumery, professional installation, 24-hour service — across India.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "TSAR Darbaar | Scent Branding India",
    description:
      "Signature scent identities for hotels, offices, retail and wellness spaces across India.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
