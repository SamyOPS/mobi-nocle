import { contactNav } from "@/config/navigation";
import { pageMetadata } from "@/lib/metadata";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FramedCircle } from "@/components/ui/FramedCircle";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { photos } from "@/content/photos";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/sections/PageHeader";

export const metadata = pageMetadata({
  title: "Pour les établissements : EHPAD et résidences seniors",
  description:
    "Un opticien qui se déplace dans votre EHPAD ou votre résidence seniors : examen de vue, lunettes, entretien et réparation pour vos résidents.",
  path: "/etablissements",
});

/** BROUILLON À RELIRE */
const avantages = [
  {
    title: "Pas de déplacement pour vos résidents",
    text: "Plus besoin d'organiser un transport ni un accompagnement vers un magasin.",
  },
  {
    title: "Des visites organisées avec vos équipes",
    text: "Nous convenons ensemble des jours de passage et du lieu : une pièce calme suffit.",
  },
  {
    title: "Les familles informées",
    text: "Les proches peuvent être présents ou être tenus au courant, avec l'accord du résident.",
  },
  {
    title: "Un suivi dans le temps",
    text: "Réglages, réparations, lunettes égarées : nous revenons quand c'est nécessaire.",
  },
];

/** BROUILLON À RELIRE */
const deroulement = [
  "Vous nous contactez pour présenter votre établissement et vos besoins.",
  "Nous convenons d'une première journée de visite et des résidents concernés.",
  "L'opticien rencontre chaque résident, contrôle sa vue et l'aide à choisir ses lunettes.",
  "Nous revenons livrer et ajuster les lunettes, directement dans l'établissement.",
];

export default function EtablissementsPage() {
  return (
    <>
      <PageHeader
        title="Pour les EHPAD et résidences seniors"
        intro="Nous intervenons dans votre établissement pour le confort visuel de vos résidents, en lien avec vos équipes et les familles."
      />

      <Section labelledBy="avantages" className="pt-6 sm:pt-8">
        <SectionHeading id="avantages" title="Ce que nous vous proposons" />
        <ul className="grid gap-6 md:grid-cols-2">
          {avantages.map((item) => (
            <Card as="li" key={item.title}>
              <div className="flex items-start gap-4">
                <CheckIcon className="mt-1 size-7 shrink-0 text-primary" />
                <div>
                  <h3 className="text-xl text-ink">{item.title}</h3>
                  <p className="mt-2">{item.text}</p>
                </div>
              </div>
            </Card>
          ))}
        </ul>
      </Section>

      <Section tone="lens-light" labelledBy="organisation">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="organisation" title="Comment nous organisons les visites" />
            <ol className="space-y-6">
              {deroulement.map((line, index) => (
                <li key={line} className="flex items-start gap-4">
                  <FramedCircle size="sm">
                    <span aria-hidden="true">{index + 1}</span>
                  </FramedCircle>
                  <p className="pt-3">
                    <span className="sr-only">Étape {index + 1} : </span>
                    {line}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <PhotoImage photo={photos.etablissement} className="aspect-[4/3]" />
        </div>
      </Section>

      <Section labelledBy="contact-etablissement">
        <Card className="text-center">
          <h2 id="contact-etablissement" className="text-2xl text-ink">
            Parlons de votre établissement
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg">
            Appelez-nous ou laissez-nous vos coordonnées : nous vous rappelons pour organiser une
            première visite.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <PhoneLink size="lg" />
            <ButtonLink href={contactNav.href} variant="secondary" size="lg">
              Demander à être rappelé
            </ButtonLink>
          </div>
        </Card>
      </Section>
    </>
  );
}
