import { faq } from "@/content/faq";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { CallToAction } from "@/components/sections/CallToAction";
import { FaqList } from "@/components/sections/FaqList";
import { PageHeader } from "@/components/sections/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Questions fréquentes",
  description:
    "Ordonnance, remboursement, délais, frais de déplacement : les réponses à vos questions sur l'opticien à domicile.",
  path: "/faq",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer.join(" ") },
  })),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageHeader
        title="Questions fréquentes"
        intro="Cliquez sur une question pour afficher la réponse. Vous ne trouvez pas ce que vous cherchez ? Appelez-nous."
      />
      <Section labelledBy="faq-liste" containerSize="narrow" className="pt-6 sm:pt-8">
        <h2 id="faq-liste" className="sr-only">
          Liste des questions
        </h2>
        <FaqList items={faq} />
      </Section>
      <CallToAction title="Vous avez une autre question ?" />
    </>
  );
}
