import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EventCard } from "@/components/event-card";
import { getUpcomingEvents, getPastEvents } from "@/lib/data/events";

export default function EventsPage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background to-muted/20">
      <Navbar />

      <section className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Événements GDG EPITA
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tous nos événements, workshops et conférences.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold mb-6">À venir</h2>
          {upcoming.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aucun événement à venir pour le moment. Restez connectés !
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcoming.map((event) => (
                <EventCard
                  key={event.slug}
                  href={`/events/${event.slug}`}
                  title={event.title}
                  location={event.location}
                  date={event.date}
                  image={event.image}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold mb-6">Passés</h2>
          {past.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aucun événement passé enregistré pour le moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {past.map((event) => (
                <EventCard
                  key={event.slug}
                  href={`/events/${event.slug}`}
                  title={event.title}
                  location={event.location}
                  date={event.date}
                  image={event.image}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

