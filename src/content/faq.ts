import { site } from "@/config/site";

/**
 * Questions fréquentes. BROUILLON À RELIRE.
 * `answer` est du texte brut : il sert à la fois à l'affichage et au balisage
 * FAQPage (données structurées). `link` ajoute un lien après la réponse.
 */

export type FaqItem = {
  question: string;
  answer: string[];
  link?: { href: string; label: string };
};

export const faq: FaqItem[] = [
  {
    question: "Qui peut faire appel à un opticien à domicile ?",
    answer: [
      "Toute personne pour qui il est difficile de se déplacer en magasin : personnes âgées, personnes à mobilité réduite, personnes malades ou en convalescence, résidents d'EHPAD ou de résidences seniors.",
    ],
  },
  {
    question: "Comment prendre rendez-vous ?",
    answer: [
      "Vous pouvez prendre rendez-vous en ligne : vous choisissez le jour et une plage horaire de deux heures pendant laquelle l'opticien passera. Vous pouvez aussi nous appeler, ou nous laisser votre numéro pour que nous vous rappelions.",
    ],
    link: { href: "/rendez-vous", label: "Prendre rendez-vous en ligne" },
  },
  {
    question: "Un proche peut-il prendre rendez-vous pour moi ?",
    answer: [
      "Oui, bien sûr. Un enfant, un voisin, un aidant ou le personnel de votre résidence peut nous appeler ou remplir la demande de rappel pour vous. Il peut aussi être présent pendant la visite.",
    ],
  },
  {
    question: "Faut-il une ordonnance ?",
    answer: [
      "Cela dépend de votre situation, notamment de l'âge de votre dernière ordonnance. Nous vous le précisons lors de notre premier échange téléphonique. Si vous en avez une, gardez-la à portée de main.",
    ],
  },
  {
    question: "Mes lunettes seront-elles remboursées ?",
    answer: [
      "Oui, comme en magasin : vos lunettes sont prises en charge par l'Assurance maladie et par votre mutuelle, selon votre contrat.",
      "Avec l'offre 100 % Santé, vous pouvez obtenir des lunettes sans reste à charge si votre mutuelle est un contrat dit « responsable ».",
    ],
    link: { href: "/tarifs-et-remboursements", label: "Voir les tarifs et remboursements" },
  },
  {
    question: "Le déplacement est-il payant ?",
    answer: [`Frais de déplacement : ${site.pricing.travelFees}. ${site.pricing.travelFeesConditions}`],
  },
  {
    question: "Combien de temps dure la visite ?",
    answer: [
      "Nous prenons le temps qu'il faut, sans vous presser. Durée indicative de la première visite : À COMPLÉTER.",
    ],
  },
  {
    question: "En combien de temps vais-je recevoir mes lunettes ?",
    answer: [
      "Délai indicatif entre la visite et la livraison : À COMPLÉTER. Nous vous tenons informé et nous convenons ensemble du rendez-vous de livraison.",
    ],
  },
  {
    question: "Intervenez-vous dans ma commune ?",
    answer: [`Nous intervenons : ${site.zone.summary}. Consultez la liste complète des communes, ou appelez-nous en cas de doute.`],
    link: { href: "/zone-intervention", label: "Voir la zone d'intervention" },
  },
  {
    question: "Intervenez-vous en EHPAD ou en résidence seniors ?",
    answer: [
      "Oui. Nous organisons les visites avec l'équipe de l'établissement, et les familles peuvent être informées ou présentes.",
    ],
    link: { href: "/etablissements", label: "Voir l'offre pour les établissements" },
  },
  {
    question: "Et si mes lunettes ne me conviennent pas ?",
    answer: [
      "Appelez-nous. Si vos lunettes glissent, serrent ou si vous ne voyez pas bien, nous revenons les régler et nous cherchons une solution avec vous.",
    ],
  },
];
