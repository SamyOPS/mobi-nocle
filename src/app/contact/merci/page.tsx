import type { Metadata } from "next";
import { site } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/sections/PageHeader";

/** Page de confirmation après un envoi sans JavaScript. */
export const metadata: Metadata = {
  title: "Demande envoyée",
  robots: { index: false, follow: true },
};

export default function MerciPage() {
  return (
    <>
      <PageHeader
        title="Merci, votre demande est bien envoyée"
        intro={`Nous vous rappelons ${site.contact.callbackDelay}.`}
      />
      <Section labelledBy="suite" className="pt-6 sm:pt-8">
        <h2 id="suite" className="text-2xl text-ink">
          C&apos;est urgent ?
        </h2>
        <p className="mt-3 text-lg">Vous pouvez aussi nous appeler directement.</p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <PhoneLink size="lg" />
          <ButtonLink href="/" variant="secondary" size="lg">
            Retour à l&apos;accueil
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
