## TODO — par ordre d’importance

Les tâches sont numérotées : commencer par le **1** (bloquant ou impact prod le plus fort), puis descendre.

### 1. Données événements (admin fiable en production)

- [ ] **Choisir une stratégie** pour que les événements ne disparaissent pas sur Vercel :
  - **Option A** — Workflow **Git** : éditer `content/events.json` dans le dépôt, commit, push → Vercel redeploy (pas d’admin en ligne comme source de vérité).
  - **Option B** — **Base de données** (Supabase, PostgreSQL + Prisma, etc.) + adapter `lib/data/events.ts` et `/api/admin/events` pour lire/écrire en DB → l’admin en ligne redevient la source de vérité.

> Tant que l’option B n’est pas faite, **l’admin sur le site déployé** peut sembler marcher un moment, mais ce n’est **pas** une persistance fiable (fichier sur le serveur serverless).

### 2. Variables Vercel (rapide)

- [ ] Vérifier que **`ADMIN_SECRET`** est bien défini (admin accessible sur `/admin/login`).
- [ ] Définir **`NEXT_PUBLIC_SITE_URL`** = `https://gdg-azure.vercel.app` (sans slash final), puis **Redeploy** pour les métadonnées / partages.

### 3. Contact — vrai envoi d’e-mail

- [ ] Brancher un provider (**Resend**, **SendGrid**, **Mailjet**, etc.) sur `POST /api/contact` pour envoyer un mail vers `gdsc.epita@gmail.com` (ou boîte équipe).

### 4. Newsletter — hors fichier JSON

- [ ] Migrer la newsletter vers un service (**Brevo**, **Mailchimp**, **Supabase** table dédiée, etc.) au lieu de `content/newsletter.json` (RGPD + campagnes + fiabilité sur Vercel).

### 5. Blog (si tu veux l’éditer sans toucher au JSON)

- [ ] Soit garder l’édition de `content/blog.json` + Git, soit CMS / même DB que les événements.

### 6. Admin — auth plus solide (si le club grossit ou partage sensible)

- [ ] Remplacer le secret unique par **NextAuth**, **Clerk** ou équivalent (comptes, sessions, révocation).

### 7. Image de marque & social

- [ ] Favicon + **Open Graph** dédiés (meilleur aperçu quand on partage le lien).

### 8. Mesure d’audience (optionnel)

- [ ] Analytics / logs (**Vercel Analytics**, Plausible, etc.) si le site prend de l’ampleur.

---

## Référence rapide — fichiers concernés

| Sujet        | Fichiers / routes |
|-------------|-------------------|
| Admin events | `app/admin/events`, `app/api/admin/events`, `lib/data/events.ts`, `middleware.ts` |
| Contact     | `app/api/contact/route.ts` |
| Newsletter  | `app/api/newsletter/route.ts` |
| Métadonnées URL | `app/layout.tsx` (`NEXT_PUBLIC_SITE_URL`) |
