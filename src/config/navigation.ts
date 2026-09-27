export type NavItem = {
  href: string;
  label: string;
};

/** Liens de la navigation principale (header et menu mobile). */
export const mainNav: NavItem[] = [
  { href: "/services", label: "Services" },
  { href: "/comment-ca-se-passe", label: "Comment ça se passe" },
  { href: "/tarifs-et-remboursements", label: "Tarifs et remboursements" },
  { href: "/zone-intervention", label: "Zone d'intervention" },
  { href: "/etablissements", label: "Établissements" },
  { href: "/faq", label: "Questions fréquentes" },
];

export const contactNav: NavItem = { href: "/contact", label: "Être rappelé" };

/** Action principale du site. */
export const bookingNav: NavItem = { href: "/rendez-vous", label: "Prendre rendez-vous" };

export const legalNav: NavItem[] = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
];

/** Toutes les pages publiques, utilisé par le sitemap. */
export const allRoutes: string[] = [
  "/",
  ...mainNav.map((item) => item.href),
  "/rendez-vous",
  "/contact",
  ...legalNav.map((item) => item.href),
];
