"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const homeHref = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background border-b border-border/50 shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="bg-white rounded-lg p-2">
          <Image
            src="/logo_name.png"
            alt="GDG EPITA"
            width={200}
            height={60}
            className="h-14 w-auto"
            priority
          />
        </Link>
        <div className="hidden md:flex items-center gap-2">
          <Link
            href={homeHref("#accueil")}
            className="text-sm font-semibold text-foreground hover:text-[#4285F4] transition-colors duration-200 px-4 py-2 rounded-md relative group"
          >
            Accueil
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4285F4] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href={homeHref("#a-propos")}
            className="text-sm font-semibold text-foreground hover:text-[#DB4437] transition-colors duration-200 px-4 py-2 rounded-md relative group"
          >
            À propos
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DB4437] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href={homeHref("#evenements")}
            className="text-sm font-semibold text-foreground hover:text-[#F4B400] transition-colors duration-200 px-4 py-2 rounded-md relative group"
          >
            Événements
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F4B400] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/events"
            className="text-sm font-semibold text-foreground hover:text-[#F4B400] transition-colors duration-200 px-4 py-2 rounded-md relative group"
          >
            Tous les events
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F4B400] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold text-foreground hover:text-[#0F9D58] transition-colors duration-200 px-4 py-2 rounded-md relative group"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0F9D58] group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
