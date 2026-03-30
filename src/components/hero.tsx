"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { MoveRight, PhoneCall } from "lucide-react";
import Link from "next/link";

const titles = [
  "Stuckateur & Maler",
  "Trockenbau",
  "Altbausanierung",
  "Innendämmung",
  "Bodenarbeiten",
];

export function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setTitleNumber((prev) => (prev + 1) % titles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden" aria-label="Hero">
      {/* Hintergrundbild */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80')",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/95" />

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-6 text-center">
        <div className="container mx-auto flex flex-col items-center gap-8 md:gap-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-doci-red/20 bg-doci-red-light px-4 py-1.5 text-sm text-doci-red-dark">
            <span className="h-2 w-2 rounded-full bg-doci-red animate-pulse" />
            Qualität aus Meisterhand
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tighter font-bold text-doci-dark">
              Ihr Partner für
            </h1>
            <div className="relative h-[60px] md:h-[80px] lg:h-[96px] mt-2">
              {titles.map((title, index) => (
                <motion.p
                  key={index}
                  className="absolute inset-0 flex items-center justify-center text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-doci-red whitespace-nowrap"
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  animate={
                    titleNumber === index
                      ? { y: 0, opacity: 1 }
                      : {
                          y: titleNumber > index ? -30 : 30,
                          opacity: 0,
                        }
                  }
                >
                  {title}
                </motion.p>
              ))}
            </div>
          </div>

          <p className="text-base md:text-xl leading-relaxed tracking-tight text-doci-gray max-w-2xl text-center">
            DOCI steht für erstklassige Handwerksarbeit in den Bereichen
            Stuckateur, Trockenbau, Sanierung und Bodenarbeiten. Persönlich,
            zuverlässig und termingerecht.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild>
              <Link href="/#leistungen">
                Unsere Leistungen
                <MoveRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-doci-red/30 text-doci-red hover:bg-doci-red hover:text-white"
              asChild
            >
              <Link href="/kontakt">
                <PhoneCall className="mr-2 h-4 w-4" />
                Kontakt aufnehmen
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
