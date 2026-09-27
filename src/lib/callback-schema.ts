import { z } from "zod";

/**
 * Schéma de la demande de rappel, partagé entre le formulaire (client)
 * et la Route Handler (serveur).
 *
 * RGPD : aucun champ n'invite à saisir des informations de santé détaillées.
 */

/** Numéro français : 0X XX XX XX XX, +33 X XX XX XX XX ou 0033…, séparateurs espace, point ou tiret. */
export const FRENCH_PHONE = /^(?:(?:\+|00)33[\s.-]?|0)[1-9](?:[\s.-]?\d{2}){4}$/;

export const MESSAGE_MAX_LENGTH = 300;

/** Nom du champ piège anti-spam : invisible pour les humains, rempli par les robots. */
export const HONEYPOT_FIELD = "site_web";

export const callbackSchema = z.object({
  nom: z
    .string("Indiquez votre nom.")
    .trim()
    .min(2, "Indiquez votre nom (2 caractères minimum).")
    .max(100, "Le nom ne doit pas dépasser 100 caractères."),
  telephone: z
    .string("Indiquez votre numéro de téléphone.")
    .trim()
    .regex(FRENCH_PHONE, "Indiquez un numéro de téléphone valide, par exemple 06 12 34 56 78."),
  commune: z
    .string("Indiquez votre commune.")
    .trim()
    .min(2, "Indiquez votre commune.")
    .max(100, "La commune ne doit pas dépasser 100 caractères."),
  pourQui: z.enum(["moi", "proche"], "Précisez si la demande est pour vous ou pour un proche."),
  message: z
    .string("Le message doit être un texte.")
    .trim()
    .max(MESSAGE_MAX_LENGTH, `Le message ne doit pas dépasser ${MESSAGE_MAX_LENGTH} caractères.`)
    .optional()
    .default(""),
  consentement: z.literal(true, "Votre accord est nécessaire pour que nous puissions vous rappeler."),
});

export type CallbackInput = z.input<typeof callbackSchema>;
export type CallbackData = z.output<typeof callbackSchema>;
export type CallbackField = keyof CallbackData;
export type CallbackErrors = Partial<Record<CallbackField, string>>;

/** Convertit les données brutes d'un formulaire (FormData ou objet JSON) en objet à valider. */
export function toCallbackInput(raw: Record<string, unknown>): Record<string, unknown> {
  const consent = raw.consentement;
  return {
    nom: raw.nom,
    telephone: raw.telephone,
    commune: raw.commune,
    pourQui: raw.pourQui,
    message: raw.message ?? "",
    consentement: consent === true || consent === "on" || consent === "true",
  };
}

/** Valide et renvoie soit les données propres, soit un message d'erreur par champ. */
export function validateCallback(
  raw: Record<string, unknown>,
): { success: true; data: CallbackData } | { success: false; errors: CallbackErrors } {
  const result = callbackSchema.safeParse(toCallbackInput(raw));
  if (result.success) return { success: true, data: result.data };

  const errors: CallbackErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as CallbackField | undefined;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return { success: false, errors };
}
