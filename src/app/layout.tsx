import type { Metadata, Viewport } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "The Lawn Cafe | Bsatine",
  description:
    "The Lawn Cafe in Bsatine — premium coffee, fresh food, shisha, and outdoor moments in a calm garden setting. Open daily 8:00 AM – 12:00 AM.",
  keywords: [
    "The Lawn Cafe",
    "Bsatine cafe",
    "cafe Bsatine",
    "shisha Bsatine",
    "outdoor cafe Lebanon",
  ],
  openGraph: {
    title: "The Lawn Cafe | Bsatine",
    description:
      "Premium coffee, fresh food, shisha, and outdoor moments crafted for everyday comfort and special occasions.",
    siteName: "The Lawn Cafe",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf5ea",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
