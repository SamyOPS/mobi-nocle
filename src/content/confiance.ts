/**
 * Points de confiance. BROUILLON À RELIRE.
 * Aucun chiffre ni avis inventé : à enrichir avec des éléments réels (années
 * d'expérience, nombre de clients, avis vérifiés…) quand vous les aurez.
 */

export type TrustIcon = "home" | "clock" | "heart" | "euro";

export type TrustPoint = {
  icon: TrustIcon;
  title: string;
  text: string;
};

export const trustPoints: TrustPoint[] = [
  {
    icon: "home",
    title: "Vous restez chez vous",
    text: "Plus besoin de vous déplacer ni de demander à quelqu'un de vous accompagner en magasin.",
  },
  {
    icon: "clock",
    title: "Nous prenons le temps",
    text: "La visite se fait à votre rythme. Nous expliquons chaque étape simplement.",
  },
  {
    icon: "heart",
    title: "Vos proches sont les bienvenus",
    text: "Un proche ou un aidant peut être présent pendant la visite pour vous accompagner dans vos choix.",
  },
  {
    icon: "euro",
    title: "Remboursement comme en magasin",
    text: "Vos lunettes sont prises en charge par l'Assurance maladie et votre mutuelle, selon votre contrat.",
  },
];
