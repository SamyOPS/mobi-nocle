import Link from "next/link";
import { contactNav } from "@/config/navigation";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { Card } from "@/components/ui/Card";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/sections/PageHeader";
import { BookingWizard } from "@/components/booking/BookingWizard";

export const metadata = pageMetadata({
  title: "Prendre rendez-vous",
  description: `Réservez en ligne la visite de votre opticien à domicile ${site.name} : choisissez le jour et la plage horaire qui vous conviennent.`,
  path: "/rendez-vous",
});

export default function RendezVousPage() {
  return (
    <>
      <PageHeader
        title="Prendre rendez-vous"
        intro="Quelques questions simples, puis vous choisissez le jour et la plage horaire de la visite. Pour vous, ou pour un proche."
      />
      <Section className="pt-6 sm:pt-8">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_20rem]">
          <div className="min-w-0">
            <noscript>
              <div className="rounded-3xl border-4 border-primary bg-lens-light p-6 text-lg">
                <p className="font-bold">
                  La prise de rendez-vous en ligne nécessite JavaScript, qui semble désactivé.
                </p>
                <p className="mt-2">
                  Appelez-nous au {site.contact.phoneDisplay}, ou{" "}
                  <Link href={contactNav.href} className="font-bold text-primary underline">
                    demandez à être rappelé
                  </Link>
                  .
                </p>
              </div>
            </noscript>
            <BookingWizard />
          </div>

          <aside aria-labelledby="aide-rdv" className="lg:sticky lg:top-36">
            <Card className="bg-lens-light">
              <h2 id="aide-rdv" className="text-2xl text-ink">
                Besoin d&apos;aide ?
              </h2>
              <p className="mt-3">Nous pouvons aussi prendre le rendez-vous avec vous par téléphone.</p>
              <div className="mt-4">
                <PhoneLink />
              </div>
              <p className="mt-4">
                <Link
                  href={contactNav.href}
                  className="inline-flex min-h-12 items-center font-bold text-primary underline underline-offset-4 hover:text-primary-dark"
                >
                  Vous préférez qu&apos;on vous rappelle ?
                </Link>
              </p>
            </Card>
          </aside>
        </div>
      </Section>
    </>
  );
}
