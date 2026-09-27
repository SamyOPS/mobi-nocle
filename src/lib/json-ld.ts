import { getSiteUrl, isFilled, site } from "@/config/site";

/**
 * Sérialisation sûre du JSON-LD (recommandation Next.js) :
 * `<` est échappé pour empêcher toute fermeture prématurée de la balise <script>.
 */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Retire les valeurs « À COMPLÉTER » et les champs vides. */
function compact<T extends Record<string, unknown>>(data: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => {
      if (value === undefined || value === null) return false;
      if (typeof value === "string") return isFilled(value);
      if (Array.isArray(value)) return value.length > 0;
      return true;
    }),
  ) as Partial<T>;
}

/**
 * Données structurées schema.org de type Optician.
 * Les informations non renseignées dans la config sont omises automatiquement.
 */
export function opticianJsonLd(): Record<string, unknown> {
  const baseUrl = getSiteUrl();
  const { contact, legal, zone } = site;
  const { address } = legal;

  const areaServed =
    zone.communes.length > 0
      ? zone.communes.map((commune) => ({
          "@type": "City",
          name: commune.name,
          postalCode: commune.postalCode,
        }))
      : isFilled(zone.summary)
        ? [zone.summary]
        : [];

  const hasAddress = isFilled(address.city) && isFilled(address.postalCode);

  return {
    "@context": "https://schema.org",
    "@type": "Optician",
    "@id": `${baseUrl}/#optician`,
    ...compact({
      name: site.name,
      legalName: legal.legalName,
      description: site.description,
      url: baseUrl,
      logo: `${baseUrl}/images/logo-mobinocle.png`,
      image: `${baseUrl}/images/logo-mobinocle.png`,
      telephone: contact.phoneE164,
      email: contact.email,
      openingHours: contact.openingHours.map((hours) => hours.schema).filter(isFilled),
      areaServed,
      sameAs: [site.social.facebook, site.social.instagram].filter(isFilled),
    }),
    ...(hasAddress
      ? {
          address: {
            "@type": "PostalAddress",
            ...compact({
              streetAddress: address.street,
              postalCode: address.postalCode,
              addressLocality: address.city,
              addressCountry: address.country,
            }),
          },
        }
      : {}),
  };
}
