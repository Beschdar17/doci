"use client";

import { useState, useEffect, type FormEvent } from "react";
import {
  Plus,
  Trash2,
  LogOut,
  ImageIcon,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/image-upload";
import { GALLERY_CATEGORIES } from "@/lib/constants";
import type { GalleryItem } from "@/lib/gallery-data";

interface AdminDashboardProps {
  onLogout: () => void;
}

const categories: string[] = GALLERY_CATEGORIES.filter((c) => c !== "Alle");

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Formular-State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0] ?? "");
  const [beforeImage, setBeforeImage] = useState("");
  const [afterImage, setAfterImage] = useState("");
  const [formError, setFormError] = useState("");

  const loadItems = async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
      }
    } catch {
      // Fallback — bleibt leer
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError("Bitte geben Sie einen Titel ein.");
      return;
    }
    if (!beforeImage && !afterImage) {
      setFormError("Bitte laden Sie mindestens ein Bild hoch.");
      return;
    }

    setSaving(true);
    setFormError("");

    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          category,
          beforeImage,
          afterImage,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setItems((prev) => [...prev, data.data]);
        setTitle("");
        setBeforeImage("");
        setAfterImage("");
      } else {
        setFormError(data.error || "Fehler beim Speichern.");
      }
    } catch {
      setFormError("Ein Fehler ist aufgetreten.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);

    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }
    } catch {
      // Stille Fehlerbehandlung
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-doci-dark">
            Galerie verwalten
          </h1>
          <p className="text-sm text-doci-gray">
            Vorher/Nachher-Bilder hinzufügen oder entfernen.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Abmelden
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Formular — Neues Projekt */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Plus className="h-5 w-5 text-doci-red" />
              Neues Projekt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <Label htmlFor="project-title">Titel *</Label>
                <Input
                  id="project-title"
                  placeholder="z.B. Stuckarbeiten Altbau"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setFormError("");
                  }}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="project-category">Kategorie</Label>
                <select
                  id="project-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 flex h-10 w-full rounded-md border border-[var(--input)] bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-doci-red focus-visible:ring-offset-2"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Vorher-Bild Upload */}
              <ImageUpload
                label="Vorher-Foto *"
                value={beforeImage}
                onChange={setBeforeImage}
              />

              {/* Nachher-Bild Upload */}
              <ImageUpload
                label="Nachher-Foto *"
                value={afterImage}
                onChange={setAfterImage}
              />

              {formError && (
                <p role="alert" className="text-sm text-doci-red">
                  {formError}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Speichern...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Hinzufügen
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Bestehende Projekte */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-doci-dark">
            Bestehende Projekte ({items.length})
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-doci-red" />
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center text-doci-gray">
              <ImageIcon className="mx-auto mb-2 h-8 w-8" />
              <p>Noch keine Projekte vorhanden.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-lg border bg-white"
                >
                  {/* Bild-Vorschau */}
                  {(item.beforeImage || item.afterImage) && (
                    <div className="grid grid-cols-2">
                      <div className="aspect-video bg-stone-100">
                        {item.beforeImage ? (
                          <img
                            src={item.beforeImage}
                            alt="Vorher"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-stone-400">
                            Kein Vorher-Bild
                          </div>
                        )}
                      </div>
                      <div className="aspect-video bg-doci-red-light">
                        {item.afterImage ? (
                          <img
                            src={item.afterImage}
                            alt="Nachher"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-doci-red/40">
                            Kein Nachher-Bild
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium text-doci-dark">
                        {item.title}
                      </p>
                      <p className="text-sm text-doci-gray">
                        {item.category}
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="text-doci-gray hover:text-doci-red"
                      aria-label={`${item.title} löschen`}
                    >
                      {deletingId === item.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
