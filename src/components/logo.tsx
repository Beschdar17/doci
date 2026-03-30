"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Platzhalter für Logo — hier später echtes Logo einfügen */}
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-doci-red">
        <span className="text-lg font-bold text-white">D</span>
      </div>
      <span className="text-xl font-bold tracking-tight text-doci-dark">
        DOCI
      </span>
    </div>
  );
}
