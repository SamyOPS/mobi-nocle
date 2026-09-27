import { cn } from "@/lib/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
};

export function Card({ children, className, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-3xl border border-lens bg-white p-6 shadow-card sm:p-8",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
