/** Types de visite proposés à la réservation. BROUILLON À RELIRE. */

export const visitTypeIds = ["premiere-visite", "entretien-reparation", "question"] as const;
export type VisitTypeId = (typeof visitTypeIds)[number];

export type VisitType = {
  id: VisitTypeId;
  label: string;
  description: string;
};

export const visitTypes: VisitType[] = [
  {
    id: "premiere-visite",
    label: "Contrôle de la vue et choix des lunettes",
    description: "Pour de nouvelles lunettes : l'opticien vient avec son matériel et un choix de montures.",
  },
  {
    id: "entretien-reparation",
    label: "Entretien ou réparation",
    description: "Lunettes qui glissent, qui serrent, vis ou plaquette à changer…",
  },
  {
    id: "question",
    label: "Je ne sais pas, j'ai une question",
    description: "Nous faisons le point ensemble lors de la visite.",
  },
];

export function getVisitType(id: VisitTypeId): VisitType {
  return visitTypes.find((type) => type.id === id) ?? visitTypes[0];
}
