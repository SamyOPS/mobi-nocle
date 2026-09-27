import { mockBookingApi } from "./mock-api";
import type { BookingApi } from "./types";

/**
 * POINT DE BASCULE UNIQUE vers le système de rendez-vous.
 *
 * TODO(api-rdv) : remplacer `mockBookingApi` par une implémentation qui
 * appelle la vraie API (fetch vers vos endpoints), en respectant l'interface
 * `BookingApi` de ./types.ts. Puis passer `site.booking.demoMode` à false.
 */
export const bookingApi: BookingApi = mockBookingApi;

export * from "./types";
export * from "./dates";
