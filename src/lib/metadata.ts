import type { Metadata } from "next";
import { site } from "@/config/site";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Chemin de la page, ex. « /services » */
  path: string;
};

/** Image de partage par défaut (à remplacer par un visuel 1200×630 dédié). */
export const defaultOgImage = {
  url: "/images/logo-mobinocle.png",
  width: 785,
  height: 318,
  alt: "Logo Mobi'Nocle, opticien à domicile",
};

/**
 * Métadonnées d'une page, Open Graph inclus.
 * Next.js remplace le bloc openGraph du parent au lieu de le fusionner :
 * on le reconstruit donc entièrement pour chaque page.
 */
export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      url: path,
      images: [defaultOgImage],
    },
  };
}
