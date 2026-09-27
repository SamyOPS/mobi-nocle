/**
 * Les 4 étapes du déroulement. BROUILLON À RELIRE.
 * `summary` : version courte (accueil). `details` : page « Comment ça se passe ».
 */

export type Etape = {
  title: string;
  summary: string;
  details: string[];
};

export const etapes: Etape[] = [
  {
    title: "Vous nous appelez",
    summary:
      "Vous nous appelez, ou un proche le fait pour vous. Nous convenons ensemble d'un rendez-vous chez vous.",
    details: [
      "Vous pouvez nous appeler directement ou nous laisser vos coordonnées pour que nous vous rappelions.",
      "Nous prenons le temps de comprendre votre besoin et nous fixons un rendez-vous au moment qui vous convient.",
      "Un proche, un aidant ou le personnel de votre résidence peut faire cette démarche pour vous.",
    ],
  },
  {
    title: "L'opticien vient chez vous",
    summary:
      "L'opticien se déplace avec son matériel. Il contrôle votre vue et vous aide à choisir vos montures.",
    details: [
      "L'opticien arrive chez vous avec le matériel nécessaire pour contrôler votre vue.",
      "Il vous présente une sélection de montures, que vous pouvez essayer tranquillement, sans vous presser.",
      "Il vous conseille sur les verres adaptés à votre vue et à vos habitudes (lecture, télévision, marche…).",
      "Un proche peut être présent pendant la visite si vous le souhaitez.",
    ],
  },
  {
    title: "Nous préparons vos lunettes",
    summary:
      "Vos verres sont fabriqués et montés sur la monture que vous avez choisie.",
    details: [
      "Nous commandons vos verres et les faisons monter sur la monture choisie.",
      "Nous pouvons vous aider dans les démarches auprès de votre mutuelle.",
      "Nous vous tenons informé du délai et nous convenons d'un rendez-vous pour la livraison.",
    ],
  },
  {
    title: "Livraison et ajustage chez vous",
    summary:
      "L'opticien revient vous remettre vos lunettes et les ajuste à votre visage.",
    details: [
      "L'opticien revient chez vous pour vous remettre vos nouvelles lunettes.",
      "Il les ajuste à votre visage pour qu'elles tiennent bien, sans serrer.",
      "Il vérifie avec vous que vous voyez bien et que vous êtes à l'aise.",
      "Il vous explique comment les entretenir. Si besoin plus tard, un simple appel suffit.",
    ],
  },
];
