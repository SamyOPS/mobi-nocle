"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { site } from "@/config/site";
import {
  addDays,
  bookingApi,
  capitalize,
  formatColumnHeader,
  formatDay,
  formatTime,
  formatWindow,
  formatWindowShort,
  isoWeekday,
  today,
  type DayAvailability,
  type IsoDate,
  type TimeSlot,
} from "@/lib/booking";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { CheckIcon } from "@/components/ui/icons";
import { FieldError } from "@/components/forms/fields";
import type { StepProps } from "./steps";

/* ---------- Période réservable et colonnes ---------- */

/** Jours travaillés proposés à la réservation, du premier jour possible à la fin de l'horizon. */
function bookableDays(): IsoDate[] {
  const { minNoticeDays, weeksAhead, workingDays } = site.booking;
  const first = addDays(today(), minNoticeDays);
  const last = addDays(first, weeksAhead * 7 - 1);
  const days: IsoDate[] = [];
  for (let date = first; date <= last; date = addDays(date, 1)) {
    if ((workingDays as readonly number[]).includes(isoWeekday(date))) days.push(date);
  }
  return days;
}

/** Nombre de jours affichés côte à côte : 3 sur mobile, 5 à partir de 640 px. */
const WIDE_QUERY = "(min-width: 640px)";
function subscribeWidth(callback: () => void) {
  const media = window.matchMedia(WIDE_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function useVisibleDayCount(): number {
  return useSyncExternalStore(
    subscribeWidth,
    () => (window.matchMedia(WIDE_QUERY).matches ? 5 : 3),
    () => 3,
  );
}

type Row = { start: string; end: string };

/** Lignes de la grille : les plages configurées, plus celles que l'API renverrait en plus. */
function gridRows(days: DayAvailability[]): Row[] {
  const rows = new Map<string, Row>();
  for (const window of site.booking.timeWindows) rows.set(window.start + window.end, window);
  for (const day of days) for (const slot of day.slots) rows.set(slot.start + slot.end, slot);
  return [...rows.values()].sort((a, b) => a.start.localeCompare(b.start));
}

type Loaded = { status: "ready"; days: DayAvailability[] } | { status: "error" };

/* ---------- Étape 3 : grille des créneaux ---------- */

/**
 * Grille type agenda : une colonne par jour, une ligne par plage horaire.
 * Un clic suffit pour choisir. Tableau HTML pour les lecteurs d'écran ;
 * chaque bouton porte le jour et l'heure complets.
 */
export function StepSlot({ draft, update, errors }: StepProps) {
  const [allDays] = useState(bookableDays);
  const visibleCount = useVisibleDayCount();
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  // Premier jour affiché : celui du créneau déjà choisi, sinon le premier jour réservable.
  const [startIndex, setStartIndex] = useState(() =>
    Math.max(0, draft.slot ? allDays.indexOf(draft.slot.date) : 0),
  );

  const visitType = draft.visitType ?? "premiere-visite";
  const postalCode = draft.codePostal;

  // Toutes les disponibilités de la période en une fois : navigation instantanée.
  useEffect(() => {
    let cancelled = false;
    bookingApi
      .getAvailability({ from: allDays[0], to: allDays[allDays.length - 1], visitType, postalCode })
      .then((days) => !cancelled && setLoaded({ status: "ready", days }))
      .catch(() => !cancelled && setLoaded({ status: "error" }));
    return () => {
      cancelled = true;
    };
  }, [allDays, visitType, postalCode, retryCount]);

  // Recale le début sur un multiple du nombre de colonnes (utile quand la largeur change).
  const maxStart = Math.max(0, allDays.length - visibleCount);
  const start = Math.min(startIndex - (startIndex % visibleCount), maxStart);
  const visibleDays = allDays.slice(start, start + visibleCount);

  const availability = new Map<IsoDate, TimeSlot[]>();
  if (loaded?.status === "ready") for (const day of loaded.days) availability.set(day.date, day.slots);
  const rows = gridRows(loaded?.status === "ready" ? loaded.days : []);

  const visibleHasSlots = visibleDays.some((date) => (availability.get(date)?.length ?? 0) > 0);
  const nextAvailableIndex = allDays.findIndex(
    (date, index) => index >= start + visibleCount && (availability.get(date)?.length ?? 0) > 0,
  );

  const canGoBack = start > 0;
  const canGoForward = start + visibleCount < allDays.length;
  const rangeLabel =
    visibleDays.length > 1
      ? `Du ${formatDay(visibleDays[0])} au ${formatDay(visibleDays[visibleDays.length - 1])}`
      : visibleDays[0]
        ? capitalize(formatDay(visibleDays[0]))
        : "";

  const shortRangeLabel =
    visibleDays.length > 1
      ? formatColumnHeader(visibleDays[0]).date + " – " + formatColumnHeader(visibleDays[visibleDays.length - 1]).date
      : visibleDays[0]
        ? formatColumnHeader(visibleDays[0]).date
        : "";

  if (loaded?.status === "error") {
    return (
      <div className="rounded-3xl border-4 border-error bg-white p-6">
        <p className="font-bold">Les disponibilités n&apos;ont pas pu être chargées.</p>
        <p className="mt-2">Réessayez dans un instant, ou appelez-nous pour prendre rendez-vous.</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => setRetryCount((count) => count + 1)}>Réessayer</Button>
          <PhoneLink variant="secondary" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-lg">Choisissez la plage horaire qui vous convient dans le tableau.</p>

      {/* Navigation entre les jours */}
      <div className="flex items-center justify-between gap-3">
        {/* aria-disabled plutôt que disabled : le bouton garde le focus clavier */}
        <Button
          variant="secondary"
          onClick={() => canGoBack && setStartIndex(start - visibleCount)}
          aria-disabled={!canGoBack}
          className="shrink-0 whitespace-nowrap px-4 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        >
          <span aria-hidden="true">←</span>
          <span className="sr-only sm:not-sr-only">Jours précédents</span>
        </Button>
        <div className="text-center font-bold">
          {/* Version courte à l'écran, version complète annoncée aux lecteurs d'écran */}
          <p aria-hidden="true">{loaded ? shortRangeLabel : "Chargement…"}</p>
          <p role="status" className="sr-only">
            {loaded ? rangeLabel : "Recherche des disponibilités…"}
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={() => canGoForward && setStartIndex(start + visibleCount)}
          aria-disabled={!canGoForward}
          className="shrink-0 whitespace-nowrap px-4 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        >
          <span className="sr-only sm:not-sr-only">Jours suivants</span>
          <span aria-hidden="true">→</span>
        </Button>
      </div>

      <FieldError id="slot-erreur" message={errors.slot} />

      {/* Grille */}
      <div className={cn("overflow-hidden rounded-3xl border-2 bg-white", errors.slot ? "border-error" : "border-lens")}>
        <table className="w-full table-fixed border-collapse">
          <caption className="sr-only">
            Plages horaires disponibles. {rangeLabel}.
          </caption>
          <thead>
            <tr className="bg-lens-light">
              {visibleDays.map((date) => {
                const header = formatColumnHeader(date);
                const hasSlots = (availability.get(date)?.length ?? 0) > 0;
                return (
                  <th key={date} scope="col" className="px-1 py-3 font-display">
                    <span aria-hidden="true" className={cn("block", !hasSlots && loaded && "text-ink-soft")}>
                      <span className="block text-lg font-extrabold">{header.weekday}</span>
                      <span className="block text-base font-bold">{header.date}</span>
                    </span>
                    <span className="sr-only">{formatDay(date)}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.start + row.end}>
                {visibleDays.map((date) => {
                  const slot = availability.get(date)?.find((item) => item.start === row.start && item.end === row.end);
                  const selected = draft.slot?.id === slot?.id && slot !== undefined;
                  return (
                    <td key={date} className="p-1.5 sm:p-2">
                      {!loaded ? (
                        <span aria-hidden="true" className="block h-12 rounded-xl bg-lens-light" />
                      ) : slot ? (
                        <button
                          type="button"
                          aria-pressed={selected}
                          onClick={() => update({ slot })}
                          className={cn(
                            "flex min-h-12 w-full items-center justify-center gap-1 rounded-xl border-2 px-1 py-2 text-base font-bold leading-tight sm:text-lg",
                            selected
                              ? "border-primary bg-primary text-white ring-[3px] ring-ink ring-offset-2"
                              : "border-primary bg-lens-light text-primary hover:bg-lens",
                          )}
                        >
                          {selected ? <CheckIcon className="hidden size-5 shrink-0 sm:block" /> : null}
                          {/* Mobile : début et fin sur deux lignes ; plus large : sur une ligne */}
                          <span className="hidden sm:inline">{formatWindowShort(slot.start, slot.end)}</span>
                          <span className="sm:hidden">
                            <span className="block">{formatTime(slot.start)}</span>
                            <span className="block">–&nbsp;{formatTime(slot.end)}</span>
                          </span>
                          <span className="sr-only">, {formatDay(date)}</span>
                        </button>
                      ) : (
                        <span aria-hidden="true" className="flex h-12 items-center justify-center text-ink-soft">
                          —
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {loaded && !visibleHasSlots ? (
          <div className="border-t-2 border-lens p-5 text-center">
            <p>Aucune disponibilité sur ces jours.</p>
            {nextAvailableIndex >= 0 ? (
              <Button
                variant="secondary"
                className="mt-3"
                onClick={() => setStartIndex(nextAvailableIndex)}
              >
                Aller à la prochaine disponibilité : {formatDay(allDays[nextAvailableIndex])}
              </Button>
            ) : (
              <p className="mt-2">Appelez-nous, nous trouverons une solution ensemble.</p>
            )}
          </div>
        ) : null}
      </div>

      {/* Créneau choisi */}
      <div aria-live="polite">
        {draft.slot ? (
          <p className="flex items-start gap-3 rounded-2xl border-4 border-primary bg-lens-light p-4 text-lg">
            <CheckIcon className="mt-1 size-6 shrink-0 text-primary" />
            <span>
              <strong>Créneau choisi :</strong> {formatDay(draft.slot.date)},{" "}
              {formatWindow(draft.slot.start, draft.slot.end)}
            </span>
          </p>
        ) : null}
      </div>

      <p className="text-ink-soft">
        L&apos;opticien arrive au cours de la plage choisie. Les trajets entre deux visites ne
        permettent pas de garantir une heure précise.
      </p>
    </div>
  );
}
