import { cn } from "@/lib/cn";

/** Mise en forme des textes longs (pages légales, paragraphes explicatifs). */
export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-5",
        "[&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:text-ink [&_h3]:mt-8 [&_h3]:text-2xl [&_h3]:text-ink",
        "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_li]:marker:text-primary",
        "[&_a]:font-bold [&_a]:text-primary [&_a]:underline [&_a:hover]:text-primary-dark",
        className,
      )}
    >
      {children}
    </div>
  );
}
