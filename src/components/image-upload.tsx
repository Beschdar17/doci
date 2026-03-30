"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export function ImageUpload({ label, value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        onChange(data.url);
      } else {
        setError(data.error || "Upload fehlgeschlagen.");
      }
    } catch {
      setError("Upload fehlgeschlagen. Bitte erneut versuchen.");
    } finally {
      setUploading(false);
      // Input zurücksetzen damit gleiche Datei nochmal gewählt werden kann
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    onChange("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      <p className="mb-1.5 text-sm font-medium">{label}</p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {value ? (
        <div className="relative overflow-hidden rounded-lg border">
          <img
            src={value}
            alt={label}
            className="h-40 w-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute right-2 top-2 rounded-full bg-white/90 p-1 shadow-sm hover:bg-white"
            aria-label="Bild entfernen"
          >
            <X className="h-4 w-4 text-doci-dark" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-40 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--border)] bg-doci-light transition-colors hover:border-doci-red hover:bg-doci-red-light"
        >
          {uploading ? (
            <>
              <Loader2 className="mb-2 h-8 w-8 animate-spin text-doci-red" />
              <span className="text-sm text-doci-gray">Wird hochgeladen...</span>
            </>
          ) : (
            <>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white">
                <Upload className="h-5 w-5 text-doci-red" />
              </div>
              <span className="text-sm font-medium text-doci-dark">
                Foto auswählen
              </span>
              <span className="mt-0.5 text-xs text-doci-gray">
                oder Kamera öffnen
              </span>
            </>
          )}
        </button>
      )}

      {error && (
        <p role="alert" className="mt-1 text-sm text-doci-red">
          {error}
        </p>
      )}
    </div>
  );
}
