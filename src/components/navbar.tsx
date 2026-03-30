"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white/95 backdrop-blur-sm overflow-visible">
      <nav className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {/* Logo — links */}
        <Link href="/" onClick={() => setIsOpen(false)} className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop Navigation — zentriert */}
        <div className="hidden flex-1 items-center justify-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-doci-red",
                pathname === link.href
                  ? "text-doci-red"
                  : "text-doci-dark"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Spacer für symmetrisches Centering (gleiche Breite wie Logo) */}
        <div className="hidden w-[100px] shrink-0 md:block" />

        {/* Mobile Hamburger */}
        <button
          className="ml-auto md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-doci-dark" />
          ) : (
            <Menu className="h-6 w-6 text-doci-dark" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-[var(--border)] bg-white md:hidden">
          <div className="space-y-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium transition-colors",
                  pathname === link.href
                    ? "bg-doci-red-light text-doci-red-dark"
                    : "text-doci-dark hover:bg-doci-light"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
