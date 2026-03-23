import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type NewsletterEntry = {
  email: string;
  subscribedAt: string;
};

const newsletterPath = path.join(process.cwd(), "content", "newsletter.json");

function ensureStorageFile() {
  if (!fs.existsSync(newsletterPath)) {
    fs.writeFileSync(newsletterPath, "[]", "utf-8");
  }
}

function isValidEmail(email: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

function readSubscriptions(): NewsletterEntry[] {
  ensureStorageFile();
  const raw = fs.readFileSync(newsletterPath, "utf-8");
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed as NewsletterEntry[];
    }
    return [];
  } catch {
    return [];
  }
}

function writeSubscriptions(entries: NewsletterEntry[]) {
  fs.writeFileSync(newsletterPath, JSON.stringify(entries, null, 2), "utf-8");
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!email) {
    return NextResponse.json(
      { ok: false, error: "Email manquant." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Adresse email invalide." },
      { status: 400 }
    );
  }

  const current = readSubscriptions();
  const alreadySubscribed = current.some(
    (entry) => entry.email.toLowerCase() === email.toLowerCase()
  );

  if (alreadySubscribed) {
    return NextResponse.json(
      {
        ok: true,
        message: "Vous êtes déjà inscrit à la newsletter.",
      },
      { status: 200 }
    );
  }

  const updated: NewsletterEntry[] = [
    ...current,
    { email, subscribedAt: new Date().toISOString() },
  ];

  try {
    writeSubscriptions(updated);
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Impossible d'enregistrer votre inscription pour le moment. Réessayez plus tard.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Merci, votre inscription à la newsletter est enregistrée.",
  });
}

