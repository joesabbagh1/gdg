# GDG EPITA — Site web

Site marketing pour le Google Developer Group EPITA (contexte GDSC), construit avec **Next.js** (App Router), **Tailwind** et **shadcn/ui**. Prévu pour un déploiement simple sur **Vercel**, avec une interface d’admin protégée pour gérer les événements.

---

## Légende des notations

| Symbole / forme | Signification |
|-----------------|----------------|
| **Note** | Information utile, bon à savoir. |
| **Attention** | Point sensible (sécurité, prod, données). |
| **Déf.** | Définition courte d’un terme. |
| **Étape n.** | Ordre d’actions à suivre. |
| `code` | Nom de fichier, commande, variable ou route. |
| **Gras** | Concept ou élément important à repérer vite. |

---

## Sommaire

1. [Démarrer](#1-démarrer)  
2. [Stack et langages](#2-stack-et-langages)  
3. [Architecture du dépôt](#3-architecture-du-dépôt)  
4. [Flux de données](#4-flux-de-données)  
5. [Sécurité](#5-sécurité)  
6. [E-mail](#6-e-mail)  
7. [Événements (résumé technique)](#7-événements-résumé-technique)  
8. [Déploiement (Vercel)](#8-déploiement-vercel)  
9. [Évolutions possibles (roadmap)](#9-évolutions-possibles-roadmap)  
10. [Fichiers utiles](#10-fichiers-utiles)  
11. [Glossaire](#11-glossaire)

---

## 1. Démarrer

**Étape 1.** Installer les dépendances.

```bash
npm install
```

**Étape 2.** Lancer le serveur de développement.

```bash
npm run dev
```

**Étape 3.** Ouvrir le site dans le navigateur : [http://localhost:3000](http://localhost:3000)

> **Note** — Autres scripts npm : `npm run build` (build production), `npm run start` (servir le build), `npm run lint` (ESLint).

---

## 2. Stack et langages

| Notation | Élément | Détail |
|----------|---------|--------|
| **TS** | Langage | **TypeScript** (fichiers `.ts`, `.tsx`) |
| **UI** | Bibliothèque | **React 19** |
| **FW** | Framework | **Next.js 16** (App Router : pages + API dans le même projet) |
| **CSS** | Styles | **Tailwind CSS 4** + **shadcn/ui** (Radix Slot, CVA, clsx, tailwind-merge) |
| **ICO** | Icônes | `@heroicons/react`, `lucide-react` |
| **DATA** | Données | Fichiers **JSON** dans `content/`, lus avec le module Node **`fs`** côté serveur |

> **Déf. — App Router** — Organisation des routes Next.js basée sur le dossier `app/` : chaque `page.tsx` est une page, chaque `route.ts` sous `app/api/` est un point d’API HTTP.

> **Note** — Il n’y a **pas** de base de données ni d’ORM dans les dépendances actuelles : le contenu “fichier” vit dans le dépôt sous `content/`.

---

## 3. Architecture du dépôt

**Objectif** : front rapide et couche API évolutive. Le contenu est dans `content/`, exposé par des routes `app/api/`, consommé par les pages. Une petite couche **admin** gère les événements (en attendant une vraie base).

**Arborescence annotée** (les `#` en fin de ligne décrivent le rôle du fichier ou dossier) :

```
gdg_web/
├── app/
│   ├── api/
│   │   ├── events/route.ts          # GET JSON public — liste événements
│   │   ├── contact/route.ts         # POST — validation formulaire (pas d’e-mail envoyé)
│   │   ├── newsletter/route.ts      # POST — validation + écriture fichier JSON
│   │   ├── admin/login/route.ts     # POST — pose cookie httpOnly si secret OK
│   │   ├── admin/logout/route.ts    # POST — supprime le cookie admin
│   │   └── admin/events/route.ts    # GET/POST/DELETE — CRUD → content/events.json
│   ├── admin/
│   │   ├── login/page.tsx           # UI connexion admin
│   │   └── events/page.tsx          # UI gestion des événements
│   ├── events/
│   │   ├── page.tsx                 # Liste événements (site public)
│   │   └── [slug]/page.tsx          # Détail d’un événement (URL dynamique)
│   ├── blog/
│   │   ├── page.tsx                 # Liste articles
│   │   └── [slug]/page.tsx          # Article (slug = identifiant dans blog.json)
│   ├── contact/page.tsx             # Formulaire contact (client → /api/contact)
│   ├── layout.tsx                   # Mise en page globale
│   └── page.tsx                     # Page d’accueil
├── content/
│   ├── events.json                  # Données événements (source de vérité)
│   ├── blog.json                    # Articles du blog
│   └── newsletter.json              # Inscriptions newsletter (fichier — limites en prod)
├── components/                      # Composants React réutilisables (navbar, sections…)
├── lib/data/                        # Lecture/écriture events + lecture blog
├── types/                           # Types TS : Event, Post
├── public/                          # Fichiers statiques servis tels quels (images, etc.)
└── middleware.ts                    # Filtre requêtes /admin et /api/admin (sauf login/logout)
```

---

## 4. Flux de données

| Source | Rôle | Consommateurs |
|--------|------|----------------|
| `content/events.json` | Source de vérité des événements | `lib/data/events.ts`, pages `/events`, accueil, `GET /api/events` |
| `lib/data/events.ts` | Helpers : `getUpcomingEvents()`, `getPastEvents()`, `getEventBySlug()` | Pages + API |
| `content/blog.json` | Articles | `lib/data/blog.ts`, routes `/blog`, `/blog/[slug]` |
| `content/newsletter.json` | Liste d’inscriptions | `POST /api/newsletter` uniquement |

**Admin événements** (`/admin/events`) :

- Création / édition / suppression via l’UI → **`/api/admin/events`** (protégé par cookie).
- Connexion : **`/admin/login`** → secret lu depuis la variable d’environnement **`ADMIN_SECRET`**.
- Après login : cookie httpOnly **`gdg_admin`** requis pour **`/admin/*`** et **`/api/admin/*`**.

**Champs événement utiles au tri** :

- **`date`** — Texte affiché à l’écran (libre, ex. « 14 fév. 2026 »).
- **`startDate`** — Date au format **ISO** pour classer « à venir » vs « passés » et trier.

> **Attention (hébergement serverless, ex. Vercel)** — Écrire dans `content/*.json` à l’exécution **ne remplace pas une base de données** : persistance peu fiable selon la plateforme. En production réaliste : soit tu modifies **`events.json` dans Git** et tu redeploies, soit tu migres vers une **base** (PostgreSQL, Supabase, etc.).

---

## 5. Sécurité

### 5.1 Routes publiques vs protégées

| Type | Chemins (exemples) | Middleware |
|------|-------------------|------------|
| **Public** | Pages marketing, `/contact`, `/events`, `/blog` ; API `/api/contact`, `/api/events`, `/api/newsletter` | Non (pas d’auth admin) |
| **Protégé** | `/admin/*` sauf `/admin/login` ; `/api/admin/*` sauf login et logout | Oui — `middleware.ts` |

### 5.2 Variable `ADMIN_SECRET`

| Situation | Comportement |
|-----------|----------------|
| Secret **défini** | Accès admin si cookie **`gdg_admin`** == valeur du secret. |
| Secret **absent** + `NODE_ENV === "production"` | Réponse **403** sur les routes admin (« Admin disabled »). |

### 5.3 Login admin (résumé)

- **Méthode / URL** : `POST /api/admin/login` avec corps JSON `{ "secret": "..." }`.
- **Cookie** : httpOnly, `sameSite: lax`, `secure` en production, durée **7 jours**.

> **Attention** — Le cookie stocke **la valeur du secret** telle quelle, pas un jeton de session signé à courte durée. Acceptable pour un petit site si le secret est **très long et unique** ; pour un niveau produit, prévoir NextAuth, Clerk, etc.

### 5.4 Comportement des API publiques

| Route | Rôle actuel | Risque / limite |
|-------|-------------|-----------------|
| `POST /api/contact` | Valide les champs, répond OK | **Aucun e-mail** envoyé par le serveur |
| `POST /api/newsletter` | Ajoute l’e-mail dans un fichier JSON | Pas d’auth : possible abus (spam fichier) sans rate limit / CAPTCHA |
| `GET /api/events` | Liste JSON | Lecture seule |

> **Note** — Secrets et clés : fichier **`.env`** local + variables sur l’hébergeur. Ne pas commiter : **`.gitignore`** exclut `.env*`.

---

## 6. E-mail

| Canal | État dans le code | Commentaire |
|-------|-------------------|-------------|
| **Formulaire contact** | Appelle `POST /api/contact` | Validation seule ; pas d’envoi SMTP/API (Resend, SendGrid à brancher). Lien **mailto:gdsc.epita@gmail.com** sur la page pour contact direct. |
| **Newsletter** | `POST /api/newsletter` | Stockage fichier `content/newsletter.json` ; pas Mailchimp/Brevo intégrés. Campagne réelle + **RGPD** : prévoir fournisseur + politique de confidentialité. |

---

## 7. Événements (résumé technique)

| Notation | Détail |
|----------|--------|
| **Données** | `content/events.json` |
| **Logique** | `lib/data/events.ts` |
| **API admin** | `GET/POST/DELETE /api/admin/events` (paramètre `slug` en query pour DELETE) |
| **Images** | Fichiers sous `public/` ; dans le JSON, chemin type `/events/nom.png` |

> **Note** — Comportement précis quand **`startDate`** est absent : voir les commentaires et la logique dans **`lib/data/events.ts`**.

---

## 8. Déploiement (Vercel)

| Étape | Action |
|-------|--------|
| 1 | Connecter le dépôt Git à Vercel (détection automatique Next.js). |
| 2 | Build par défaut : `npm run build`. |
| 3 | Définir les variables d’environnement ci-dessous dans le tableau projet Vercel. |

**Variables d’environnement**

| Variable | Obligatoire ? | Rôle |
|----------|---------------|------|
| `ADMIN_SECRET` | **Oui** pour utiliser l’admin en production | Clé longue, confidentielle ; protège `/admin` et `/api/admin`. |
| `NEXT_PUBLIC_SITE_URL` | Optionnel | URL publique du site (ex. `https://gdg-epita.vercel.app`) pour liens canoniques ou usages futurs dans le code. |

> **Note** — L’**envoi d’e-mails** et un **stockage persistant** (base de données) restent des évolutions à brancher si tu en as besoin après déploiement.

---

## 9. Évolutions possibles (roadmap)

- Remplacer **`content/events.json`**, **`blog.json`**, **`newsletter.json`** par une **base** + couche d’accès (ex. Prisma, Supabase).
- Conserver **`app/api/*`** comme façade HTTP ou extraire un backend séparé.
- Renforcer l’**auth admin** (NextAuth, Clerk, comptes multiples).
- Brancher un **provider mail** sur `/api/contact` et migrer la **newsletter** vers un service dédié.

> **Note** — Pistes concrètes listées aussi dans **`TODO.md`** ; rédaction du contenu statique : **`docs/CONTENT_GUIDE.md`**.

---

## 10. Fichiers utiles

| Sujet | Fichier(s) |
|-------|------------|
| Garde d’accès admin | `middleware.ts` |
| Login / logout | `app/api/admin/login/route.ts`, `app/api/admin/logout/route.ts` |
| CRUD événements | `app/api/admin/events/route.ts`, `lib/data/events.ts` |
| Liste publique JSON | `app/api/events/route.ts` |
| Contact | `app/api/contact/route.ts`, `app/contact/page.tsx` |
| Newsletter | `app/api/newsletter/route.ts`, `components/sections/newsletter-section.tsx` |

---

## 11. Glossaire

| Terme | Signification |
|-------|----------------|
| **API** | Point HTTP exposé par Next.js sous `app/api/.../route.ts` (méthodes GET, POST, etc.). |
| **CRUD** | Create, Read, Update, Delete — ici surtout création / mise à jour / suppression d’événements côté admin. |
| **httpOnly** | Attribut cookie : inaccessible au JavaScript de la page, ce qui limite le vol du cookie par un script malveillant (XSS). |
| **ISO (date)** | Format type `2026-03-18T18:00:00+01:00` pour une date/heure sans ambiguïté. |
| **JSON** | Format de fichier texte pour structurer données (tableaux, objets). |
| **Middleware** | Fichier `middleware.ts` exécuté avant certaines routes pour rediriger ou bloquer selon le cookie admin. |
| **ORM** | Outil type Prisma pour parler à une base SQL sans écrire tout le SQL à la main — **non présent** dans ce projet pour l’instant. |
| **RGPD** | Règlement européen sur les données personnelles ; pertinent dès que tu stockes des e-mails pour newsletter. |
| **Slug** | Identifiant court et unique dans l’URL (ex. `angular-workshop` pour `/events/angular-workshop`). |

---

*Dernière mise à jour : à synchroniser quand tu branches e-mail, base de données ou nouvelle auth.*
