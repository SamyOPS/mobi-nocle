import type { VisitTypeId } from "@/content/rendez-vous";
import type { TimeSlot } from "@/lib/booking";

/** Saisie en cours du parcours de prise de rendez-vous. */
export type BookingDraft = {
  pourQui?: "moi" | "proche";
  visitType?: VisitTypeId;
  rue: string;
  complement: string;
  codePostal: string;
  commune: string;
  slot?: TimeSlot;
  patientNom: string;
  patientTelephone: string;
  email: string;
  demandeurNom: string;
  demandeurTelephone: string;
  message: string;
  consentement: boolean;
};

export const emptyDraft: BookingDraft = {
  rue: "",
  complement: "",
  codePostal: "",
  commune: "",
  patientNom: "",
  patientTelephone: "",
  email: "",
  demandeurNom: "",
  demandeurTelephone: "",
  message: "",
  consentement: false,
};

export const steps = [
  { id: "motif", title: "Pour qui et pourquoi ?" },
  { id: "adresse", title: "Où l'opticien doit-il venir ?" },
  { id: "creneau", title: "Quand ?" },
  { id: "coordonnees", title: "Vos coordonnées" },
  { id: "recapitulatif", title: "Vérifiez votre rendez-vous" },
] as const;

export type StepIndex = 0 | 1 | 2 | 3 | 4;

export const LAST_STEP: StepIndex = 4;

/**
 * Conservation de la saisie pendant la session du navigateur, pour qu'un
 * rechargement accidentel ne fasse pas tout perdre. Le consentement n'est
 * jamais conservé : il doit être redonné.
 * sessionStorage peut être indisponible (navigation privée…) : tout est protégé.
 */
const STORAGE_KEY = "mobinocle-rendez-vous";

type Stored = { draft: BookingDraft; step: StepIndex };

export function loadDraft(): Stored {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { draft: emptyDraft, step: 0 };
    const parsed = JSON.parse(raw) as Partial<Stored>;
    const step = typeof parsed.step === "number" && parsed.step >= 0 && parsed.step <= LAST_STEP ? parsed.step : 0;
    return { draft: { ...emptyDraft, ...parsed.draft, consentement: false }, step: step as StepIndex };
  } catch {
    return { draft: emptyDraft, step: 0 };
  }
}

export function saveDraft(draft: BookingDraft, step: StepIndex) {
  try {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ draft: { ...draft, consentement: false }, step } satisfies Stored),
    );
  } catch {
    // Stockage indisponible : la saisie ne sera simplement pas conservée.
  }
}

export function clearDraft() {
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Rien à faire
  }
}
