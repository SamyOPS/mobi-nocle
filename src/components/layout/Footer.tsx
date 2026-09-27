import Link from "next/link";
import { contactNav, legalNav, mainNav } from "@/config/navigation";
import { isFilled, site } from "@/config/site";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { ArcDivider } from "@/components/ui/ArcDivider";

const linkClass =
  "inline-flex min-h-12 items-center py-1 font-bold text-primary underline underline-offset-4 hover:text-primary-dark hover:decoration-[3px]";

export function Footer() {
  const year = new Date().getFullYear();
  const { contact, zone } = site;

  return (
    <footer className="mt-auto">
      <ArcDivider from="white" to="lens-light" />
      <div className="bg-lens-light pb-10 pt-8">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <Logo className="w-48" />
              <p className="mt-4">{site.tagline}.</p>
            </div>

            <div>
              <h2 className="text-xl text-ink">Nous contacter</h2>
              <div className="mt-4 flex flex-col items-start gap-3">
                <PhoneLink />
                <Link href={contactNav.href} className={linkClass}>
                  Demander à être rappelé
                </Link>
              </div>
              <dl className="mt-4 space-y-3">
                <div>
                  <dt className="font-bold">E-mail</dt>
                  <dd>
                    {isFilled(contact.email) ? (
                      <a href={`mailto:${contact.email}`} className={linkClass}>
                        {contact.email}
                      </a>
                    ) : (
                      contact.email
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="font-bold">Horaires</dt>
                  {contact.openingHours.map((hours) => (
                    <dd key={hours.label}>{hours.label}</dd>
                  ))}
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-xl text-ink">Zone d&apos;intervention</h2>
              <p className="mt-4">{zone.summary}</p>
              <Link href="/zone-intervention" className={linkClass}>
                Voir les communes desservies
              </Link>
            </div>

            <nav aria-label="Plan du site">
              <h2 className="text-xl text-ink">Plan du site</h2>
              <ul className="mt-2">
                {[{ href: "/", label: "Accueil" }, ...mainNav, contactNav].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t-2 border-arc pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {site.name}
            </p>
            <ul className="flex flex-wrap gap-x-6">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  );
}
