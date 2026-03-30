export const NAV_LINKS = [
  { href: "/", label: "Startseite" },
  { href: "/galerie", label: "Galerie" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const SERVICES = [
  {
    id: "stuckateur",
    title: "Stuckateur- & Malerarbeiten",
    description:
      "Professionelle Stuck- und Malerarbeiten für Innen- und Außenbereiche. Wir verleihen Ihren Räumen neuen Glanz mit höchster Handwerksqualität.",
    icon: "PaintBucket",
  },
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
    id: "tapezieren",
    title: "Tapezierarbeiten",
    description:
      "Fachgerechtes Tapezieren mit hochwertigen Materialien. Von klassischen Mustern bis zu modernen Designtapeten – präzise und sauber verarbeitet.",
    icon: "Wallpaper",
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
  name: "DOCI GmbH",
  street: "Musterstraße 1",
  zip: "12345",
  city: "Musterstadt",
  phone: "0176 62567186",
  email: "info@doci.de",
  geschaeftsfuehrer: "Max Mustermann",
  registergericht: "Amtsgericht Musterstadt",
  registernummer: "HRB 12345",
  ustIdNr: "DE123456789",
} as const;

export const GALLERY_CATEGORIES = [
  "Alle",
  "Stuckateur",
  "Trockenbau",
  "Sanierung",
  "Boden",
] as const;

export const GALLERY_ITEMS = [
  { id: 1, category: "Stuckateur", title: "Stuckarbeiten Altbau" },
  { id: 2, category: "Trockenbau", title: "Büroausbau Trockenbau" },
  { id: 3, category: "Sanierung", title: "Altbausanierung Gründerzeit" },
  { id: 4, category: "Boden", title: "Parkettverlegung Eiche" },
  { id: 5, category: "Stuckateur", title: "Fassadengestaltung" },
  { id: 6, category: "Sanierung", title: "Komplettsanierung Wohnung" },
] as const;
