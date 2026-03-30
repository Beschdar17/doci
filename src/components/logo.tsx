"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <img
        src="/logo.png"
        alt="DOCI — Trockenbau, Bauunternehmer, Boden Leger"
        className="h-10 w-auto"
      />
    </div>
  );
}
