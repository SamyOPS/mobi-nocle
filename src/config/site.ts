/**
 * Informations de l'entreprise : SOURCE UNIQUE pour tout le site
 * (textes, header, footer, pages légales, données structurées SEO).
 *
 * Toute valeur égale à `A_COMPLETER` s'affiche telle quelle sur le site
 * pour être repérée facilement, et est retirée automatiquement des
 * données structurées (JSON-LD) tant qu'elle n'est pas renseignée.
 *
 * Pour trouver tout ce qui reste à remplir : rechercher « A_COMPLETER ».
 */

export const A_COMPLETER = "À COMPLÉTER";

export function isFilled(value: string | undefined | null): value is string {
  return Boolean(value) && value !== A_COMPLETER;
}

export type OpeningHours = {
  /** Texte affiché, ex. « Du lundi au vendredi, de 9 h à 18 h » */
  label: string;
  /** Format schema.org, ex. « Mo-Fr 09:00-18:00 » */
  schema: string;
};

export type Commune = {
  name: string;
  postalCode: string;
};

export const site = {
  name: "Mobi'Nocle",
  tagline: "Votre opticien se déplace chez vous",
  description:
    "Opticien à domicile : examen de vue, choix des lunettes, livraison et ajustage chez vous ou en établissement.",

  /** Domaine définitif, sans barre finale, ex. « https://www.mobinocle.fr » */
  url: A_COMPLETER,

  contact: {
    /** Tel qu'affiché, ex. « 06 12 34 56 78 » */
    phoneDisplay: A_COMPLETER,
    /** Format international pour les liens tel:, ex. « +33612345678 » */
    phoneE164: A_COMPLETER,
    email: A_COMPLETER,
    openingHours: [
      { label: A_COMPLETER, schema: A_COMPLETER },
    ] satisfies OpeningHours[],
    /** Délai de rappel annoncé après une demande, ex. « sous 24 h ouvrées » */
    callbackDelay: A_COMPLETER,
  },

  optician: {
    /** Prénom et nom de l'opticien */
    name: A_COMPLETER,
    /** Diplôme(s), ex. « BTS Opticien-Lunetier » */
    diploma: A_COMPLETER,
    /** Courte présentation (2 à 3 phrases) */
    bio: A_COMPLETER,
  },

  zone: {
    /** Résumé court, ex. « Lyon et communes à 30 km autour » */
    summary: A_COMPLETER,
    /** Département(s) couvert(s) */
    departments: [A_COMPLETER],
    /** Liste des communes desservies */
    communes: [] as Commune[],
  },

  pricing: {
    /** Frais de déplacement, ex. « Gratuits » ou « 15 € » */
    travelFees: A_COMPLETER,
    /** Conditions éventuelles (distance, minimum d'achat…) */
    travelFeesConditions: A_COMPLETER,
    /** Tiers payant pratiqué : oui / non / selon mutuelle */
    thirdPartyPayment: A_COMPLETER,
    /** Mutuelles ou réseaux de soins partenaires */
    partnerInsurers: [] as string[],
    /** Moyens de paiement acceptés */
    paymentMethods: [] as string[],
  },

  legal: {
    legalName: A_COMPLETER,
    legalForm: A_COMPLETER,
    shareCapital: A_COMPLETER,
    siret: A_COMPLETER,
    rcs: A_COMPLETER,
    vatNumber: A_COMPLETER,
    /** Adresse du siège social (peut différer d'un lieu d'accueil du public) */
    address: {
      street: A_COMPLETER,
      postalCode: A_COMPLETER,
      city: A_COMPLETER,
      country: "FR",
    },
    publicationDirector: A_COMPLETER,
    /** Hébergeur du site : à vérifier au moment de la mise en ligne */
    host: {
      name: "Vercel Inc.",
      address: A_COMPLETER,
      website: "https://vercel.com",
    },
    /** Médiateur de la consommation (obligatoire pour les professionnels) */
    consumerMediator: A_COMPLETER,
  },

  social: {
    facebook: A_COMPLETER,
    instagram: A_COMPLETER,
  },
} as const;

/** URL absolue du site, avec des solutions de repli tant que le domaine n'est pas défini. */
export function getSiteUrl(): string {
  if (isFilled(site.url)) return site.url;
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelUrl) return `https://${vercelUrl}`;
  return "http://localhost:3000";
}

export function telHref(): string {
  return isFilled(site.contact.phoneE164)
    ? `tel:${site.contact.phoneE164}`
    : "/contact";
}
