/**
 * Photos d'illustration, issues d'Unsplash (licence Unsplash : utilisation
 * gratuite, y compris commerciale ; crédit non obligatoire mais affiché dans
 * les mentions légales). Fichiers téléchargés dans public/images/photos/.
 *
 * Aucune de ces photos ne représente Mobi'Nocle, son opticien ou ses clients :
 * le portrait de l'opticien reste à fournir (voir CirclePhoto).
 * Pour remplacer une photo par une photo réelle, changer `src` et les dimensions.
 */

export type Photo = {
  src: string;
  width: number;
  height: number;
  /** Texte alternatif : décrit ce que montre l'image */
  alt: string;
  credit: {
    author: string;
    authorUrl: string;
    photoUrl: string;
  };
};

const unsplash = (author: string, profile: string, photoPath: string) => ({
  author,
  authorUrl: `https://unsplash.com/@${profile}`,
  photoUrl: `https://unsplash.com/photos/${photoPath}`,
});

export const photos = {
  visiteDomicile: {
    src: "/images/photos/visite-domicile.jpg",
    width: 1200,
    height: 1200,
    alt: "Les mains d'une personne âgée tenant une paire de lunettes rondes",
    credit: unsplash("Towfiqu barbhuiya", "towfiqu999999", "an-elderly-woman-holding-a-pair-of-glasses-T_yNRLnYau8"),
  },
  lunettesDeVue: {
    src: "/images/photos/lunettes-de-vue.jpg",
    width: 1200,
    height: 900,
    alt: "Présentoir de montures de lunettes de différentes couleurs",
    credit: unsplash("Scott Van Daalen", "scottvd", "arranged-assorted-color-eyeglasses-on-rack-UsALNdok2m4"),
  },
  examenDeVue: {
    src: "/images/photos/examen-de-vue.jpg",
    width: 1200,
    height: 900,
    alt: "Une paire de lunettes posée sur un tableau de lettres servant à mesurer la vue",
    credit: unsplash("Marco Palumbo", "sapporo2025", "glasses-sit-on-an-eye-chart-LsVix48R7hs"),
  },
  entretienReparation: {
    src: "/images/photos/entretien-reparation.jpg",
    width: 1200,
    height: 900,
    alt: "Une paire de lunettes à côté de petites vis et pièces de réparation",
    credit: unsplash("Josue Acevedo Maldonado", "neomatrixcode", "Gr5L64WSYZI"),
  },
  etablissement: {
    src: "/images/photos/etablissement.jpg",
    width: 1200,
    height: 900,
    alt: "Une soignante souriante auprès d'une résidente âgée, dans une chambre d'établissement",
    credit: unsplash("Age Cymru", "agecymru", "nurse-smiling-with-elderly-patient-in-room-dMhB7w99ju8"),
  },
} satisfies Record<string, Photo>;

/** Photo associée à chaque service (clé = id du service dans src/content/services.ts). */
export const servicePhotos: Record<string, Photo> = {
  "lunettes-de-vue": photos.lunettesDeVue,
  "examen-de-vue": photos.examenDeVue,
  "entretien-et-reparation": photos.entretienReparation,
};
