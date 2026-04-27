import { Gallery } from "@/components/gallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galerie | DOCI",
  description:
    "Unsere Projekte im Überblick — Vorher/Nachher-Bilder von Trockenbau-, Sanierungs- und Bodenarbeiten.",
};

export default function GaleriePage() {
  return <Gallery />;
}
