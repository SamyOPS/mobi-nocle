import Link from "next/link";
import { frTypo } from "@/lib/typo";
import type { FaqItem } from "@/content/faq";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * Accordéon accessible sans JavaScript : <details>/<summary> natifs,
 * utilisables au clavier (Entrée / Espace) et annoncés par les lecteurs d'écran.
 */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-3xl border-2 border-lens bg-white shadow-card open:border-arc"
        >
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-3xl px-5 py-3 font-display text-lg font-extrabold text-ink hover:bg-lens-light sm:text-xl [&::-webkit-details-marker]:hidden">
            <span>{frTypo(item.question)}</span>
            {/* Indicateur visuel ouvert / fermé, en forme de verre */}
            <span
              aria-hidden="true"
              className="relative flex size-9 shrink-0 items-center justify-center rounded-full border-4 border-ink bg-lens-light"
            >
              <span className="absolute h-1 w-4 rounded bg-ink" />
              <span className="absolute h-4 w-1 rounded bg-ink group-open:hidden" />
            </span>
          </summary>
          <div className="space-y-3 px-5 pb-5">
            {item.answer.map((paragraph) => (
              <p key={paragraph}>{frTypo(paragraph)}</p>
            ))}
            {item.link ? (
              <Link
                href={item.link.href}
                className="inline-flex min-h-12 items-center gap-2 font-bold text-primary underline underline-offset-4 hover:text-primary-dark"
              >
                {item.link.label}
                <ArrowRightIcon className="size-5" />
              </Link>
            ) : null}
          </div>
        </details>
      ))}
    </div>
  );
}
