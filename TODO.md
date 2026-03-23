## TODO

- [ ] Brancher un provider d'email (Resend / SendGrid / Mailjet) sur `/api/contact` pour envoyer un vrai email vers `gdsc.epita@gmail.com`
- [ ] Migrer la newsletter vers un service dedie ou une DB (Mailchimp/Brevo/Supabase...) au lieu de `content/newsletter.json`
- [ ] Migrer `content/events.json` et `content/blog.json` vers une base (PostgreSQL + Prisma, Supabase, etc.) pour que l'admin soit pleinement fonctionnel en production
- [ ] Remplacer la protection admin par secret par une vraie auth (NextAuth, Clerk ou autre) si necessaire
- [ ] Ajouter un favicon/og-image dedie pour un meilleur partage social
- [ ] Ajouter de l'observabilite (Analytics, logs, monitoring) si le site prend de l'ampleur
