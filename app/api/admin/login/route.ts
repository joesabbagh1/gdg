import { NextResponse } from "next/server";

const ADMIN_COOKIE = "gdg_admin";

export async function POST(request: Request) {
  const secret = process.env.ADMIN_SECRET;

  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_SECRET n'est pas configuré." },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const provided = typeof body?.secret === "string" ? body.secret : "";

  if (provided !== secret) {
    return NextResponse.json({ ok: false, error: "Clé invalide." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: ADMIN_COOKIE,
    value: secret,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}

