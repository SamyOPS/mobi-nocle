import { cn } from "@/lib/cn";
import { Container } from "./Container";

export type SectionTone = "white" | "lens-light" | "lens";

const toneClasses: Record<SectionTone, string> = {
  white: "bg-white",
  "lens-light": "bg-lens-light",
  lens: "bg-lens",
};

type SectionProps = {
  children: React.ReactNode;
  tone?: SectionTone;
  /** id du titre de la section, pour aria-labelledby */
  labelledBy?: string;
  id?: string;
  className?: string;
  containerSize?: "default" | "narrow";
};

export function Section({
  children,
  tone = "white",
  labelledBy,
  id,
  className,
  containerSize,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-16 sm:py-20", toneClasses[tone], className)}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
