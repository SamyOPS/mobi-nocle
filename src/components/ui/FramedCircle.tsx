import { cn } from "@/lib/cn";

type FramedCircleProps = {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizes = {
  sm: "size-14 border-[5px] text-2xl",
  md: "size-20 border-[6px] text-3xl",
  lg: "size-40 border-8",
  xl: "size-64 border-[10px] sm:size-72",
};

/**
 * Cercle cerné d'un trait noir épais, comme une monture de lunettes ronde.
 * Sert pour les numéros d'étapes et le portrait de l'opticien.
 * Le reflet en haut à gauche rappelle les verres du logo.
 */
export function FramedCircle({ children, size = "md", className }: FramedCircleProps) {
  return (
    <div
      className={cn(
        "relative isolate flex shrink-0 items-center justify-center overflow-hidden rounded-full border-ink bg-lens-light font-display font-black text-ink",
        sizes[size],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[14%] top-[10%] -z-10 h-[22%] w-[38%] -rotate-[25deg] rounded-full bg-white/80"
      />
      {children}
    </div>
  );
}
