import Link from "next/link";
import { bookingNav, mainNav } from "@/config/navigation";
import { site, telHref } from "@/config/site";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { PhoneIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";

export function Header() {
  return (
    <>
      {/* Barre collante : le téléphone reste toujours visible */}
      <header className="sticky top-0 z-50 bg-white shadow-card">
        <Container className="flex items-center justify-between gap-4 py-2 sm:py-3">
          <Link href="/" className="shrink-0 rounded-xl">
            <Logo eager className="w-36 sm:w-44 lg:w-48" />
          </Link>

          <div className="ml-auto hidden items-center gap-3 lg:flex">
            <PhoneLink variant="secondary" />
            <ButtonLink href={bookingNav.href}>{bookingNav.label}</ButtonLink>
          </div>

          <MobileMenu />
        </Container>

        {/* Bandeau d'appel mobile, pleine largeur */}
        <a
          href={telHref()}
          className="flex min-h-12 items-center justify-center gap-3 bg-primary px-4 py-2 font-display text-lg font-extrabold text-white no-underline hover:bg-primary-dark focus-visible:shadow-none focus-visible:outline-white focus-visible:-outline-offset-[6px] lg:hidden"
        >
          <PhoneIcon className="size-6 shrink-0" />
          <span>Appeler le {site.contact.phoneDisplay}</span>
        </a>
      </header>

      {/* Navigation principale grand écran */}
      <nav aria-label="Navigation principale" className="hidden border-b border-lens bg-white xl:block">
        <Container>
          <ul className="flex flex-wrap items-center gap-x-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  className="flex min-h-12 items-center rounded-xl px-2 py-2 font-bold text-ink underline-offset-4 hover:text-primary hover:underline"
                  activeClassName="text-primary underline decoration-arc decoration-[3px]"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </>
  );
}
