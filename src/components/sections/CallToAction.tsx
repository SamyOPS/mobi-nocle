import { contactNav } from "@/config/navigation";
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
  text = "Appelez-nous, ou laissez-nous votre numéro : nous vous rappelons pour répondre à vos questions et convenir d'un rendez-vous.",
}: CallToActionProps) {
  return (
    <section aria-labelledby="cta-titre" className="bg-white py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-12 text-center text-white sm:px-12">
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
            <h2 id="cta-titre" className="text-3xl sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg sm:text-xl">{text}</p>
            {isFilled(site.contact.openingHours[0]?.label) ? (
              <p className="mt-2">{site.contact.openingHours.map((h) => h.label).join(" · ")}</p>
            ) : null}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <PhoneLink variant="light" size="lg" />
              <ButtonLink href={contactNav.href} variant="light" size="lg">
                Demander à être rappelé
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
