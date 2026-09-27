import Image, { getImageProps } from "next/image";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Fichiers du logo.
 * - Pour passer au SVG : déposer le fichier dans public/images/ et changer `src`
 *   (dimensions = viewBox du SVG). Les SVG ne passent pas par l'optimiseur
 *   d'images : garder `unoptimized: true` dans ce cas.
 * - `compact` : version réduite pour mobile. Tant qu'elle n'est pas fournie,
 *   `null` => le logo principal est utilisé partout.
 */
const logoAssets = {
  full: { src: "/images/logo-mobinocle.png", width: 785, height: 318, unoptimized: false },
  compact: null as null | { src: string; width: number; height: number; unoptimized: boolean },
};

/** Point de bascule entre logo compact et logo principal (breakpoint « sm » de Tailwind). */
const COMPACT_MAX_WIDTH = "(max-width: 639px)";

type LogoProps = {
  className?: string;
  /** Logo au-dessus de la ligne de flottaison (header) : chargement prioritaire */
  eager?: boolean;
};

export function Logo({ className, eager = false }: LogoProps) {
  const alt = `${site.name}, opticien à domicile`;
  const common = { sizes: "240px", loading: eager ? ("eager" as const) : ("lazy" as const) };

  if (!logoAssets.compact) {
    return <Image {...common} {...logoAssets.full} alt={alt} className={cn("h-auto", className)} />;
  }

  // Art direction documentée par Next.js : <picture> + getImageProps
  const {
    props: { srcSet: fullSrcSet, ...imgProps },
  } = getImageProps({ ...common, ...logoAssets.full, alt });

  const {
    props: { srcSet: compactSrcSet },
  } = getImageProps({ ...common, ...logoAssets.compact, alt });

  return (
    <picture>
      <source media={COMPACT_MAX_WIDTH} srcSet={compactSrcSet} />
      <img {...imgProps} srcSet={fullSrcSet} alt={alt} className={cn("h-auto", className)} />
    </picture>
  );
}
