import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";
  const pathname = request.nextUrl.pathname;

  // Subdomain extrahieren (z.B. "admin" aus "admin.doci.de")
  // In Entwicklung: admin.localhost:4000
  const isLocalhost = hostname.includes("localhost") || hostname.includes("127.0.0.1");
  const baseDomain = isLocalhost
    ? "localhost"
    : hostname.split(".").slice(-2).join(".");

  const subdomain = hostname.replace(`.${baseDomain}`, "").replace(`:${request.nextUrl.port}`, "");

  // admin-Subdomain → alles auf /admin/* umleiten
  if (subdomain === "admin") {
    // Wenn schon auf /admin, durchlassen
    if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
      return NextResponse.next();
    }

    // Root der Subdomain → /admin
    if (pathname === "/") {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.rewrite(url);
    }

    // Alle anderen Pfade auf Subdomain → 404
    return NextResponse.rewrite(new URL("/admin" + pathname, request.url));
  }

  // Hauptdomain: /admin blockieren (nur über Subdomain erreichbar)
  // Aktivieren sobald eigene Domain + admin-Subdomain eingerichtet ist:
  // if (!isLocalhost && !hostname.includes("vercel.app") && pathname.startsWith("/admin")) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Alles matchen außer statische Dateien und Next.js internals
    "/((?!_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};
