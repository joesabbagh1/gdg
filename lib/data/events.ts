import fs from "fs";
import path from "path";
import type { Event } from "@/types/event";

const eventsPath = path.join(process.cwd(), "content", "events.json");

function readEventsFile(): Event[] {
  const raw = fs.readFileSync(eventsPath, "utf-8");
  return JSON.parse(raw) as Event[];
}

function writeEventsFile(events: Event[]): void {
  fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2), "utf-8");
}

export function getEvents(): Event[] {
  return readEventsFile();
}

export function getEventBySlug(slug: string): Event | undefined {
  return readEventsFile().find((event) => event.slug === slug);
}

function parseStartDate(event: Event): Date | null {
  if (!event.startDate) return null;
  const d = new Date(event.startDate);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function getUpcomingEvents(): Event[] {
  const all = readEventsFile();
  const now = new Date();

  const upcoming = all.filter((event) => {
    const d = parseStartDate(event);
    if (!d) return true; // pas de startDate => on considère que c'est à venir
    return d >= now;
  });

  return upcoming.sort((a, b) => {
    const da = parseStartDate(a);
    const db = parseStartDate(b);
    if (!da && !db) return 0;
    if (!da) return 1;
    if (!db) return -1;
    return da.getTime() - db.getTime();
  });
}

export function getPastEvents(): Event[] {
  const all = readEventsFile();
  const now = new Date();

  const past = all.filter((event) => {
    const d = parseStartDate(event);
    if (!d) return false; // pas de startDate => on ne le classe pas en passé
    return d < now;
  });

  return past.sort((a, b) => {
    const da = parseStartDate(a);
    const db = parseStartDate(b);
    if (!da && !db) return 0;
    if (!da) return 1;
    if (!db) return -1;
    return db.getTime() - da.getTime(); // plus récents d'abord
  });
}

export function saveEvent(event: Event): void {
  const all = readEventsFile();
  const index = all.findIndex((e) => e.slug === event.slug);
  if (index === -1) {
    all.push(event);
  } else {
    all[index] = event;
  }
  writeEventsFile(all);
}

export function deleteEvent(slug: string): void {
  const all = readEventsFile();
  const filtered = all.filter((e) => e.slug !== slug);
  writeEventsFile(filtered);
}


