"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { site } from "@/config/site";
import { bookingApi, type BookingConfirmation } from "@/lib/booking";
import {
  addressStepSchema,
  bookingSchema,
  consentStepSchema,
  contactStepSchema,
  slotStepSchema,
  toFieldErrors,
  visitStepSchema,
  type FieldErrors,
} from "@/lib/booking/schema";
import { focusBelowHeader } from "@/lib/focus";
import { frTypo } from "@/lib/typo";
import { Button, ButtonLink } from "@/components/ui/Button";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { CheckIcon } from "@/components/ui/icons";
import { ErrorSummary } from "@/components/forms/fields";
import { BookingProgress } from "./BookingProgress";
import { DemoBanner } from "./DemoBanner";
import { StepSlot } from "./StepSlot";
import { Summary } from "./Summary";
import { ConsentField, StepAddress, StepContact, StepVisit } from "./steps";
import {
  LAST_STEP,
  clearDraft,
  loadDraft,
  saveDraft,
  steps,
  type BookingDraft,
  type StepIndex,
} from "./draft";

function subscribeNoop() {
  return () => {};
}

/**
 * Parcours de prise de rendez-vous.
 * Rendu uniquement dans le navigateur : la saisie conservée en sessionStorage
 * est lue dès le premier affichage, sans décalage d'hydratation.
 */
export function BookingWizard() {
  const hydrated = useSyncExternalStore(subscribeNoop, () => true, () => false);
  if (!hydrated) {
    return (
      <p role="status" className="text-lg">
        Chargement de la prise de rendez-vous…
      </p>
    );
  }
  return <Wizard />;
}

/** Cible du lien d'une erreur dans le récapitulatif des erreurs. */
function fieldAnchor(field: string): string {
  if (field === "pourQui") return "pourQui-moi";
  if (field === "visitType") return "visitType-premiere-visite";
  if (field === "slot") return "creneau-choix";
  return field;
}

function stepErrors(step: StepIndex, draft: BookingDraft): FieldErrors | null {
  const schemas = [
    visitStepSchema,
    addressStepSchema,
    slotStepSchema,
    contactStepSchema(draft.pourQui ?? "moi"),
    consentStepSchema,
  ] as const;
  const result = schemas[step].safeParse(draft);
  return result.success ? null : toFieldErrors(result.error);
}

