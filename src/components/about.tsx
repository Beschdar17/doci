"use client";

import { motion } from "motion/react";
import { Award, Users, Clock, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const stats = [
  { icon: Clock, value: "10+", label: "Jahre Erfahrung" },
  { icon: Users, value: "500+", label: "Zufriedene Kunden" },
  { icon: Award, value: "100%", label: "Qualitätsanspruch" },
  { icon: CheckCircle2, value: "1000+", label: "Projekte" },
];

export function About() {
  return (
    <section
      id="ueber-uns"
      className="scroll-mt-20 bg-doci-light py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Über uns"
          subtitle="Erfahren Sie mehr über unser Unternehmen und unsere Philosophie."
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Platzhalter Bild */}
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-doci-red/10 to-doci-red/5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex aspect-[4/3] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-doci-red/10">
                  <Award className="h-10 w-10 text-doci-red" />
                </div>
                <p className="text-sm text-doci-gray">
                  Bild wird nachträglich eingefügt
                </p>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="mb-4 text-2xl font-bold text-doci-dark">
              Handwerk mit Leidenschaft
            </h3>
            <div className="space-y-4 text-doci-gray leading-relaxed">
              <p>
                DOCI ist Ihr zuverlässiger Partner für hochwertige Stuckateur-,
                Maler- und Sanierungsarbeiten. Mit über einem Jahrzehnt Erfahrung
                im Handwerk verbinden wir traditionelle Techniken mit modernen
                Methoden.
              </p>
              <p>
                Unser eingespieltes Team arbeitet mit Sorgfalt und Präzision — ob
                bei der behutsamen Altbausanierung, dem fachgerechten Trockenbau
                oder der professionellen Bodenverlegung. Wir stehen für
                termingerechte Ausführung und erstklassige Ergebnisse.
              </p>
              <p>
                Persönliche Beratung und individuelle Lösungen sind für uns
                selbstverständlich. Kontaktieren Sie uns für ein unverbindliches
                Angebot.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="mx-auto mb-2 h-6 w-6 text-doci-red" />
              <div className="text-3xl font-bold text-doci-dark">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-doci-gray">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
