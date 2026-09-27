import { A_COMPLETER, site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { Card } from "@/components/ui/Card";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MapPinIcon } from "@/components/ui/icons";
import { CallToAction } from "@/components/sections/CallToAction";
import { PageHeader } from "@/components/sections/PageHeader";

export const metadata = pageMetadata({
  title: "Zone d'intervention",
  description: `Les communes où votre opticien à domicile ${site.name} se déplace, chez vous ou en établissement.`,
  path: "/zone-intervention",
});

export default function ZonePage() {
  const { zone } = site;
  const communes = [...zone.communes].sort((a, b) => a.name.localeCompare(b.name, "fr"));

  return (
    <>
      <PageHeader title="Zone d'intervention" intro={<p>{zone.summary}</p>} />

      <Section labelledBy="communes" className="pt-6 sm:pt-8">
        <SectionHeading
          id="communes"
          title="Les communes où nous nous déplaçons"
          intro={<p>Départements : {zone.departments.join(", ")}</p>}
        />
        {communes.length > 0 ? (
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {communes.map((commune) => (
              <li key={`${commune.name}-${commune.postalCode}`} className="flex items-start gap-3">
                <MapPinIcon className="mt-1 size-6 shrink-0 text-primary" />
                <span>
                  {commune.name} <span className="text-ink-soft">({commune.postalCode})</span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Liste des communes : {A_COMPLETER}</p>
        )}

        <Card as="article" className="mt-12 bg-lens-light">
          <h3 className="text-2xl text-ink">Votre commune n&apos;est pas dans la liste ?</h3>
          <p className="mt-3">
            Appelez-nous quand même : selon les rendez-vous prévus, nous pouvons parfois nous
            déplacer un peu plus loin.
          </p>
          <div className="mt-5">
            <PhoneLink />
          </div>
        </Card>
      </Section>

      {/* Emplacement pour une carte, à intégrer plus tard. La liste ci-dessus reste l'alternative textuelle. */}
      <Section tone="lens-light" labelledBy="carte">
        <SectionHeading id="carte" title="Carte de la zone" />
        <ImagePlaceholder label="Carte de la zone d'intervention" width={1200} height={600} />
      </Section>

      <CallToAction />
    </>
  );
}
