"use client";

import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "@/components/scroll-animation";

export function SocialSection() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#4285F4] via-[#DB4437] to-[#F4B400] bg-clip-text text-transparent">
              Rejoignez notre communauté
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connectez-vous avec d&apos;autres développeurs passionnés, partagez vos projets et restez à jour avec les dernières actualités.
            </p>
          </div>
        </ScrollAnimation>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* LinkedIn Card */}
          <ScrollAnimation delay={0}>
            <div className="group relative overflow-hidden rounded-2xl border-2 border-border/50 bg-gradient-to-br from-card to-card/80 p-6 hover:border-[#0A66C2]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#0A66C2]/10 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A66C2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#0A66C2] to-[#0A66C2]/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mb-3">
                  <svg className="h-7 w-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold">LinkedIn</h3>
                <p className="text-xs text-muted-foreground">Réseau professionnel</p>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-[#0A66C2] to-[#0A66C2]/90 hover:from-[#0A66C2]/90 hover:to-[#0A66C2] text-white shadow-lg hover:shadow-xl text-sm"
                asChild
              >
                <a
                  href="https://www.linkedin.com/company/gdg-epita"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Suivre
                </a>
              </Button>
            </div>
          </div>
          </ScrollAnimation>

          {/* Discord Card */}
          <ScrollAnimation delay={100}>
            <div className="group relative overflow-hidden rounded-2xl border-2 border-border/50 bg-gradient-to-br from-card to-card/80 p-6 hover:border-[#5865F2]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#5865F2]/10 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-[#5865F2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#5865F2] to-[#5865F2]/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mb-3">
                  <svg
                    className="h-7 w-7 text-white"
                    viewBox="0 0 71 55"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="white"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Discord</h3>
                <p className="text-xs text-muted-foreground">Communauté active</p>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-[#5865F2] to-[#5865F2]/90 hover:from-[#5865F2]/90 hover:to-[#5865F2] text-white shadow-lg hover:shadow-xl text-sm"
                asChild
              >
                <a
                  href="https://discord.gg/gdg-epita"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Rejoindre
                </a>
              </Button>
            </div>
          </div>
          </ScrollAnimation>

          {/* Instagram Card */}
          <ScrollAnimation delay={200}>
            <div className="group relative overflow-hidden rounded-2xl border-2 border-border/50 bg-gradient-to-br from-card to-card/80 p-6 hover:border-[#E4405F]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#E4405F]/10 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E4405F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#E4405F] via-[#F56040] to-[#FCAF45] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mb-3">
                  <svg className="h-7 w-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Instagram</h3>
                <p className="text-xs text-muted-foreground">Réseau social</p>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-[#E4405F] via-[#F56040] to-[#FCAF45] hover:from-[#E4405F]/90 hover:via-[#F56040]/90 hover:to-[#FCAF45]/90 text-white shadow-lg hover:shadow-xl text-sm"
                asChild
              >
                <a
                  href="https://www.instagram.com/gdg_epita"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Suivre
                </a>
              </Button>
            </div>
          </div>
          </ScrollAnimation>

          {/* X (Twitter) Card */}
          <ScrollAnimation delay={300}>
            <div className="group relative overflow-hidden rounded-2xl border-2 border-border/50 bg-gradient-to-br from-card to-card/80 p-6 hover:border-[#000000]/50 dark:hover:border-[#ffffff]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#000000]/10 dark:hover:shadow-[#ffffff]/10 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#000000]/5 dark:from-[#ffffff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#000000] to-[#000000]/80 dark:from-[#ffffff] dark:to-[#ffffff]/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mb-3">
                    <svg className="h-7 w-7 text-white dark:text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">X (Twitter)</h3>
                  <p className="text-xs text-muted-foreground">Réseau social</p>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-[#000000] to-[#000000]/90 dark:from-[#ffffff] dark:to-[#ffffff]/90 hover:from-[#000000]/90 hover:to-[#000000] dark:hover:from-[#ffffff]/90 dark:hover:to-[#ffffff] text-white dark:text-black shadow-lg hover:shadow-xl text-sm"
                  asChild
                >
                  <a
                    href="https://x.com/GDG_Epita"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Suivre
                  </a>
                </Button>
              </div>
            </div>
          </ScrollAnimation>

          {/* GitHub Card */}
          <ScrollAnimation delay={400}>
            <div className="group relative overflow-hidden rounded-2xl border-2 border-border/50 bg-gradient-to-br from-card to-card/80 p-6 hover:border-[#181717]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#181717]/10 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#181717]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#181717] to-[#181717]/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mb-3">
                    <svg className="h-7 w-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">GitHub</h3>
                  <p className="text-xs text-muted-foreground">Code & Projets</p>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-[#181717] to-[#181717]/90 hover:from-[#181717]/90 hover:to-[#181717] text-white shadow-lg hover:shadow-xl text-sm"
                  asChild
                >
                  <a
                    href="https://github.com/GDSC-EPITA"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Explorer
                  </a>
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
