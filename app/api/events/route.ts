import { NextResponse } from "next/server";
import { getEvents } from "@/lib/data/events";

export function GET() {
  const events = getEvents();
  return NextResponse.json({ events });
}
