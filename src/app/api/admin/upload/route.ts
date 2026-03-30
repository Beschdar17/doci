import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Keine Datei ausgewählt." },
        { status: 400 }
      );
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "Datei ist zu groß (max. 10 MB)." },
        { status: 400 }
      );
    }

    // Nur Bilder erlauben
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "Nur Bilddateien sind erlaubt." },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const pathname = `gallery/${timestamp}-${safeName}`;

    const blob = await put(pathname, file, {
      access: "public",
    });

    return NextResponse.json({ success: true, url: blob.url });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Upload fehlgeschlagen.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
