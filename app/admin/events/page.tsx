"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Event } from "@/types/event";
import { useRouter } from "next/navigation";

type Status = "idle" | "loading" | "success" | "error";

export default function AdminEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    slug: "",
    title: "",
    location: "",
    date: "",
    description: "",
    image: "",
    startDate: "",
  });

  useEffect(() => {
    async function loadEvents() {
      const res = await fetch("/api/admin/events");
      const data = await res.json().catch(() => null);
      if (res.status === 401) {
        router.push("/admin/login?next=/admin/events");
        return;
      }
      if (data?.ok && Array.isArray(data.events)) {
        setEvents(data.events);
      }
    }
    loadEvents();
  }, [router]);

  function updateField<K extends keyof typeof form>(field: K, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setMessage(data?.error ?? "Erreur lors de l'enregistrement de l'événement.");
        return;
      }

      setStatus("success");
      setMessage("Événement enregistré.");
      setEvents((prev) => {
        const existingIndex = prev.findIndex((e) => e.slug === data.event.slug);
        if (existingIndex === -1) {
          return [...prev, data.event];
        }
        const copy = [...prev];
        copy[existingIndex] = data.event;
        return copy;
      });
    } catch {
      setStatus("error");
      setMessage("Impossible de contacter le serveur.");
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm("Supprimer cet événement ?")) return;

    try {
      const res = await fetch(`/api/admin/events?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setStatus("error");
        setMessage(data?.error ?? "Erreur lors de la suppression de l'événement.");
        return;
      }

      setEvents((prev) => prev.filter((e) => e.slug !== slug));
      setStatus("success");
      setMessage("Événement supprimé.");
    } catch {
      setStatus("error");
      setMessage("Impossible de contacter le serveur.");
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background to-muted/20">
      <Navbar />

      <main className="container mx-auto px-4 py-12 flex-1">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#4285F4] via-[#DB4437] to-[#0F9D58] bg-clip-text text-transparent">
          Admin - Événements
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Interface simple pour ajouter, mettre à jour ou supprimer des événements affichés sur le site.
        </p>
        <div className="mb-8 flex justify-end">
          <Button
            variant="outline"
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
              router.push("/");
              router.refresh();
            }}
          >
            Se déconnecter
          </Button>
        </div>

        <section className="mb-10 rounded-3xl border-2 border-border/50 bg-background/70 p-6 backdrop-blur-sm shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Ajouter / mettre à jour un événement</h2>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <label className="text-sm font-medium">
                Slug
                <span className="ml-1 text-xs text-muted-foreground">
                  (identifiant unique, utilisé dans l’URL)
                </span>
              </label>
              <Input
                value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                placeholder="ex: workshop-kubernetes"
                required
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Titre</label>
              <Input
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Titre de l'événement"
                required
              />
            </div>
            <div className="grid gap-2 md:grid-cols-2 md:gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Lieu</label>
                <Input
                  value={form.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="Amphi 1, Online, ..."
                  required
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Date (affichée)</label>
                <Input
                  value={form.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  placeholder="14 Fév, 2026-03-19, ..."
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">
                Date technique (ISO) pour le tri auto
                <span className="ml-1 text-xs text-muted-foreground">
                  (ex: <code>2026-03-18T18:00:00+01:00</code> ou <code>2026-03-18</code>)
                </span>
              </label>
              <Input
                value={form.startDate}
                onChange={(e) => updateField("startDate", e.target.value)}
                placeholder="2026-03-18T18:00:00+01:00"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="min-h-[120px] rounded-xl border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]/20 focus-visible:border-[#4285F4]"
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">
                Image (optionnel)
                <span className="ml-1 text-xs text-muted-foreground">
                  (chemin dans <code>public/</code>, ex: <code>/events/angular-2026.png</code>)
                </span>
              </label>
              <Input
                value={form.image}
                onChange={(e) => updateField("image", e.target.value)}
                placeholder="/events/mon-visuel.png"
              />
            </div>
            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full sm:w-auto bg-gradient-to-r from-[#4285F4] via-[#DB4437] to-[#0F9D58] text-white shadow-lg hover:shadow-xl"
            >
              {status === "loading" ? "Enregistrement..." : "Enregistrer l'événement"}
            </Button>
          </form>
          {message && (
            <p
              className={`mt-4 text-sm font-medium ${
                status === "error" ? "text-red-500" : "text-[#0F9D58]"
              }`}
            >
              {message}
            </p>
          )}
        </section>

        <section className="rounded-3xl border-2 border-border/50 bg-background/70 p-6 backdrop-blur-sm shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Événements existants</h2>
          {events.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aucun événement pour le moment.
            </p>
          ) : (
            <ul className="space-y-3">
              {events.map((event) => (
                <li
                  key={event.slug}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border border-border/60 rounded-2xl px-4 py-3 bg-muted/40"
                >
                  <div>
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.date} • {event.location} • slug: {event.slug}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setForm({
                          slug: event.slug,
                          title: event.title,
                          location: event.location,
                          date: event.date,
                          description: event.description,
                          image: event.image ?? "",
                          startDate: event.startDate ?? "",
                        })
                      }
                    >
                      Éditer
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(event.slug)}
                    >
                      Supprimer
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

