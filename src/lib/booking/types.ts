import type { VisitTypeId } from "@/content/rendez-vous";
import type { IsoDate } from "./dates";
import type { BookingRequest } from "./schema";

export type { VisitTypeId, IsoDate, BookingRequest };

/** Plage horaire réservable. */
export type TimeSlot = {
  /** Identifiant stable, fourni par l'API */
  id: string;
  date: IsoDate;
  /** « HH:MM » */
  start: string;
  end: string;
};

/** Disponibilités d'une journée. Un jour sans créneau n'est pas renvoyé. */
export type DayAvailability = {
  date: IsoDate;
  slots: TimeSlot[];
};

export type AvailabilityQuery = {
  /** Premier jour inclus */
  from: IsoDate;
  /** Dernier jour inclus */
  to: IsoDate;
  visitType: VisitTypeId;
  /** Permet à l'API d'adapter les créneaux aux tournées */
  postalCode: string;
};

export type BookingConfirmation = {
  /** Référence à communiquer au client */
  reference: string;
  slot: TimeSlot;
};

export type BookingResult =
  | { ok: true; confirmation: BookingConfirmation }
  | {
      ok: false;
      /** slot_unavailable : le créneau vient d'être pris ; invalid : données refusées ; unknown : autre erreur */
      reason: "slot_unavailable" | "invalid" | "unknown";
      message?: string;
    };

/**
 * Contrat entre le front et le système de rendez-vous.
 * La future API maison devra fournir ces deux opérations.
 */
export interface BookingApi {
  getAvailability(query: AvailabilityQuery): Promise<DayAvailability[]>;
  createBooking(request: BookingRequest): Promise<BookingResult>;
}
