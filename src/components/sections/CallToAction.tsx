import { frTypo } from "@/lib/typo";
import Link from "next/link";
import { bookingNav, contactNav } from "@/config/navigation";
import { isFilled, site } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { Container } from "@/components/ui/Container";

type CallToActionProps = {
  title?: string;
  text?: string;
};

/** Bandeau d'appel à l'action : téléphone et demande de rappel. */
export function CallToAction({
  title = "Une question ? Parlons-en",
  text = "Prenez rendez-vous en ligne en quelques minutes, ou appelez-nous : nous répondons à vos questions.",
}: CallToActionProps) {
  return (
    <section aria-labelledby="cta-titre" className="bg-white py-12 sm:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-10 text-center text-white sm:px-10">
          {/* Arc décoratif rappelant le logo */}
          <svg
            aria-hidden="true"
            viewBox="0 0 400 40"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 h-8 w-full text-arc"
          >
            <path d="M0 40 Q200 -10 400 40 Z" fill="currentColor" />
          </svg>
          <div className="relative">
            <h2 id="cta-titre" className="text-2xl sm:text-3xl">
              {frTypo(title)}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg">{frTypo(text)}</p>
            {isFilled(site.contact.openingHours[0]?.label) ? (
              <p className="mt-2">{site.contact.openingHours.map((h) => h.label).join(" · ")}</p>
            ) : null}
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink href={bookingNav.href} variant="light" size="lg">
                {bookingNav.label}
              </ButtonLink>
              <PhoneLink variant="outline-light" size="lg" />
            </div>
            <p className="mt-4">
              <Link href={contactNav.href} className="inline-flex min-h-12 items-center font-bold underline underline-offset-4 text-white">
                Vous préférez qu&apos;on vous rappelle ?
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
