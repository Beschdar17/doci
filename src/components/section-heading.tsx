"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn("mb-12 text-center", className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight sm:text-4xl",
          light ? "text-white" : "text-doci-dark"
        )}
      >
        {title}
      </h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-doci-red" />
      {subtitle && (
        <p
          className={cn(
            "mx-auto mt-4 max-w-2xl text-lg",
            light ? "text-white/70" : "text-doci-gray"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
