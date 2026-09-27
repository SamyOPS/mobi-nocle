"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import {
  addDays,
  bookingApi,
  capitalize,
  formatDay,
  formatWindow,
  startOfWeek,
  today,
  type DayAvailability,
  type IsoDate,
} from "@/lib/booking";
import { Button } from "@/components/ui/Button";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { ChoiceCards } from "@/components/forms/fields";
import type { StepProps } from "./steps";

type Loaded =
  | { week: IsoDate; status: "ready"; days: DayAvailability[] }
  | { week: IsoDate; status: "error" };

function bookingWindow() {
  const firstWeek = startOfWeek(addDays(today(), site.booking.minNoticeDays));
  const lastWeek = addDays(firstWeek, (site.booking.weeksAhead - 1) * 7);
  return { firstWeek, lastWeek };
}

/**
 * Étape 3 : choix du jour puis de la plage horaire, semaine par semaine.
 * Pas de grille de calendrier : de grands boutons, lisibles et utilisables au clavier.
 */
export function StepSlot({ draft, update, errors }: StepProps) {
  const { firstWeek, lastWeek } = bookingWindow();
  const [weekStart, setWeekStart] = useState<IsoDate>(() => {
    const week = draft.slot ? startOfWeek(draft.slot.date) : firstWeek;
    return week < firstWeek || week > lastWeek ? firstWeek : week;
  });
  const [selectedDay, setSelectedDay] = useState<IsoDate | undefined>(draft.slot?.date);
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const visitType = draft.visitType ?? "premiere-visite";
  const postalCode = draft.codePostal;

  useEffect(() => {
    let cancelled = false;
    bookingApi
      .getAvailability({ from: weekStart, to: addDays(weekStart, 6), visitType, postalCode })
      .then((days) => {
        if (!cancelled) setLoaded({ week: weekStart, status: "ready", days });
      })
      .catch(() => {
        if (!cancelled) setLoaded({ week: weekStart, status: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, [weekStart, visitType, postalCode, retryCount]);

  const isLoading = !loaded || loaded.week !== weekStart;
  const days = !isLoading && loaded.status === "ready" ? loaded.days : [];
  const day = days.find((item) => item.date === selectedDay);

  function selectDay(date: IsoDate) {
    setSelectedDay(date);
    if (draft.slot && draft.slot.date !== date) update({ slot: undefined });
  }

  function selectSlot(slotId: string) {
    const slot = day?.slots.find((item) => item.id === slotId);
    if (slot) update({ slot });
  }

  let announcement = "Recherche des disponibilités…";
  if (!isLoading && loaded.status === "error") announcement = "Les disponibilités n'ont pas pu être chargées.";
  if (!isLoading && loaded.status === "ready") {
    announcement =
      days.length === 0
        ? "Aucune disponibilité cette semaine."
        : `${days.length} ${days.length > 1 ? "jours disponibles" : "jour disponible"} cette semaine.`;
  }

  return (
    <div className="space-y-8">
      {/* Navigation entre les semaines */}
      <div className="rounded-3xl bg-lens-light p-4 sm:p-6">
        <p className="text-center font-display text-2xl font-extrabold">
          Semaine du {formatDay(weekStart)}
        </p>
        <p role="status" className="mt-1 text-center">
          {announcement}
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-between">
          {/* aria-disabled plutôt que disabled : le bouton garde le focus clavier */}
          <Button
            variant="secondary"
            onClick={() => weekStart > firstWeek && setWeekStart(addDays(weekStart, -7))}
            aria-disabled={weekStart <= firstWeek}
            className="aria-disabled:cursor-not-allowed aria-disabled:opacity-60"
          >
            <span aria-hidden="true">←</span> Semaine précédente
          </Button>
          <Button
            variant="secondary"
            onClick={() => weekStart < lastWeek && setWeekStart(addDays(weekStart, 7))}
            aria-disabled={weekStart >= lastWeek}
            className="aria-disabled:cursor-not-allowed aria-disabled:opacity-60"
          >
            Semaine suivante <span aria-hidden="true">→</span>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div aria-hidden="true" className="grid gap-3 sm:grid-cols-2">
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="h-18 rounded-2xl bg-lens-light" />
          ))}
        </div>
      ) : loaded.status === "error" ? (
        <div className="rounded-3xl border-4 border-error bg-white p-6">
          <p className="font-bold">Les disponibilités n&apos;ont pas pu être chargées.</p>
          <p className="mt-2">Réessayez dans un instant, ou appelez-nous pour prendre rendez-vous.</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => setRetryCount((count) => count + 1)}>Réessayer</Button>
            <PhoneLink variant="secondary" />
          </div>
        </div>
      ) : days.length === 0 ? (
        <div className="rounded-3xl border-2 border-lens bg-white p-6">
          <p>
            Il n&apos;y a plus de disponibilité cette semaine.
            {weekStart < lastWeek ? " Essayez la semaine suivante, ou appelez-nous." : " Appelez-nous, nous trouverons une solution."}
          </p>
        </div>
      ) : (
        <ChoiceCards
          name="jour"
          legend="1. Choisissez un jour"
          columns={2}
          value={selectedDay}
          onChange={selectDay}
          error={!day ? errors.slot : undefined}
          options={days.map((item) => ({
            value: item.date,
            label: capitalize(formatDay(item.date)),
            description:
              item.slots.length > 1 ? `${item.slots.length} plages horaires` : "1 plage horaire",
          }))}
        />
      )}

      {day ? (
        <ChoiceCards
          name="plage"
          legend={`2. Choisissez une plage horaire le ${formatDay(day.date)}`}
          columns={2}
          value={draft.slot?.id}
          onChange={selectSlot}
          error={errors.slot}
          options={day.slots.map((slot) => ({
            value: slot.id,
            label: capitalize(formatWindow(slot.start, slot.end)),
          }))}
        />
      ) : null}

      <p className="text-ink-soft">
        L&apos;opticien arrive au cours de la plage choisie. Les trajets entre deux visites ne
        permettent pas de garantir une heure précise.
      </p>
    </div>
  );
}
