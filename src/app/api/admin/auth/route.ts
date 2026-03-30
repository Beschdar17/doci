import { NextResponse } from "next/server";
import { createHmac } from "crypto";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60_000;

const attempts = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",");
    return parts[parts.length - 1]!.trim();
  }

  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);

  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  const updated = { ...entry, count: entry.count + 1 };
  attempts.set(ip, updated);
  return updated.count > MAX_ATTEMPTS;
}

function constantTimeCompare(a: string, b: string): boolean {
  const key = "doci-admin-compare";
  const hmacA = createHmac("sha256", key).update(a).digest();
  const hmacB = createHmac("sha256", key).update(b).digest();

  if (hmacA.length !== hmacB.length) return false;

  let result = 0;
  for (let i = 0; i < hmacA.length; i++) {
    result |= hmacA[i]! ^ hmacB[i]!;
  }
  return result === 0;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && !origin.includes(host)) {
    return NextResponse.json(
      { success: false, error: "Ungültige Anfrage." },
      { status: 403 }
    );
  }

  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Zu viele Versuche. Bitte warten Sie eine Minute." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  try {
    const body: unknown = await request.json();

    if (
      !body ||
      typeof body !== "object" ||
      !("password" in body) ||
      typeof (body as { password: unknown }).password !== "string"
    ) {
      return NextResponse.json(
        { success: false, error: "Passwort erforderlich." },
        { status: 400 }
      );
    }

    const password = (body as { password: string }).password;

    if (password.length > 256) {
      return NextResponse.json(
        { success: false, error: "Ungültige Anfrage." },
        { status: 400 }
      );
    }

    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) {
      return NextResponse.json(
        { success: false, error: "Serverkonfigurationsfehler." },
        { status: 500 }
      );
    }

    if (constantTimeCompare(password, expected)) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: "Falsches Passwort." },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Ungültige Anfrage." },
      { status: 400 }
    );
  }
}
