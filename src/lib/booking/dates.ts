/**
 * Dates « calendaires » au format ISO AAAA-MM-JJ, sans fuseau horaire.
 * Les calculs se font à midi pour éviter les décalages dus aux changements d'heure.
 */

export type IsoDate = string;

export function toIsoDate(date: Date): IsoDate {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function fromIsoDate(iso: IsoDate): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d, 12);
}

export function addDays(iso: IsoDate, days: number): IsoDate {
  const date = fromIsoDate(iso);
  date.setDate(date.getDate() + days);
  return toIsoDate(date);
}

export function today(): IsoDate {
  return toIsoDate(new Date());
}

/** 1 = lundi … 7 = dimanche */
export function isoWeekday(iso: IsoDate): number {
  const day = fromIsoDate(iso).getDay();
  return day === 0 ? 7 : day;
}

/** Lundi de la semaine contenant la date. */
export function startOfWeek(iso: IsoDate): IsoDate {
  return addDays(iso, 1 - isoWeekday(iso));
}

const dayFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

const longDayFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** Le premier du mois s'écrit « 1er » en français. */
function firstOfMonth(text: string): string {
  return text.replace(/^(\S+) 1 /, (_, weekday: string) => `${weekday} 1er `);
}

/** « mardi 14 octobre », « jeudi 1er octobre » */
export function formatDay(iso: IsoDate): string {
  return firstOfMonth(dayFormatter.format(fromIsoDate(iso)));
}

/** « mardi 14 octobre 2026 » */
export function formatLongDay(iso: IsoDate): string {
  return firstOfMonth(longDayFormatter.format(fromIsoDate(iso)));
}

/** « 09:00 » -> « 9 h », « 09:30 » -> « 9 h 30 » */
export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  return m === 0 ? `${h}\u00a0h` : `${h}\u00a0h\u00a0${String(m).padStart(2, "0")}`;
}

/** « entre 9 h et 11 h » */
export function formatWindow(start: string, end: string): string {
  return `entre ${formatTime(start)} et ${formatTime(end)}`;
}

/** « 9 h – 11 h » (version courte, pour les boutons de la grille) */
export function formatWindowShort(start: string, end: string): string {
  return `${formatTime(start)} – ${formatTime(end)}`;
}

const shortWeekdayFormatter = new Intl.DateTimeFormat("fr-FR", { weekday: "short" });
const shortMonthFormatter = new Intl.DateTimeFormat("fr-FR", { month: "short" });

/** En-tête de colonne : { weekday: « Mar. », date: « 29 sept. » } */
export function formatColumnHeader(iso: IsoDate): { weekday: string; date: string } {
  const date = fromIsoDate(iso);
  const day = date.getDate();
  return {
    weekday: capitalize(shortWeekdayFormatter.format(date)),
    date: `${day === 1 ? "1er" : day} ${shortMonthFormatter.format(date)}`,
  };
}

/** Première lettre en majuscule (les jours sont en minuscules en français). */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
