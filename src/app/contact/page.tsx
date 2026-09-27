import Link from "next/link";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { Card } from "@/components/ui/Card";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { Section } from "@/components/ui/Section";
import { ClockIcon, MailIcon } from "@/components/ui/icons";
import { CallbackForm } from "@/components/forms/CallbackForm";
import { PageHeader } from "@/components/sections/PageHeader";

export const metadata = pageMetadata({
  title: "Contact et demande de rappel",
  description: `Appelez ${site.name} ou laissez votre numéro : votre opticien à domicile vous rappelle pour convenir d'un rendez-vous.`,
  path: "/contact",
});

export default function ContactPage() {
  const { contact } = site;
  return (
    <>
      <PageHeader
        title="Contact"
        intro={
          <p>
            Appelez-nous directement, ou laissez-nous votre numéro : nous vous rappelons. Vous pouvez
            aussi{" "}
            <Link href="/rendez-vous" className="font-bold text-primary underline underline-offset-4">
              prendre rendez-vous en ligne
            </Link>
            .
          </p>
        }
      />
      <Section labelledBy="contact-telephone" className="pt-6 sm:pt-8">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Card as="article" className="bg-lens-light lg:sticky lg:top-36">
            <h2 id="contact-telephone" className="text-3xl text-ink">
              Par téléphone
            </h2>
            <p className="mt-3 text-lg">Le plus simple et le plus rapide.</p>
            <div className="mt-5">
              <PhoneLink size="lg" />
            </div>
            <dl className="mt-6 space-y-4">
              <div>
                <dt className="flex items-center gap-3 font-bold">
                  <ClockIcon className="size-6 shrink-0 text-primary" />
                  Horaires
                </dt>
                {contact.openingHours.map((hours) => (
                  <dd key={hours.label} className="pl-9">
                    {hours.label}
                  </dd>
                ))}
              </div>
              <div>
                <dt className="flex items-center gap-3 font-bold">
                  <MailIcon className="size-6 shrink-0 text-primary" />
                  E-mail
                </dt>
                <dd className="break-all pl-9">{contact.email}</dd>
              </div>
            </dl>
          </Card>

          <div>
            <h2 className="text-3xl text-ink">Demander à être rappelé</h2>
            <p className="mt-3 mb-8 text-lg">
              Remplissez ce court formulaire : nous vous rappelons {contact.callbackDelay}.
            </p>
            <CallbackForm />
          </div>
        </div>
      </Section>
    </>
  );
}
