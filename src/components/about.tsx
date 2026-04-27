"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/section-heading";

export function About() {
  return (
    <section
      id="ueber-uns"
      className="scroll-mt-20 bg-doci-light py-20 md:py-28"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Über uns"
          subtitle="Erfahren Sie mehr über unser Unternehmen und unsere Philosophie."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="mb-4 text-2xl font-bold text-doci-dark">
            Handwerk mit Leidenschaft
          </h3>
          <div className="space-y-4 text-doci-gray leading-relaxed">
            <p>
              DOCI ist Ihr zuverlässiger Partner für hochwertige Trockenbau-,
              Sanierungs- und Bodenarbeiten. Mit über einem Jahrzehnt Erfahrung
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
    </section>
  );
}