function Wizard() {
  const [initial] = useState(loadDraft);
  const [draft, setDraft] = useState<BookingDraft>(initial.draft);
  const [step, setStep] = useState<StepIndex>(initial.step);
  const [errors, setErrors] = useState<FieldErrors>({});
  /** Modification depuis le récapitulatif : on y revient après validation */
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [done, setDone] = useState<{ draft: BookingDraft; confirmation: BookingConfirmation } | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  /** Pas de déplacement du focus au premier affichage de la page */
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (!done) saveDraft(draft, step);
  }, [draft, step, done]);

  useEffect(() => {
    if (hasNavigated.current) focusBelowHeader(headingRef.current);
  }, [step, done]);

  function goTo(next: StepIndex) {
    hasNavigated.current = true;
    setErrors({});
    setSendError(false);
    setStep(next);
  }

  function update(patch: Partial<BookingDraft>) {
    setDraft((current) => {
      const next = { ...current, ...patch };
      // Les disponibilités dépendent de l'adresse : un changement de code postal annule le créneau.
      if (patch.codePostal !== undefined && patch.codePostal !== current.codePostal) next.slot = undefined;
      return next;
    });
    setErrors((current) => {
      const keys = Object.keys(patch);
      if (!keys.some((key) => key in current)) return current;
      const next = { ...current };
      for (const key of keys) delete next[key];
      return next;
    });
  }

  function showErrors(found: FieldErrors) {
    setErrors(found);
    requestAnimationFrame(() => focusBelowHeader(errorSummaryRef.current));
  }

  function editFromSummary(target: StepIndex) {
    setEditing(true);
    setNotice(null);
    goTo(target);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const found = stepErrors(step, draft);
    if (found) return showErrors(found);

    if (step < LAST_STEP) {
      setNotice(null);
      // Après une modification, retour direct au récapitulatif, sauf s'il faut rechoisir un créneau.
      const next: StepIndex = editing ? (draft.slot ? LAST_STEP : 2) : ((step + 1) as StepIndex);
      if (next === LAST_STEP) setEditing(false);
      return goTo(next);
    }

    const parsed = bookingSchema.safeParse(draft);
    if (!parsed.success) {
      // Cas rare (saisie restaurée incomplète) : retour à la première étape à corriger.
      const firstInvalid = ([0, 1, 2, 3] as StepIndex[]).find((index) => stepErrors(index, draft));
      if (firstInvalid !== undefined) {
        setEditing(true);
        goTo(firstInvalid);
      }
      return;
    }

    setSending(true);
    setSendError(false);
    try {
      const result = await bookingApi.createBooking(parsed.data);
      if (result.ok) {
        clearDraft();
        hasNavigated.current = true;
        setDone({ draft, confirmation: result.confirmation });
      } else if (result.reason === "slot_unavailable") {
        update({ slot: undefined, consentement: false });
        setNotice("Ce créneau vient d'être réservé par quelqu'un d'autre. Choisissez-en un autre, votre saisie est conservée.");
        setEditing(true);
        goTo(2);
      } else {
        setSendError(true);
      }
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <Confirmation
        headingRef={headingRef}
        draft={done.draft}
        confirmation={done.confirmation}
        onRestart={() => {
          setDone(null);
          setDraft({ ...done.draft, slot: undefined, consentement: false });
          goTo(0);
        }}
      />
    );
  }

  const errorList = Object.entries(errors).map(([field, message]) => ({
    fieldId: fieldAnchor(field),
    message,
  }));
  const isLast = step === LAST_STEP;
  const stepProps = { draft, update, errors };

  return (
    <div>
      <DemoBanner />
      <BookingProgress current={step} />

      <form onSubmit={handleSubmit} noValidate aria-labelledby="etape-titre" className="space-y-8">
        <h2 id="etape-titre" ref={headingRef} tabIndex={-1} className="text-2xl text-ink focus:outline-none sm:text-3xl">
          {frTypo(steps[step].title)}
        </h2>

        {notice ? (
          <div role="status" className="rounded-3xl border-2 border-primary bg-lens-light p-5 text-lg font-bold">
            {frTypo(notice)}
          </div>
        ) : null}

        <ErrorSummary ref={errorSummaryRef} errors={errorList} />

        {step === 0 ? <StepVisit {...stepProps} /> : null}
        {step === 1 ? <StepAddress {...stepProps} /> : null}
        {step === 2 ? (
          <div id="creneau-choix">
            <StepSlot {...stepProps} />
          </div>
        ) : null}
        {step === 3 ? <StepContact {...stepProps} /> : null}
        {isLast ? (
          <div className="space-y-8">
            <p className="text-lg">Relisez les informations ci-dessous avant de confirmer.</p>
            <Summary draft={draft} onEdit={editFromSummary} />
            <ConsentField {...stepProps} />
          </div>
        ) : null}

        {sendError ? (
          <div role="alert" className="rounded-3xl border-2 border-error bg-white p-6">
            <p className="text-xl font-bold text-error">Le rendez-vous n&apos;a pas pu être enregistré.</p>
            <p className="mt-2">Réessayez dans un instant, ou appelez-nous : nous le prendrons avec vous.</p>
            <div className="mt-4">
              <PhoneLink />
            </div>
          </div>
        ) : null}

        <div className="flex flex-col-reverse gap-4 border-t-2 border-lens pt-8 sm:flex-row sm:justify-between">
          {step > 0 && !editing ? (
            <Button variant="secondary" size="lg" onClick={() => goTo((step - 1) as StepIndex)}>
              <span aria-hidden="true">←</span> Retour
            </Button>
          ) : (
            <span />
          )}
          <Button
            type="submit"
            size="lg"
            aria-disabled={sending}
            className="aria-disabled:opacity-70"
          >
            {sending
              ? "Enregistrement en cours…"
              : isLast
                ? "Confirmer le rendez-vous"
                : editing
                  ? "Valider et revenir au récapitulatif"
                  : "Continuer"}
            {!sending && !isLast ? <span aria-hidden="true">→</span> : null}
          </Button>
        </div>
      </form>
    </div>
  );
}

type ConfirmationProps = {
  headingRef: React.Ref<HTMLHeadingElement>;
  draft: BookingDraft;
  confirmation: BookingConfirmation;
  onRestart: () => void;
};

function Confirmation({ headingRef, draft, confirmation, onRestart }: ConfirmationProps) {
  const demo = site.booking.demoMode;
  return (
    <div className="space-y-8">
      <DemoBanner />
      <div className="rounded-3xl border-2 border-primary bg-lens-light p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <CheckIcon className="mt-1 size-9 shrink-0 text-primary" />
          <div>
            <h2 ref={headingRef} tabIndex={-1} className="text-2xl text-ink focus:outline-none">
              {demo ? "Rendez-vous de démonstration terminé" : "Votre rendez-vous est enregistré"}
            </h2>
            <p className="mt-3 text-lg">
              Référence : <strong>{confirmation.reference}</strong>
            </p>
            {/* TODO(api-rdv) : annoncer l'e-mail de confirmation quand son envoi existera. */}
          </div>
        </div>
      </div>

      <Summary draft={{ ...draft, slot: confirmation.slot }} />

      <p className="text-lg">
        Un empêchement, une question ? Appelez-nous, nous déplacerons le rendez-vous avec vous.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        <PhoneLink size="lg" />
        <Button variant="secondary" size="lg" onClick={() => window.print()}>
          Imprimer
        </Button>
        <Button variant="secondary" size="lg" onClick={onRestart}>
          Prendre un autre rendez-vous
        </Button>
        <ButtonLink href="/" variant="secondary" size="lg">
          Retour à l&apos;accueil
        </ButtonLink>
      </div>
    </div>
  );
}
