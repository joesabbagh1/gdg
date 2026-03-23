export interface Event {
  slug: string;
  title: string;
  location: string;
  date: string;
  description: string;
  tags?: string[];
  image?: string;
  /**
   * Date technique (ISO, ex: 2026-03-18T18:00:00+01:00 ou 2026-03-18)
   * utilisée pour classer automatiquement les événements passés / à venir.
   */
  startDate?: string;
}
