import { A_COMPLETER, site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/sections/PageHeader";

export const metadata = pageMetadata({
  title: "Politique de confidentialité",
  description: `Comment ${site.name} utilise et protège les informations que vous transmettez.`,
  path: "/politique-de-confidentialite",
});

/**
 * TRAME À FAIRE VALIDER (RGPD). À mettre à jour dès que le service d'envoi
 * du formulaire est choisi (sous-traitant, lieu d'hébergement des données).
 */
export default function ConfidentialitePage() {
  const { legal, contact } = site;

  return (
    <>
      <PageHeader
        title="Politique de confidentialité"
        intro="Nous utilisons vos informations uniquement pour vous rappeler. Voici, simplement, ce que cela veut dire."
      />
      <Section labelledBy="responsable" className="pt-6 sm:pt-8">
        <Prose>
          <h2 id="responsable">Qui est responsable de vos données ?</h2>
          <p>
            {legal.legalName} ({site.name}), {legal.address.street}, {legal.address.postalCode}{" "}
            {legal.address.city}. Contact : {contact.email}, {contact.phoneDisplay}.
          </p>

          <h2>Quelles informations recueillons-nous ?</h2>
          <p>Lorsque vous remplissez le formulaire de demande de rappel :</p>
          <ul>
            <li>votre nom ;</li>
            <li>votre numéro de téléphone ;</li>
            <li>votre commune ;</li>
            <li>si la demande est pour vous ou pour un proche ;</li>
            <li>le message que vous choisissez d&apos;écrire, le cas échéant.</li>
          </ul>
          <p>
            Nous ne vous demandons aucune information sur votre santé par ce formulaire. Merci de ne
            pas en indiquer dans le message : nous en parlerons de vive voix si nécessaire.
          </p>

          <h2>Pourquoi ?</h2>
          <p>
            Uniquement pour vous rappeler et répondre à votre demande. Vos informations ne sont
            jamais vendues ni utilisées pour de la publicité.
          </p>
          <p>
            Base légale : votre consentement, que vous donnez en cochant la case prévue. Vous pouvez
            le retirer à tout moment.
          </p>

          <h2>Qui peut les voir ?</h2>
          <p>
            Seul {site.name} a accès à vos informations. Nos prestataires techniques (hébergement du
            site : {legal.host.name} ; service d&apos;envoi des demandes : {A_COMPLETER}) les
            traitent pour notre compte, sans pouvoir les utiliser pour eux-mêmes.
          </p>
          <p>Lieu d&apos;hébergement des données et garanties éventuelles : {A_COMPLETER}.</p>

          <h2>Combien de temps sont-elles conservées ?</h2>
          <p>Durée de conservation : {A_COMPLETER}.</p>

          <h2>Vos droits</h2>
          <p>Vous pouvez à tout moment :</p>
          <ul>
            <li>savoir quelles informations nous avons sur vous ;</li>
            <li>les faire corriger ou supprimer ;</li>
            <li>vous opposer à leur utilisation ou en demander la limitation ;</li>
            <li>les récupérer ;</li>
            <li>retirer votre consentement.</li>
          </ul>
          <p>
            Pour cela, écrivez-nous à {contact.email} ou appelez-nous au {contact.phoneDisplay}.
            Un proche peut nous contacter pour vous, avec votre accord.
          </p>
          <p>
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une
            réclamation à la CNIL : <a href="https://www.cnil.fr">www.cnil.fr</a>.
          </p>

          <h2>Cookies</h2>
          <p>
            Ce site n&apos;utilise pas de cookies publicitaires ni de mesure d&apos;audience. Si
            cela devait changer, cette page serait mise à jour et votre accord vous serait demandé
            lorsque la loi l&apos;exige.
          </p>

          <p>Dernière mise à jour : {A_COMPLETER}</p>
        </Prose>
      </Section>
    </>
  );
}
