import { z } from "zod";
import { visitTypeIds } from "@/content/rendez-vous";
import { FRENCH_PHONE } from "@/lib/callback-schema";

/**
 * Validation de la prise de rendez-vous, découpée par étape du parcours.
 * Le schéma complet (`bookingSchema`) servira aussi côté serveur.
 * RGPD : aucun champ n'invite à saisir des informations de santé.
 */

export const MESSAGE_MAX_LENGTH = 300;

const phone = (label: string) =>
  z
    .string(`Indiquez ${label}.`)
    .trim()
    .regex(FRENCH_PHONE, "Indiquez un numéro de téléphone valide, par exemple 06 12 34 56 78.");

const name = (label: string) =>
  z
    .string(`Indiquez ${label}.`)
    .trim()
    .min(2, `Indiquez ${label} (2 caractères minimum).`)
    .max(100, "100 caractères maximum.");

export const visitStepSchema = z.object({
  pourQui: z.enum(["moi", "proche"], "Précisez si le rendez-vous est pour vous ou pour un proche."),
  visitType: z.enum(visitTypeIds, "Choisissez le motif de la visite."),
});

export const addressStepSchema = z.object({
  rue: z
    .string("Indiquez le numéro et le nom de la rue.")
    .trim()
    .min(3, "Indiquez le numéro et le nom de la rue.")
    .max(200, "200 caractères maximum."),
  complement: z.string().trim().max(200, "200 caractères maximum.").optional().default(""),
  codePostal: z
    .string("Indiquez le code postal.")
    .trim()
    .regex(/^\d{5}$/, "Le code postal doit comporter 5 chiffres, par exemple 69003."),
  commune: z
    .string("Indiquez la commune.")
    .trim()
    .min(2, "Indiquez la commune.")
    .max(100, "100 caractères maximum."),
});

export const slotStepSchema = z.object({
  slot: z.object(
    {
      id: z.string().min(1),
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      start: z.string().regex(/^\d{2}:\d{2}$/),
      end: z.string().regex(/^\d{2}:\d{2}$/),
    },
    "Choisissez un jour puis une plage horaire.",
  ),
});

const contactFields = z.object({
  patientNom: name("le nom de la personne qui recevra l'opticien"),
  patientTelephone: phone("un numéro de téléphone"),
  email: z
    .union([z.literal(""), z.email("Indiquez une adresse e-mail valide, ou laissez ce champ vide.")])
    .optional()
    .default(""),
  demandeurNom: z.string().trim().max(100, "100 caractères maximum.").optional().default(""),
  demandeurTelephone: z.string().trim().optional().default(""),
  message: z
    .string()
    .trim()
    .max(MESSAGE_MAX_LENGTH, `Le message ne doit pas dépasser ${MESSAGE_MAX_LENGTH} caractères.`)
    .optional()
    .default(""),
  consentement: z.literal(true, "Votre accord est nécessaire pour enregistrer le rendez-vous."),
});

/** Coordonnées : le demandeur n'est obligatoire que si le rendez-vous est pour un proche. */
export function contactStepSchema(pourQui: "moi" | "proche") {
  return contactFields.superRefine((data, ctx) => {
    if (pourQui !== "proche") return;
    if (data.demandeurNom.length < 2) {
      ctx.addIssue({ code: "custom", path: ["demandeurNom"], message: "Indiquez votre nom." });
    }
    if (!FRENCH_PHONE.test(data.demandeurTelephone)) {
      ctx.addIssue({
        code: "custom",
        path: ["demandeurTelephone"],
        message: "Indiquez votre numéro de téléphone, par exemple 06 12 34 56 78.",
      });
    }
  });
}

export const bookingSchema = visitStepSchema
  .extend(addressStepSchema.shape)
  .extend(slotStepSchema.shape)
  .extend(contactFields.shape)
  .superRefine((data, ctx) => {
    if (data.pourQui === "proche" && (data.demandeurNom.length < 2 || !FRENCH_PHONE.test(data.demandeurTelephone))) {
      ctx.addIssue({ code: "custom", path: ["demandeurNom"], message: "Coordonnées du demandeur manquantes." });
    }
  });

export type BookingRequest = z.output<typeof bookingSchema>;

export type FieldErrors = Record<string, string>;

/** Premier message d'erreur par champ, pour l'affichage. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "_");
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}
