import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getEventBySlug, getEvents } from "@/lib/data/events";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/solid";

export function generateStaticParams() {
  return getEvents().map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: "Événement introuvable",
      robots: { index: false, follow: false },
    };
  }

  const title = event.title;
  const description =
    event.description.length > 180
      ? `${event.description.slice(0, 177)}...`
      : event.description;
  const image = event.image ?? "/logo_name.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background to-muted/20">
      <Navbar />

      {/* Hero image full width, s'adapte à tout format */}
      {event.image ? (
        <div className="w-full bg-gradient-to-r from-[#4285F4]/20 via-[#F4B400]/20 to-[#0F9D58]/20">
          <div className="relative mx-auto max-w-5xl h-56 sm:h-72 md:h-80 lg:h-96 flex items-center justify-center">
            <div className="relative h-[80%] w-[92%] sm:h-[82%] sm:w-[90%] md:h-[85%] md:w-[88%] lg:h-[85%] lg:w-[85%] rounded-3xl bg-white shadow-xl overflow-hidden">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      ) : null}

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-10">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Événement
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground">
              <span>{event.date}</span>
              <span>•</span>
              <span>{event.location}</span>
            </div>
          </div>

          {/* Layout: content + side info */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-10 items-start">
            {/* Left: about */}
            <div className="space-y-6">
              {event.tags && event.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-border/60 px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <section className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">À propos de cet événement</h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </section>
            </div>

            {/* Right: key info */}
            <aside className="space-y-6">
              <section className="rounded-3xl bg-white text-black p-6 shadow-lg border border-border/60">
                <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide text-neutral-500">
                  Informations clés
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="rounded-2xl bg-gradient-to-r from-[#4285F4]/10 to-transparent px-4 py-3 border border-[#4285F4]/40">
                    <p className="font-semibold text-[#4285F4]">Quand</p>
                    <p className="text-sm text-neutral-800">{event.date}</p>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-r from-[#0F9D58]/10 via-[#F4B400]/10 to-transparent px-4 py-3 border border-[#0F9D58]/40">
                    <p className="font-semibold text-[#0F9D58]">Où</p>
                    <p className="text-sm text-neutral-800 whitespace-pre-line">
                      {event.location}
                    </p>
                  </div>
                </div>
              </section>
            </aside>
          </div>

          {/* Bottom When/Where section */}
          <section className="mt-10 rounded-3xl bg-muted/40 px-6 py-5 md:px-8 md:py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white flex-shrink-0">
                  <CalendarIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">When</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {event.date}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white flex-shrink-0">
                  <MapPinIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">Where</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {event.location}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
