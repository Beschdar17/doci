export const NAV_LINKS = [
  { href: "/", label: "Startseite" },
  { href: "/galerie", label: "Galerie" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const SERVICES = [
  {
    id: "trockenbau",
    title: "Trockenbau",
    description:
      "Flexible Raumgestaltung durch modernen Trockenbau. Von Trennwänden über abgehängte Decken bis hin zu komplexen Konstruktionen.",
    icon: "Layers",
  },
  {
    id: "innendaemmung",
    title: "Innendämmung",
    description:
      "Energieeffiziente Innendämmung für ein optimales Raumklima. Wir senken Ihre Heizkosten und steigern den Wohnkomfort nachhaltig.",
    icon: "Thermometer",
  },
  {
    id: "altbausanierung",
    title: "Altbausanierung",
    description:
      "Behutsame Sanierung von Altbauten mit Respekt vor der Bausubstanz. Wir verbinden historischen Charme mit modernem Komfort.",
    icon: "Building2",
  },
  {
    id: "boden",
    title: "Bodenlegearbeiten",
    description:
      "Verlegung von Teppich, Laminat, Parkett und Fliesen. Wir schaffen die perfekte Grundlage für Ihr Zuhause – fachgerecht und langlebig.",
    icon: "Grid3x3",
  },
] as const;

export const COMPANY_INFO = {
  name: "DOCI Trockenbau",
  inhaber: "Edmond Doci",
  street: "Imweg 50",
  zip: "70329",
  city: "Stuttgart",
  phone: "0176 62567186",
  email: "info@doci-trockenbau.de",
} as const;

export const GALLERY_CATEGORIES = [
  "Alle",
  "Trockenbau",
  "Sanierung",
  "Boden",
] as const;

export const GALLERY_ITEMS = [
  { id: 2, category: "Trockenbau", title: "Büroausbau Trockenbau" },
  { id: 3, category: "Sanierung", title: "Altbausanierung Gründerzeit" },
  { id: 4, category: "Boden", title: "Parkettverlegung Eiche" },
  { id: 6, category: "Sanierung", title: "Komplettsanierung Wohnung" },
] as const;
