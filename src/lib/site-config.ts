export const siteConfig = {
  name: "The Lawn Cafe",
  tagline: "A Calm Escape in the Heart of Bsatine",
  description:
    "Premium coffee, fresh food, shisha, and outdoor moments crafted for everyday comfort and special occasions in Bsatine.",
  location: "Bsatine",
  mapCode: "QG4J+CR Bsatine",
  phoneDisplay: "03 035 551",
  phoneHref: "tel:+9613035551",
  whatsappNumber: "9613035551",
  whatsappUrl: "https://wa.me/9613035551",
  hoursShort: "Open Daily · 8:00 AM – 12:00 AM",
  hoursLong: "Open every day from 8:00 AM to 12:00 AM",
  rating: 4.8,
  instagramHandle: "@thelawn_cafe",
  instagramUrl: "https://www.instagram.com/thelawn_cafe?igsh=MXc3b2N5NTM1NzQzbQ==",
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "QG4J+CR Bsatine"
  )}`,
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Menu", href: "#menu" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Visit", href: "#visit" },
] as const;
