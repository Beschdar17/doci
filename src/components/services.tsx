"use client";

import { motion } from "motion/react";
import {
  PaintBucket,
  Layers,
  Thermometer,
  Building2,
  Wallpaper,
  Grid3x3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { SERVICES } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  PaintBucket,
  Layers,
  Thermometer,
  Building2,
  Wallpaper,
  Grid3x3,
};

export function Services() {
  return (
    <section id="leistungen" className="scroll-mt-20 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Unsere Leistungen"
          subtitle="Kompetente Handwerksarbeit aus einer Hand — von der Planung bis zur Fertigstellung."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group h-full border-t-4 border-t-doci-red transition-shadow hover:shadow-lg">
                  <CardContent className="flex flex-col gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-doci-red-light">
                      {Icon && (
                        <Icon className="h-6 w-6 text-doci-red" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-doci-dark">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-doci-gray">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
