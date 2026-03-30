export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  createdAt: string;
}

// Default-Projekte — werden durch Admin-Verwaltung ergänzt/ersetzt
export const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    title: "Stuckarbeiten Altbau",
    category: "Stuckateur",
    beforeImage: "",
    afterImage: "",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Büroausbau Trockenbau",
    category: "Trockenbau",
    beforeImage: "",
    afterImage: "",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    title: "Altbausanierung Gründerzeit",
    category: "Sanierung",
    beforeImage: "",
    afterImage: "",
    createdAt: "2024-03-10",
  },
  {
    id: "4",
    title: "Parkettverlegung Eiche",
    category: "Boden",
    beforeImage: "",
    afterImage: "",
    createdAt: "2024-04-05",
  },
  {
    id: "5",
    title: "Fassadengestaltung",
    category: "Stuckateur",
    beforeImage: "",
    afterImage: "",
    createdAt: "2024-05-12",
  },
  {
    id: "6",
    title: "Komplettsanierung Wohnung",
    category: "Sanierung",
    beforeImage: "",
    afterImage: "",
    createdAt: "2024-06-01",
  },
];
