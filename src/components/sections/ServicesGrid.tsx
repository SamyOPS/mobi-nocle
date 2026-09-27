import Link from "next/link";
import { services } from "@/content/services";
import { Card } from "@/components/ui/Card";
import { ArrowRightIcon } from "@/components/ui/icons";
import { IconBadge } from "./serviceIcons";

export function ServicesGrid() {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {services.map((service) => (
        <Card as="li" key={service.id} className="flex flex-col">
          <IconBadge icon={service.icon} />
          <h3 className="mt-5 text-xl text-ink">{service.title}</h3>
          <p className="mt-3 flex-1">{service.summary}</p>
          <Link
            href={`/services#${service.id}`}
            className="mt-5 inline-flex min-h-12 items-center gap-2 font-bold text-primary underline underline-offset-4 hover:text-primary-dark"
          >
            En savoir plus<span className="sr-only"> sur : {service.title}</span>
            <ArrowRightIcon className="size-5" />
          </Link>
        </Card>
      ))}
    </ul>
  );
}
