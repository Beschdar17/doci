import { NextResponse } from "next/server";
import { put, list } from "@vercel/blob";
import type { GalleryItem } from "@/lib/gallery-data";
import { DEFAULT_GALLERY_ITEMS } from "@/lib/gallery-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const GALLERY_DATA_PATH = "data/gallery.json";

async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const blobs = await list({ prefix: "data/gallery" });
    const existing = blobs.blobs.find((b) => b.pathname === GALLERY_DATA_PATH);

    if (!existing) {
      return DEFAULT_GALLERY_ITEMS;
    }

    const cacheBust = `?t=${Date.now()}`;
    const res = await fetch(existing.url + cacheBust, { cache: "no-store" });
    const data = (await res.json()) as GalleryItem[];
    return data;
  } catch {
    return DEFAULT_GALLERY_ITEMS;
  }
}

async function saveGalleryItems(items: GalleryItem[]): Promise<void> {
  const json = JSON.stringify(items, null, 2);
  await put(GALLERY_DATA_PATH, json, {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

const NO_CACHE_HEADERS = {
  ...CORS_HEADERS,
  "Cache-Control": "no-store, no-cache, must-revalidate",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

// GET — Alle Gallery-Items laden
export async function GET() {
  const items = await getGalleryItems();
  return NextResponse.json(
    { success: true, data: items },
    { headers: NO_CACHE_HEADERS }
  );
}

// POST — Neues Item hinzufügen
export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (
      !body ||
      typeof body !== "object" ||
      !("title" in body) ||
      !("category" in body)
    ) {
      return NextResponse.json(
        { success: false, error: "Titel und Kategorie erforderlich." },
        { status: 400 }
      );
    }

    const { title, category, beforeImage, afterImage } = body as {
      title: string;
      category: string;
      beforeImage?: string;
      afterImage?: string;
    };

    const items = await getGalleryItems();

    const newItem: GalleryItem = {
      id: crypto.randomUUID(),
      title: title.trim(),
      category: category.trim(),
      beforeImage: beforeImage?.trim() ?? "",
      afterImage: afterImage?.trim() ?? "",
      createdAt: new Date().toISOString().split("T")[0]!,
    };

    const updated = [...items, newItem];
    await saveGalleryItems(updated);

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Ungültige Anfrage.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}

// DELETE — Item entfernen
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID erforderlich." },
        { status: 400 }
      );
    }

    const items = await getGalleryItems();
    const filtered = items.filter((item) => item.id !== id);

    if (filtered.length === items.length) {
      return NextResponse.json(
        { success: false, error: "Eintrag nicht gefunden." },
        { status: 404 }
      );
    }

    await saveGalleryItems(filtered);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Ungültige Anfrage.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
