import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function validatePayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object") return null;

  const { name, email, subject, message } = body as Partial<ContactPayload>;

  if (
    !name ||
    !email ||
    !subject ||
    !message ||
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof subject !== "string" ||
    typeof message !== "string"
  ) {
    return null;
  }

  const trimmed: ContactPayload = {
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
  };

  if (!trimmed.name || !trimmed.email || !trimmed.subject || !trimmed.message) {
    return null;
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed.email)) {
    return null;
  }

  return trimmed;
}

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const payload = validatePayload(json);

  if (!payload) {
    return NextResponse.json(
      { ok: false, error: "Données invalides. Vérifiez les champs du formulaire." },
      { status: 400 }
    );
  }

  // Ici on pourrait envoyer un email (SendGrid, Resend, etc.).
  // Pour l'instant, on confirme simplement la réception côté backend.

  return NextResponse.json({
    ok: true,
    message: "Votre message a bien été reçu. Nous reviendrons vers vous rapidement.",
  });
}

