/** Services proposés (optique uniquement). BROUILLON À RELIRE. */

export type ServiceIcon = "glasses" | "eye" | "wrench";

export type Service = {
  id: string;
  icon: ServiceIcon;
  title: string;
  summary: string;
  details: string[];
};

export const services: Service[] = [
  {
    id: "lunettes-de-vue",
    icon: "glasses",
    title: "Lunettes de vue",
    summary:
      "Choix de la monture et des verres chez vous, avec des conseils adaptés à votre vue et à votre quotidien.",
    details: [
      "Une sélection de montures à essayer chez vous, pour femmes et pour hommes.",
      "Des verres adaptés à votre vue : pour voir de loin, de près, ou les deux.",
      "Des montures de l'offre 100 % Santé sont proposées.",
      "La prise de mesures se fait sur place, pour des lunettes bien centrées.",
    ],
  },
  {
    id: "examen-de-vue",
    icon: "eye",
    title: "Examen de vue",
    summary:
      "Un contrôle de votre vue à domicile, pour des lunettes qui correspondent vraiment à vos besoins.",
    details: [
      "L'opticien mesure votre vue chez vous, avec un matériel adapté.",
      "Selon votre situation, une ordonnance de votre ophtalmologiste peut être nécessaire : nous vous le précisons lors de l'appel.",
      "Si l'opticien remarque quelque chose qui nécessite l'avis d'un médecin, il vous conseille de consulter un ophtalmologiste.",
    ],
  },
  {
    id: "entretien-et-reparation",
    icon: "wrench",
    title: "Entretien et réparation",
    summary:
      "Réglage, nettoyage et petites réparations de vos lunettes, sans avoir à vous déplacer.",
    details: [
      "Réglage de lunettes qui glissent, serrent ou penchent.",
      "Remplacement de petites pièces, comme les plaquettes ou les vis.",
      "Nettoyage et vérification de l'état de vos lunettes.",
      "Pour une réparation plus importante, nous vous indiquons les solutions possibles.",
    ],
  },
];
