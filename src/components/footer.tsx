import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "@/components/logo";
import { COMPANY_INFO, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-doci-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Company */}
          <div>
            <div className="mb-4">
              <img
                src="/logo.png"
                alt="DOCI"
                className="h-16 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm text-white/60">
              Ihr kompetenter Partner für Stuckateur- und Sanierungsarbeiten.
              Qualität und Zuverlässigkeit seit Jahren.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
              Navigation
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-doci-red"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
              Kontakt
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-doci-red" />
                <span>
                  {COMPANY_INFO.street}
                  <br />
                  {COMPANY_INFO.zip} {COMPANY_INFO.city}
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="h-4 w-4 shrink-0 text-doci-red" />
                <a href={`tel:${COMPANY_INFO.phone.replace(/\s/g, "")}`} className="hover:text-doci-red transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="h-4 w-4 shrink-0 text-doci-red" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-doci-red transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/40">
          <p>
            &copy; {year} {COMPANY_INFO.name}. Alle Rechte vorbehalten. |{" "}
            <Link
              href="/impressum"
              className="underline transition-colors hover:text-doci-red"
            >
              Impressum
            </Link>
            {" | "}
            <Link
              href="/datenschutz"
              className="underline transition-colors hover:text-doci-red"
            >
              Datenschutz
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
