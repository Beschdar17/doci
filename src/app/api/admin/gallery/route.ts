import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import type { GalleryItem } from "@/lib/gallery-data";
import { DEFAULT_GALLERY_ITEMS } from "@/lib/gallery-data";

const DATA_DIR = join(process.cwd(), "data");
const DATA_FILE = join(DATA_DIR, "gallery.json");

async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(data) as GalleryItem[];
  } catch {
    return DEFAULT_GALLERY_ITEMS;
  }
}

async function saveGalleryItems(items: GalleryItem[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf-8");
}

// GET — Alle Gallery-Items laden
export async function GET() {
  const items = await getGalleryItems();
  return NextResponse.json({ success: true, data: items });
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
  } catch {
    return NextResponse.json(
      { success: false, error: "Ungültige Anfrage." },
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
  } catch {
    return NextResponse.json(
      { success: false, error: "Ungültige Anfrage." },
      { status: 400 }
    );
  }
}
