import { cn } from "@/lib/cn";

type Tone = "white" | "lens-light" | "lens" | "primary";

const fillClass: Record<Tone, string> = {
  white: "text-white",
  "lens-light": "text-lens-light",
  lens: "text-lens",
  primary: "text-primary",
};

const bgClass: Record<Tone, string> = {
  white: "bg-white",
  "lens-light": "bg-lens-light",
  lens: "bg-lens",
  primary: "bg-primary",
};

type ArcDividerProps = {
  /** Couleur de la section au-dessus */
  from: Tone;
  /** Couleur de la section en dessous (qui « monte » en arc) */
  to: Tone;
  className?: string;
};

/**
 * Séparateur de section en arc, rappelant l'arc bleu-gris du logo.
 * Purement décoratif.
 */
export function ArcDivider({ from, to, className }: ArcDividerProps) {
  return (
    <div aria-hidden="true" className={cn(bgClass[from], "leading-none", className)}>
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        focusable="false"
        className="block h-8 w-full sm:h-12"
      >
        {/* Fond de la section suivante, en dôme */}
        <path d="M0 90 Q720 0 1440 90 Z" className={fillClass[to]} fill="currentColor" />
        {/* Croissant bleu-gris, plus épais au centre comme sur le logo */}
        <path
          d="M0 90 Q720 -6 1440 90 Q720 14 0 90 Z"
          className="text-arc"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
