import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DOCI | Stuckateur & Sanierung",
  description:
    "DOCI — Ihr kompetenter Partner für Stuckateur- & Malerarbeiten, Trockenbau, Innendämmung, Altbausanierung, Tapezierarbeiten und Bodenlegearbeiten.",
  keywords: [
    "Stuckateur",
    "Malerarbeiten",
    "Trockenbau",
    "Innendämmung",
    "Altbausanierung",
    "Tapezierarbeiten",
    "Bodenlegearbeiten",
    "Sanierung",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
