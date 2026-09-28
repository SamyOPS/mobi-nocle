import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { Card } from "@/components/ui/Card";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { servicePhotos } from "@/content/photos";
import { Section } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/icons";
import { CallToAction } from "@/components/sections/CallToAction";
import { PageHeader } from "@/components/sections/PageHeader";
import { IconBadge } from "@/components/sections/serviceIcons";

export const metadata = pageMetadata({
  title: "Nos services d'optique à domicile",
  description:
    "Lunettes de vue, examen de vue, entretien et réparation : votre opticien se déplace chez vous ou dans votre établissement.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Nos services d'optique à domicile"
        intro="Tout ce que vous feriez chez un opticien en magasin, sans quitter votre domicile."
      />

      <Section labelledBy="services-liste" className="pt-6 sm:pt-8">
        <h2 id="services-liste" className="sr-only">
          Liste des services
        </h2>
        <div className="space-y-12">
          {services.map((service, index) => (
            <Card
              as="article"
              key={service.id}
              className="grid items-center gap-8 lg:grid-cols-2"
            >
              <div id={service.id} className={index % 2 === 1 ? "lg:order-2" : undefined}>
                <IconBadge icon={service.icon} />
                <h3 className="mt-5 text-2xl text-ink">{service.title}</h3>
                <p className="mt-3 text-lg">{service.summary}</p>
                <ul className="mt-5 space-y-3">
                  {service.details.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <CheckIcon className="mt-1 size-6 shrink-0 text-primary" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <PhotoImage photo={servicePhotos[service.id]} className="aspect-[4/3]" />
            </Card>
          ))}
        </div>
      </Section>

      <CallToAction title="Besoin de nouvelles lunettes ?" />
    </>
  );
}
