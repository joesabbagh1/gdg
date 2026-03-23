import { NextResponse } from "next/server";
import { getEvents, saveEvent, deleteEvent } from "@/lib/data/events";
import type { Event } from "@/types/event";

type AdminPayload = {
  slug: string;
  title: string;
  location: string;
  date: string;
  description: string;
  image?: string;
  startDate?: string;
};

function validatePayload(body: unknown): AdminPayload | null {
  if (!body || typeof body !== "object") return null;

  const { slug, title, location, date, description, image, startDate } =
    body as Partial<AdminPayload>;

  if (
    !slug ||
    !title ||
    !location ||
    !date ||
    !description ||
    typeof slug !== "string" ||
    typeof title !== "string" ||
    typeof location !== "string" ||
    typeof date !== "string" ||
    typeof description !== "string"
  ) {
    return null;
  }

  const trimmed: AdminPayload = {
    slug: slug.trim(),
    title: title.trim(),
    location: location.trim(),
    date: date.trim(),
    description: description.trim(),
    image: typeof image === "string" ? image.trim() || undefined : undefined,
    startDate:
      typeof startDate === "string" ? startDate.trim() || undefined : undefined,
  };

  if (
    !trimmed.slug ||
    !trimmed.title ||
    !trimmed.location ||
    !trimmed.date ||
    !trimmed.description
  ) {
    return null;
  }

  return trimmed;
}

export function GET() {
  const events = getEvents();
  return NextResponse.json({ ok: true, events });
}

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const payload = validatePayload(json);

  if (!payload) {
    return NextResponse.json(
      { ok: false, error: "Données invalides pour l'événement." },
      { status: 400 }
    );
  }

  const event: Event = {
    ...payload,
  };

  try {
    saveEvent(event);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Impossible d'enregistrer l'événement." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, event });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { ok: false, error: "Paramètre 'slug' manquant." },
      { status: 400 }
    );
  }

  try {
    deleteEvent(slug);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Impossible de supprimer l'événement." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

