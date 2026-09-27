import Link from "next/link";
import { bookingNav, contactNav } from "@/config/navigation";
import { site } from "@/config/site";
import { frTypo } from "@/lib/typo";
import { ArcDivider } from "@/components/ui/ArcDivider";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon, BuildingIcon, CheckIcon, MapPinIcon } from "@/components/ui/icons";
import { CallToAction } from "@/components/sections/CallToAction";
import { CirclePhoto } from "@/components/sections/CirclePhoto";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Steps } from "@/components/sections/Steps";
import { TrustPoints } from "@/components/sections/TrustPoints";

const textLinkClass =
  "inline-flex min-h-12 items-center gap-2 font-bold text-primary underline underline-offset-4 hover:text-primary-dark";

export default function HomePage() {
  const { optician, zone } = site;

  return (
    <>
      {/* Accroche */}
      <section aria-labelledby="accroche" className="bg-lens-light pt-10 pb-6 sm:pt-12">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="min-w-0">
            <h1 id="accroche" className="text-3xl text-ink sm:text-4xl lg:text-5xl">
              Votre opticien se déplace chez vous
            </h1>
            <p className="mt-5 max-w-2xl text-lg sm:text-xl">
              {frTypo(
                "Contrôle de la vue, choix des lunettes, livraison et ajustage : tout se fait chez vous, à votre rythme. Pour vous, ou pour un proche.",
              )}
            </p>
            <ul className="mt-5 space-y-1">
              {["À domicile ou en établissement", "Prise en charge par votre mutuelle selon votre contrat", "Un proche peut être présent"].map(
                (item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon className="mt-1 size-6 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ),
              )}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={bookingNav.href} size="lg">
                {bookingNav.label}
              </ButtonLink>
              <PhoneLink size="lg" variant="secondary" prefix="Appeler le" />
            </div>
            <p className="mt-3">
              <Link href={contactNav.href} className="inline-flex min-h-12 items-center font-bold underline underline-offset-4 text-primary hover:text-primary-dark">
                Vous préférez qu&apos;on vous rappelle ?
              </Link>
            </p>
            <p className="mt-5 flex items-start gap-3">
              <MapPinIcon className="mt-1 size-6 shrink-0 text-primary" />
              <span>
                <strong>Zone d&apos;intervention :</strong> {zone.summary}.{" "}
                <Link href="/zone-intervention" className="font-bold text-primary underline underline-offset-4">
                  Voir les communes
                </Link>
              </span>
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <CirclePhoto label="L'opticien lors d'une visite à domicile" />
          </div>
        </Container>
      </section>
      <ArcDivider from="lens-light" to="white" />

      {/* Déroulement */}
      <Section labelledBy="etapes-titre">
        <SectionHeading
          id="etapes-titre"
          title="Comment ça se passe ?"
          intro="Quatre étapes simples, sans vous déplacer."
        />
        <Steps />
        <p className="mt-10">
          <Link href="/comment-ca-se-passe" className={textLinkClass}>
            Voir le déroulement en détail
            <ArrowRightIcon className="size-5" />
          </Link>
        </p>
      </Section>

      {/* Services */}
      <ArcDivider from="white" to="lens-light" />
      <Section tone="lens-light" labelledBy="services-titre" className="pt-8 sm:pt-10">
        <SectionHeading
          id="services-titre"
          title="Nos services"
          intro="Uniquement de l'optique, avec le même soin qu'en magasin."
        />
        <ServicesGrid />
      </Section>
      <ArcDivider from="lens-light" to="white" />

      {/* Confiance */}
      <Section labelledBy="confiance-titre">
        <div className="grid items-start gap-12 lg:grid-cols-[2fr_1fr]">
          <div>
            <SectionHeading id="confiance-titre" title="Pourquoi faire confiance à Mobi'Nocle ?" />
            <TrustPoints />
          </div>
          <Card as="article" className="text-center">
            <div className="flex justify-center">
              <CirclePhoto size="lg" label="Portrait de l'opticien" />
            </div>
            <h3 className="mt-6 text-xl text-ink">Votre opticien : {optician.name}</h3>
            <p className="mt-2 font-bold">{optician.diploma}</p>
            <p className="mt-3">{optician.bio}</p>
          </Card>
        </div>
      </Section>

      {/* Zone et établissements */}
      <Section tone="lens-light" labelledBy="zone-titre">
        <h2 id="zone-titre" className="sr-only">
          Zone d&apos;intervention et établissements
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card as="article">
            <MapPinIcon className="size-10 text-primary" />
            <h3 className="mt-4 text-xl text-ink">Où intervenons-nous ?</h3>
            <p className="mt-3">{zone.summary}</p>
            <Link href="/zone-intervention" className={`${textLinkClass} mt-4`}>
              Voir toutes les communes
              <ArrowRightIcon className="size-5" />
            </Link>
          </Card>
          <Card as="article">
            <BuildingIcon className="size-10 text-primary" />
            <h3 className="mt-4 text-xl text-ink">Vous êtes un établissement ?</h3>
            <p className="mt-3">
              EHPAD, résidences seniors : nous organisons des visites pour vos résidents, en lien
              avec vos équipes et les familles.
            </p>
            <Link href="/etablissements" className={`${textLinkClass} mt-4`}>
              Découvrir notre offre pour les établissements
              <ArrowRightIcon className="size-5" />
            </Link>
          </Card>
        </div>
      </Section>
      <ArcDivider from="lens-light" to="white" />

      <CallToAction />
    </>
  );
}
