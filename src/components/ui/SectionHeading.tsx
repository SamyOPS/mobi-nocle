import { frTypo } from "@/lib/typo";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  id: string;
  title: string;
  intro?: React.ReactNode;
  /** h1 pour l'en-tête de page, h2 pour les sections */
  as?: "h1" | "h2";
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  id,
  title,
  intro,
  as: Tag = "h2",
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Tag
        id={id}
        className={cn(
          "text-ink",
          Tag === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl",
        )}
      >
        {frTypo(title)}
      </Tag>
      {/* Petit arc rappelant celui du logo, purement décoratif */}
      <svg
        aria-hidden="true"
        viewBox="0 0 120 14"
        className={cn("mt-3 h-3 w-24 text-arc", align === "center" && "mx-auto")}
      >
        <path d="M2 12 Q60 -4 118 12 Q60 4 2 12 Z" fill="currentColor" />
      </svg>
      {intro ? <div className="mt-5 text-lg text-ink-soft sm:text-xl">{intro}</div> : null}
    </div>
  );
}
