import { cn } from "@/lib/cn";
import { steps, type StepIndex } from "./draft";

/** Indicateur de progression : texte explicite + pastilles façon verres de lunettes. */
export function BookingProgress({ current }: { current: StepIndex }) {
  return (
    <div className="mb-8">
      <p className="text-lg font-bold">
        Étape {current + 1} sur {steps.length}
      </p>
      <ol aria-hidden="true" className="mt-3 flex items-center gap-2">
        {steps.map((step, index) => (
          <li key={step.id} className="flex flex-1 items-center gap-2 last:flex-none">
            <span
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-full border-4 font-display text-base font-black",
                index < current && "border-primary bg-primary text-white",
                index === current && "border-ink bg-lens text-ink",
                index > current && "border-ink-soft bg-white text-ink-soft",
              )}
            >
              {index + 1}
            </span>
            {index < steps.length - 1 ? (
              <span className={cn("h-1 flex-1 rounded-full", index < current ? "bg-primary" : "bg-lens")} />
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
