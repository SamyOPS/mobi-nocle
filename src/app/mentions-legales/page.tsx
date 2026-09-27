import Link from "next/link";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/sections/PageHeader";

export const metadata = pageMetadata({
  title: "Mentions légales",
  description: `Mentions légales du site ${site.name}.`,
  path: "/mentions-legales",
});

/**
 * TRAME À FAIRE VALIDER par un professionnel du droit.
 * Toutes les valeurs proviennent de src/config/site.ts.
 */
export default function MentionsLegalesPage() {
  const { legal, contact } = site;
  const { address } = legal;

  return (
    <>
      <PageHeader title="Mentions légales" />
      <Section labelledBy="editeur" className="pt-6 sm:pt-8">
        <Prose>
          <h2 id="editeur">Éditeur du site</h2>
          <ul>
            <li>Nom commercial : {site.name}</li>
            <li>Raison sociale : {legal.legalName}</li>
            <li>Forme juridique : {legal.legalForm}</li>
            <li>Capital social : {legal.shareCapital}</li>
            <li>
              Siège social : {address.street}, {address.postalCode} {address.city}
            </li>
            <li>SIRET : {legal.siret}</li>
            <li>RCS : {legal.rcs}</li>
            <li>Numéro de TVA intracommunautaire : {legal.vatNumber}</li>
            <li>Téléphone : {contact.phoneDisplay}</li>
            <li>E-mail : {contact.email}</li>
          </ul>

          <h2>Directeur de la publication</h2>
          <p>{legal.publicationDirector}</p>

          <h2>Activité réglementée</h2>
          <p>
            L&apos;activité d&apos;opticien-lunetier est une profession de santé réglementée par le
            Code de la santé publique. Diplôme de l&apos;opticien : {site.optician.diploma}.
          </p>

          <h2>Hébergeur</h2>
          <ul>
            <li>{legal.host.name}</li>
            <li>Adresse : {legal.host.address}</li>
            <li>
              Site : <a href={legal.host.website}>{legal.host.website}</a>
            </li>
          </ul>

          <h2>Médiation de la consommation</h2>
          <p>
            En cas de litige, et après une démarche préalable auprès de nous, vous pouvez recourir
            gratuitement au médiateur de la consommation suivant : {legal.consumerMediator}.
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus de ce site (textes, logo, images) est la propriété de{" "}
            {site.name}, sauf mention contraire. Toute reproduction sans autorisation est
            interdite.
          </p>

          <h2>Données personnelles</h2>
          <p>
            Pour savoir comment nous utilisons les informations que vous nous transmettez, consultez
            notre <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
          </p>
        </Prose>
      </Section>
    </>
  );
}
