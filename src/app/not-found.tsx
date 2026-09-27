import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/sections/PageHeader";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <PageHeader
        title="Cette page est introuvable"
        intro="L'adresse est peut-être incorrecte, ou la page a été déplacée."
      />
      <Section labelledBy="suite-404" className="pt-6 sm:pt-8">
        <h2 id="suite-404" className="text-2xl text-ink">
          Que souhaitez-vous faire ?
        </h2>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Retour à l&apos;accueil
          </ButtonLink>
          <PhoneLink size="lg" variant="secondary" />
        </div>
      </Section>
    </>
  );
}
