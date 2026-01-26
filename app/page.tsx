import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EventCard } from "@/components/event-card";
import { SocialSection } from "@/components/social-section";
import { ScrollAnimation } from "@/components/scroll-animation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const events = [
    {
      title: "Workshop Kubernetes",
      location: "Amphi 1",
      date: "14 Fév",
    },
    {
      title: "Introduction à Flutter",
      location: "Labo 3",
      date: "20 Fév",
    },
    {
      title: "Tech Talk: Google Cloud",
      location: "Online",
      date: "28 Fév",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background to-muted/20">
      <Navbar />
      
      {/* Hero Section - Full Viewport */}
      <section id="accueil" className="relative w-full min-h-screen flex items-center justify-center px-4 py-24 md:py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#4285F4]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#DB4437]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F4B400]/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#4285F4]/10 to-[#DB4437]/10 text-sm font-semibold text-[#4285F4] border border-[#4285F4]/20 backdrop-blur-sm">
              Google Developer Group
            </span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Bienvenue au{" "}
            <span className="bg-gradient-to-r from-[#4285F4] from-0% via-[#4285F4] via-20% via-[#DB4437] via-40% via-[#DB4437] via-60% via-[#F4B400] via-80% to-[#0F9D58] to-100% bg-clip-text text-transparent animate-gradient">
              GDG EPITA
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
            Le club des passionnés de technologies Google à l&apos;EPITA.{" "}
            <span className="font-semibold text-foreground">Codez</span>,{" "}
            <span className="font-semibold text-foreground">apprenez</span> et{" "}
            <span className="font-semibold text-foreground">innovez</span> avec nous.
          </p>
          
          {/* Stats or Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <div className="text-center p-6 rounded-2xl bg-background/40 backdrop-blur-sm">
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#4285F4] to-[#4285F4]/80 bg-clip-text text-transparent">
                50+
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Membres actifs
              </div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-background/40 backdrop-blur-sm">
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#DB4437] to-[#DB4437]/80 bg-clip-text text-transparent">
                20+
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Événements par an
              </div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-background/40 backdrop-blur-sm">
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#F4B400] to-[#F4B400]/80 bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Gratuit & ouvert à tous
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <ScrollAnimation>
        <section
          id="a-propos"
          className="relative container mx-auto px-4 py-24 overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4285F4]/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#DB4437]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="mx-auto max-w-6xl">
            <ScrollAnimation>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#4285F4] via-[#DB4437] to-[#F4B400] bg-clip-text text-transparent">
                  À propos
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Découvrez qui nous sommes et ce qui nous anime
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Card 1 - GDG Network */}
              <ScrollAnimation delay={100}>
                <div className="group relative h-full p-8 rounded-3xl bg-gradient-to-br from-[#4285F4]/10 via-[#4285F4]/5 to-transparent border-2 border-[#4285F4]/20 hover:border-[#4285F4]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#4285F4]/20 hover:-translate-y-2 flex flex-col">
                  <div className="absolute top-4 right-4 w-16 h-16 bg-[#4285F4]/10 rounded-full blur-xl group-hover:bg-[#4285F4]/20 transition-all duration-500"></div>
                  <div className="relative z-10 flex flex-col flex-grow">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4285F4] to-[#4285F4]/80 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 002 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">Réseau Mondial</h3>
                    <p className="text-muted-foreground leading-relaxed flex-grow">
                      Le <span className="font-bold text-[#4285F4]">GDG EPITA</span> fait partie du réseau mondial des{" "}
                      <span className="font-semibold text-foreground">Google Developer Groups</span>, une communauté internationale de développeurs passionnés par les technologies Google.
                    </p>
                  </div>
                </div>
              </ScrollAnimation>

              {/* Card 2 - Open to All */}
              <ScrollAnimation delay={200}>
                <div className="group relative h-full p-8 rounded-3xl bg-gradient-to-br from-[#F4B400]/10 via-[#F4B400]/5 to-transparent border-2 border-[#F4B400]/20 hover:border-[#F4B400]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#F4B400]/20 hover:-translate-y-2 flex flex-col">
                  <div className="absolute top-4 right-4 w-16 h-16 bg-[#F4B400]/10 rounded-full blur-xl group-hover:bg-[#F4B400]/20 transition-all duration-500"></div>
                  <div className="relative z-10 flex flex-col flex-grow">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F4B400] to-[#F4B400]/80 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">Ouvert à Tous</h3>
                    <p className="text-muted-foreground leading-relaxed flex-grow">
                      Notre groupe est ouvert à tous les étudiants de l&apos;EPITA, qu&apos;ils soient en filière{" "}
                      <span className="font-semibold text-[#F4B400]">Informatique</span>,{" "}
                      <span className="font-semibold text-[#F4B400]">Sécurité</span>, ou{" "}
                      <span className="font-semibold text-[#F4B400]">Data</span>. Nous organisons régulièrement des workshops et conférences.
                    </p>
                  </div>
                </div>
              </ScrollAnimation>

              {/* Card 3 - Learn & Grow */}
              <ScrollAnimation delay={300}>
                <div className="group relative h-full p-8 rounded-3xl bg-gradient-to-br from-[#0F9D58]/10 via-[#0F9D58]/5 to-transparent border-2 border-[#0F9D58]/20 hover:border-[#0F9D58]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#0F9D58]/20 hover:-translate-y-2 flex flex-col">
                  <div className="absolute top-4 right-4 w-16 h-16 bg-[#0F9D58]/10 rounded-full blur-xl group-hover:bg-[#0F9D58]/20 transition-all duration-500"></div>
                  <div className="relative z-10 flex flex-col flex-grow">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0F9D58] to-[#0F9D58]/80 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">Apprendre & Grandir</h3>
                    <p className="text-muted-foreground leading-relaxed flex-grow">
                      Que vous soyez <span className="font-semibold text-[#0F9D58]">débutant</span> ou{" "}
                      <span className="font-semibold text-[#0F9D58]">expert</span>, vous êtes les bienvenus pour apprendre, partager et construire ensemble l&apos;avenir du développement logiciel.
                    </p>
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            {/* Bottom highlight section */}
            <ScrollAnimation delay={400}>
              <div className="relative p-10 rounded-3xl bg-gradient-to-r from-[#4285F4]/10 via-[#DB4437]/10 to-[#F4B400]/10 border-2 border-border/50 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4285F4]/5 via-[#DB4437]/5 to-[#F4B400]/5 animate-pulse"></div>
                <div className="relative z-10 text-center">
                  <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#4285F4] via-[#DB4437] to-[#F4B400] bg-clip-text text-transparent">
                    Rejoignez l&apos;aventure
                  </h3>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Explorez les dernières innovations technologiques, participez à des sessions de code et connectez-vous avec une communauté passionnée de développeurs.
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </section>
      </ScrollAnimation>

      {/* Events Section */}
      <ScrollAnimation>
        <section id="evenements" className="container mx-auto px-4 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Prochains Événements
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#4285F4] to-[#DB4437] mx-auto rounded-full mb-4"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Découvrez nos prochains workshops et conférences sur les technologies Google
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <ScrollAnimation key={index} delay={index * 100}>
                  <EventCard
                    title={event.title}
                    location={event.location}
                    date={event.date}
                  />
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Social Section */}
      <ScrollAnimation>
        <SocialSection />
      </ScrollAnimation>

      {/* Newsletter Section */}
      <ScrollAnimation>
        <section className="relative w-full px-4 py-24 bg-gradient-to-br from-[#4285F4]/5 via-[#DB4437]/5 to-[#F4B400]/5 border-t border-b border-border/50">
          <div className="container mx-auto max-w-3xl text-center">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#0F9D58]/10 to-[#0F9D58]/5 text-sm font-semibold text-[#0F9D58] border border-[#0F9D58]/20 backdrop-blur-sm">
                Newsletter
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Restez informé
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Inscrivez-vous à notre newsletter pour ne manquer aucun événement et recevoir les dernières actualités tech.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 h-12 text-base border-2 focus:border-[#0F9D58] focus:ring-2 focus:ring-[#0F9D58]/20 rounded-xl"
                required
              />
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-[#0F9D58] to-[#0F9D58]/90 hover:from-[#0F9D58]/90 hover:to-[#0F9D58] text-white shadow-xl hover:shadow-2xl hover:shadow-[#0F9D58]/25 px-8 whitespace-nowrap"
              >
                S&apos;inscrire
              </Button>
            </form>
          </div>
        </section>
      </ScrollAnimation>

      {/* Contact Section */}
      <ScrollAnimation>
        <section id="contact" className="container mx-auto px-4 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Contactez-nous
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#4285F4] to-[#DB4437] mx-auto rounded-full mb-8"></div>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Vous avez des questions ou souhaitez nous rejoindre ? N&apos;hésitez
              pas à nous contacter !
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#4285F4] to-[#4285F4]/90 hover:from-[#4285F4]/90 hover:to-[#4285F4] text-white shadow-xl hover:shadow-2xl hover:shadow-[#4285F4]/25 px-10 text-base"
              asChild
            >
              <a href="mailto:contact@gdgepita.fr">Nous contacter</a>
            </Button>
          </div>
        </section>
      </ScrollAnimation>

      <Footer />
    </div>
  );
}
