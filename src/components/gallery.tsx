"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageIcon, ArrowLeftRight, Loader2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { GALLERY_CATEGORIES } from "@/lib/constants";
import type { GalleryItem } from "@/lib/gallery-data";

export function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("Alle");

  // Lightbox
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [lightboxView, setLightboxView] = useState<"before" | "after">("before");

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

  const withImages = filtered.filter(
    (item) => item.beforeImage || item.afterImage
  );

  const openLightbox = (item: GalleryItem) => {
    setLightboxItem(item);
    setLightboxView(item.beforeImage ? "before" : "after");
  };

  const closeLightbox = useCallback(() => {
    setLightboxItem(null);
  }, []);

  // ESC zum Schließen
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") setLightboxView("before");
      if (e.key === "ArrowRight") setLightboxView("after");
    };
    if (lightboxItem) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxItem, closeLightbox]);

  const currentImage =
    lightboxItem && lightboxView === "before"
      ? lightboxItem.beforeImage
      : lightboxItem?.afterImage;

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
            <p className="text-doci-gray">Noch keine Projekte vorhanden.</p>
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
                <Card
                  className="group cursor-pointer overflow-hidden transition-shadow hover:shadow-lg"
                  onClick={() => openLightbox(item)}
                >
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

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Schließen-Button */}
            <button
              onClick={closeLightbox}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              aria-label="Schließen"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Titel */}
            <div className="absolute left-4 top-4 text-white">
              <h3 className="text-lg font-semibold">{lightboxItem.title}</h3>
              <p className="text-sm text-white/60">{lightboxItem.category}</p>
            </div>

            {/* Bild */}
            <div
              className="relative flex max-h-[80vh] max-w-5xl items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Vorher/Nachher Buttons */}
              {lightboxItem.beforeImage && lightboxItem.afterImage && (
                <>
                  <button
                    onClick={() => setLightboxView("before")}
                    className="absolute left-2 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 md:left-4"
                    aria-label="Vorher anzeigen"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => setLightboxView("after")}
                    className="absolute right-2 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 md:right-4"
                    aria-label="Nachher anzeigen"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {currentImage && (
                <img
                  src={currentImage}
                  alt={`${lightboxItem.title} — ${lightboxView === "before" ? "Vorher" : "Nachher"}`}
                  className="max-h-[80vh] max-w-full rounded-lg object-contain"
                />
              )}

              {/* Vorher/Nachher Label */}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {lightboxItem.beforeImage && (
                  <button
                    onClick={() => setLightboxView("before")}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      lightboxView === "before"
                        ? "bg-white text-doci-dark"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    Vorher
                  </button>
                )}
                {lightboxItem.afterImage && (
                  <button
                    onClick={() => setLightboxView("after")}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      lightboxView === "after"
                        ? "bg-doci-red text-white"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    Nachher
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
