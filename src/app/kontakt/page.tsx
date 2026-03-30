import { Contact } from "@/components/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt | DOCI",
  description:
    "Nehmen Sie Kontakt mit DOCI auf — wir beraten Sie gerne unverbindlich zu Ihrem Projekt.",
};

export default function KontaktPage() {
  return <Contact />;
}
