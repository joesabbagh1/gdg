## GDG EPITA - Site web

Site marketing pour le Google Developer Group EPITA, construit avec Next.js (App Router), Tailwind et shadcn/ui.

Le site est pense pour etre facilement deploye sur Vercel, avec une petite interface d'admin protegee pour gerer les evenements.

## Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS + shadcn/ui

## Architecture

Objectif: un front rapide et un back evolutif. Le contenu est isole dans `content/`, expose par des endpoints API, et consomme par les pages server-side. Une petite couche admin permet de gerer les evenements (en attendant une vraie base de donnees).

```
gdg/
├── app/
│   ├── api/                         # API routes
│   │   ├── events/route.ts          # Liste JSON des evenements
│   │   ├── contact/route.ts         # Backend formulaire de contact (validation)
│   │   ├── newsletter/route.ts      # API newsletter (validation + stockage fichier)
│   │   ├── admin/login/route.ts     # Login admin (cookie httpOnly)
│   │   ├── admin/logout/route.ts    # Logout admin
│   │   └── admin/events/route.ts    # CRUD events (utilise content/events.json)
│   ├── admin/
│   │   ├── login/page.tsx           # Ecran de connexion admin
│   │   └── events/page.tsx          # Interface d'admin des evenements
│   ├── events/                      # Pages events
│   │   ├── page.tsx                 # Liste (a venir / passes)
│   │   └── [slug]/page.tsx          # Fiche detaillee d'un event
│   ├── blog/                        # Blog minimal
│   │   ├── page.tsx                 # Liste d'articles
│   │   └── [slug]/page.tsx          # Article
│   ├── layout.tsx
│   └── page.tsx                     # Home
├── content/
│   ├── events.json                  # Donnees events
│   ├── blog.json                    # Articles de blog
│   └── newsletter.json              # Inscriptions newsletter (DEV uniquement)
├── components/
│   ├── ui/                          # shadcn/ui
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── event-card.tsx
│   └── ...                          # Sections marketing
├── lib/
│   └── data/
│       ├── events.ts                # Lecture + helpers (a venir / passes)
│       └── blog.ts                  # Lecture content blog
└── types/
    ├── event.ts
    └── post.ts
```

## Flux de donnees

- `content/events.json` = source de verite pour les evenements.
- `lib/data/events.ts` lit les fichiers et fournit `getUpcomingEvents()` / `getPastEvents()` / `getEventBySlug()`.
- `app/api/events` expose les events en JSON.
- `app/events` et la home consomment la meme source de donnees.
- `content/blog.json` + `lib/data/blog.ts` alimentent le blog.

### Admin events

- L'interface `admin/events` permet de **creer / editer / supprimer** des evenements.
- L'acces est protege par un **secret admin**:
  - la page de login est `admin/login`,
  - la cle est stockee dans la variable d'environnement `ADMIN_SECRET`,
  - apres login, un cookie httpOnly (`gdg_admin`) est pose et requis pour acceder aux routes `admin/*` et `api/admin/*`.
- La separation **a venir / passes** se fait avec:
  - `date` (champ affiche, libre),
  - `startDate` (champ ISO utilise pour le tri auto).

⚠️ Sur Vercel, `content/events.json` / `content/newsletter.json` / `content/blog.json` ne sont **pas une vraie base de donnees**. Pour l'instant, l'admin est surtout pratique en local; en production il est recommande soit:

- de gerer les evenements via Git (editer `content/events.json` et redeployer), ou
- de migrer vers une base (PostgreSQL + Prisma, Supabase, etc.).

## Backend (next step)

Cette architecture est prete pour brancher un vrai backend:

- Remplacer `content/events.json` / `content/blog.json` / `content/newsletter.json` par une base (PostgreSQL, Supabase, etc.).
- Remplacer `lib/data/events.ts` / `lib/data/blog.ts` par une couche d'acces DB.
- Garder `app/api/*` comme facade API (ou basculer vers un backend separe).
- Ajouter une auth plus evoluee (NextAuth/Clerk, etc.) pour l'admin.

## Demarrer

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Deploiement sur Vercel

Variables d'environnement recommandees:

- `NEXT_PUBLIC_SITE_URL` : URL publique du site (ex: `https://gdg-epita.vercel.app`).
- `ADMIN_SECRET` : cle admin longue (non partagee) pour proteger `/admin` et `/api/admin`.

L'envoi d'emails (contact, newsletter) et le stockage persistant (DB) restent a brancher dans une etape suivante.
