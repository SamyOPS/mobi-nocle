import { pageMetadata } from "@/lib/metadata";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/icons";
import { CallToAction } from "@/components/sections/CallToAction";
import { PageHeader } from "@/components/sections/PageHeader";
import { Steps } from "@/components/sections/Steps";

export const metadata = pageMetadata({
  title: "Comment ça se passe",
  description:
    "De votre appel à l'ajustage de vos lunettes chez vous : les quatre étapes d'une visite de votre opticien à domicile.",
  path: "/comment-ca-se-passe",
});

/** Documents utiles le jour de la visite. BROUILLON À RELIRE. */
const aPreparer = [
  "Votre ordonnance, si vous en avez une",
  "Votre carte Vitale",
  "Votre carte de mutuelle",
  "Vos lunettes actuelles, même abîmées",
];

export default function CommentCaSePassePage() {
  return (
    <>
      <PageHeader
        title="Comment ça se passe ?"
        intro="Quatre étapes simples, de votre premier appel jusqu'à vos nouvelles lunettes, sans vous déplacer."
      />

      <Section labelledBy="etapes" className="pt-6 sm:pt-8">
        <h2 id="etapes" className="sr-only">
          Les étapes
        </h2>
        <div className="grid items-start gap-12 lg:grid-cols-[2fr_1fr]">
          <Steps variant="details" headingLevel="h3" />
          <Card as="article" className="bg-lens-light lg:sticky lg:top-36">
            <h3 className="text-xl text-ink">À préparer pour la visite</h3>
            <ul className="mt-5 space-y-3">
              {aPreparer.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon className="mt-1 size-6 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5">
              Pas d&apos;inquiétude si vous n&apos;avez pas tout : nous en parlons ensemble au
              téléphone.
            </p>
          </Card>
        </div>
      </Section>

      <CallToAction title="Prêt à prendre rendez-vous ?" />
    </>
  );
}
