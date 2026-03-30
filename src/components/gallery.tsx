"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ImageIcon, ArrowLeftRight, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { GALLERY_CATEGORIES } from "@/lib/constants";
import type { GalleryItem } from "@/lib/gallery-data";

export function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("Alle");

  useEffect(() => {
    fetch("/api/admin/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setItems(data.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeCategory === "Alle"
      ? items
      : items.filter((item) => item.category === activeCategory);

  // Nur Einträge mit mindestens einem Bild anzeigen
  const withImages = filtered.filter(
    (item) => item.beforeImage || item.afterImage
  );

  return (
    <div className="py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Unsere Projekte"
          subtitle="Vorher/Nachher — überzeugen Sie sich von unserer Arbeit."
        />

        {/* Filter */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {GALLERY_CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-doci-red" />
          </div>
        ) : withImages.length === 0 ? (
          <div className="py-16 text-center">
            <ImageIcon className="mx-auto mb-3 h-12 w-12 text-doci-gray/40" />
            <p className="text-doci-gray">
              Noch keine Projekte vorhanden.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {withImages.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
              >
                <Card className="group overflow-hidden">
                  <div className="relative grid grid-cols-2">
                    {/* Vorher */}
                    <div className="flex aspect-square items-center justify-center bg-stone-200">
                      {item.beforeImage ? (
                        <img
                          src={item.beforeImage}
                          alt={`${item.title} — Vorher`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <ImageIcon className="mx-auto h-8 w-8 text-stone-400" />
                          <span className="mt-1 block text-xs text-stone-500">
                            Vorher
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Nachher */}
                    <div className="flex aspect-square items-center justify-center bg-doci-red-light">
                      {item.afterImage ? (
                        <img
                          src={item.afterImage}
                          alt={`${item.title} — Nachher`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <ImageIcon className="mx-auto h-8 w-8 text-doci-red/40" />
                          <span className="mt-1 block text-xs text-doci-red/60">
                            Nachher
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Divider */}
                    <div className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
                        <ArrowLeftRight className="h-4 w-4 text-doci-dark" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-doci-dark">{item.title}</h3>
                    <p className="text-sm text-doci-gray">{item.category}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
