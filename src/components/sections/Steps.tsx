import { etapes } from "@/content/etapes";
import { FramedCircle } from "@/components/ui/FramedCircle";
import { cn } from "@/lib/cn";

type StepsProps = {
  /** « summary » : version courte (accueil) ; « details » : version complète */
  variant?: "summary" | "details";
  /** Niveau de titre des étapes, selon la page */
  headingLevel?: "h2" | "h3";
};

export function Steps({ variant = "summary", headingLevel: Heading = "h3" }: StepsProps) {
  const detailed = variant === "details";
  return (
    <ol
      className={cn(
        "grid gap-8",
        detailed ? "gap-12" : "sm:grid-cols-2 lg:grid-cols-4",
      )}
    >
      {etapes.map((etape, index) => (
        <li
          key={etape.title}
          className={cn("flex gap-5", detailed ? "flex-col sm:flex-row" : "flex-col")}
        >
          <FramedCircle size={detailed ? "md" : "sm"}>
            <span aria-hidden="true">{index + 1}</span>
          </FramedCircle>
          <div>
            <Heading className="text-2xl text-ink">
              <span className="sr-only">Étape {index + 1} : </span>
              {etape.title}
            </Heading>
            {detailed ? (
              <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-primary">
                {etape.details.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-3">{etape.summary}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
