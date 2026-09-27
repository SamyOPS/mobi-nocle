import { site } from "@/config/site";
import { addDays, isoWeekday, today, type IsoDate } from "./dates";
import { bookingSchema } from "./schema";
import type { AvailabilityQuery, BookingApi, BookingResult, DayAvailability, TimeSlot } from "./types";

/**
 * IMPLÉMENTATION FICTIVE, pour développer le front sans serveur.
 * Génère des disponibilités pseudo-aléatoires mais stables (même résultat à
 * chaque chargement) et simule un temps de réponse réseau.
 * À remplacer par la vraie API dans src/lib/booking/index.ts.
 */

const LATENCY_MS = 500;

/** Créneaux réservés pendant la session (pour simuler un créneau déjà pris). */
const bookedSlotIds = new Set<string>();

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Hash simple et déterministe d'une chaîne, entre 0 et 1. */
function pseudoRandom(seed: string): number {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967295;
}

function slotsFor(date: IsoDate, postalCode: string): TimeSlot[] {
  const { timeWindows, workingDays } = site.booking;
  if (!(workingDays as readonly number[]).includes(isoWeekday(date))) return [];
  return timeWindows
    .map((window) => ({
      id: `${date}_${window.start}`,
      date,
      start: window.start,
      end: window.end,
    }))
    .filter((slot) => pseudoRandom(`${slot.id}-${postalCode.slice(0, 2)}`) > 0.4)
    .filter((slot) => !bookedSlotIds.has(slot.id));
}

export const mockBookingApi: BookingApi = {
  async getAvailability({ from, to, postalCode }: AvailabilityQuery): Promise<DayAvailability[]> {
    await wait(LATENCY_MS);
    const firstBookable = addDays(today(), site.booking.minNoticeDays);
    const days: DayAvailability[] = [];
    for (let date = from; date <= to; date = addDays(date, 1)) {
      if (date < firstBookable) continue;
      const slots = slotsFor(date, postalCode);
      if (slots.length > 0) days.push({ date, slots });
    }
    return days;
  },

  async createBooking(request): Promise<BookingResult> {
    await wait(LATENCY_MS);
    const parsed = bookingSchema.safeParse(request);
    if (!parsed.success) return { ok: false, reason: "invalid" };
    if (bookedSlotIds.has(request.slot.id)) return { ok: false, reason: "slot_unavailable" };
    bookedSlotIds.add(request.slot.id);
    const reference = `DEMO-${Math.floor(pseudoRandom(request.slot.id + Date.now()) * 900000 + 100000)}`;
    return { ok: true, confirmation: { reference, slot: request.slot } };
  },
};
