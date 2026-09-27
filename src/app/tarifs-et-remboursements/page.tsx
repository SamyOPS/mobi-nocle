import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { ArcDivider } from "@/components/ui/ArcDivider";
import { Card } from "@/components/ui/Card";
import { InfoList } from "@/components/ui/InfoList";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CallToAction } from "@/components/sections/CallToAction";
import { PageHeader } from "@/components/sections/PageHeader";

export const metadata = pageMetadata({
  title: "Tarifs et remboursements",
  description:
    "100 % Santé, tiers payant, mutuelles et frais de déplacement : tout savoir sur le prix et le remboursement de vos lunettes à domicile.",
  path: "/tarifs-et-remboursements",
});

export default function TarifsPage() {
  const { pricing } = site;

  return (
    <>
      <PageHeader
        title="Tarifs et remboursements"
        intro="Vos lunettes sont prises en charge par l'Assurance maladie et votre mutuelle, comme en magasin. Avant toute commande, vous recevez un devis détaillé."
      />

      {/* BROUILLON À RELIRE : informations générales à vérifier avant publication */}
      <Section labelledBy="cent-pour-cent" className="pt-6 sm:pt-8">
        <SectionHeading
          id="cent-pour-cent"
          title="Le 100 % Santé : des lunettes sans reste à charge"
        />
        <div className="grid gap-6 md:grid-cols-2">
          <Card as="article">
            <h3 className="text-xl text-ink">Offre 100 % Santé</h3>
            <p className="mt-3">
              Une sélection de montures et de verres entièrement remboursés : une partie par
              l&apos;Assurance maladie, le reste par votre mutuelle, si votre contrat est dit
              « responsable ». C&apos;est le cas de la plupart des contrats.
            </p>
          </Card>
          <Card as="article">
            <h3 className="text-xl text-ink">Offre à tarifs libres</h3>
            <p className="mt-3">
              Vous pouvez aussi choisir une autre monture ou d&apos;autres verres. Le remboursement
              dépend alors de votre mutuelle, et une partie peut rester à votre charge.
            </p>
          </Card>
        </div>
        <p className="mt-6 max-w-3xl">
          Dans tous les cas, le devis que nous vous remettons présente au moins une proposition
          100 % Santé. Vous choisissez librement.
        </p>
      </Section>

      <ArcDivider from="white" to="lens-light" />
      <Section tone="lens-light" labelledBy="pratique" className="pt-8 sm:pt-10">
        <SectionHeading id="pratique" title="En pratique" />
        <div className="grid gap-6 md:grid-cols-2">
          <Card as="article">
            <h3 className="text-xl text-ink">Tiers payant</h3>
            <p className="mt-3">{pricing.thirdPartyPayment}</p>
            <p className="mt-3">
              Avec le tiers payant, vous n&apos;avancez pas la part remboursée : nous nous faisons
              payer directement par l&apos;Assurance maladie et par votre mutuelle.
            </p>
          </Card>
          <Card as="article">
            <h3 className="text-xl text-ink">Frais de déplacement</h3>
            <p className="mt-3 text-xl font-bold">{pricing.travelFees}</p>
            <p className="mt-3">{pricing.travelFeesConditions}</p>
          </Card>
          <Card as="article">
            <h3 className="text-xl text-ink">Mutuelles partenaires</h3>
            <div className="mt-3">
              <InfoList items={pricing.partnerInsurers} />
            </div>
            <p className="mt-3">
              Votre mutuelle n&apos;est pas dans la liste ? Appelez-nous, nous vérifions avec vous.
            </p>
          </Card>
          <Card as="article">
            <h3 className="text-xl text-ink">Moyens de paiement</h3>
            <div className="mt-3">
              <InfoList items={pricing.paymentMethods} />
            </div>
          </Card>
        </div>
      </Section>
      <ArcDivider from="lens-light" to="white" />

      <CallToAction
        title="Une question sur un remboursement ?"
        text="Appelez-nous avec votre carte de mutuelle à portée de main : nous regardons ensemble ce qui est pris en charge."
      />
    </>
  );
}
