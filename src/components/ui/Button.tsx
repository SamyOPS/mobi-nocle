import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "light" | "outline-light";
type Size = "md" | "lg";

const base =
  "inline-flex min-h-12 items-center justify-center gap-3 rounded-full font-display font-extrabold no-underline transition-colors text-center";

const variants: Record<Variant, string> = {
  // blanc sur primary : 7.34:1, blanc sur primary-dark : 10.72:1
  primary: "bg-primary text-white hover:bg-primary-dark",
  // primary sur blanc : 7.34:1 ; bordure primary (contraste non textuel > 3:1)
  secondary:
    "border-[3px] border-primary bg-white text-primary hover:bg-lens-light hover:text-primary-dark",
  // Pour les fonds foncés (primary) : ink sur blanc
  light: "bg-white text-ink hover:bg-lens-light",
  // Pour les fonds foncés : blanc sur primary 7.34:1
  "outline-light": "border-[3px] border-white bg-transparent text-white hover:bg-primary-dark",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-2 text-lg",
  lg: "px-8 py-3 text-xl",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: Omit<CommonProps, "children">) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = CommonProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

/** Lien stylé en bouton. Les liens externes et tel: utilisent une balise <a> native. */
export function ButtonLink({ href, variant, size, className, children, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  );
}

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function Button({ variant, size, className, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}
