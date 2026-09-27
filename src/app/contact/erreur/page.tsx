import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/sections/PageHeader";

/** Page affichée si un envoi sans JavaScript est refusé par le serveur. */
export const metadata: Metadata = {
  title: "Demande non envoyée",
  robots: { index: false, follow: true },
};

export default function ErreurPage() {
  return (
    <>
      <PageHeader
        title="Votre demande n'a pas pu être envoyée"
        intro="Certaines informations semblent incomplètes ou incorrectes."
      />
      <Section labelledBy="que-faire" className="pt-6 sm:pt-8">
        <h2 id="que-faire" className="text-2xl text-ink">
          Que faire ?
        </h2>
        <p className="mt-3 text-lg">
          Revenez au formulaire pour vérifier vos informations, ou appelez-nous directement.
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/contact#formulaire" size="lg">
            Revenir au formulaire
          </ButtonLink>
          <PhoneLink size="lg" variant="secondary" />
        </div>
      </Section>
    </>
  );
}
