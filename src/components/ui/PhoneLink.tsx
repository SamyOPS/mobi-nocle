import { site, telHref } from "@/config/site";
import { buttonClasses } from "./Button";
import { PhoneIcon } from "./icons";

type PhoneLinkProps = {
  variant?: "primary" | "secondary" | "light";
  size?: "md" | "lg";
  className?: string;
  /** Texte visible avant le numéro, ex. « Appelez le » */
  prefix?: string;
};

/** Bouton d'appel : lien tel: vers le numéro défini dans la config. */
export function PhoneLink({ variant = "primary", size = "md", className, prefix }: PhoneLinkProps) {
  return (
    <a
      href={telHref()}
      className={buttonClasses({ variant, size, className })}
    >
      <PhoneIcon className="size-6 shrink-0" />
      <span>
        {prefix ? `${prefix} ` : null}
        <span className="whitespace-nowrap">{site.contact.phoneDisplay}</span>
      </span>
    </a>
  );
}
