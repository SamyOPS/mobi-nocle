import { FramedCircle } from "@/components/ui/FramedCircle";

type CirclePhotoProps = {
  /** Ce que la photo devra montrer */
  label: string;
  size?: "lg" | "xl";
};

/**
 * Emplacement photo dans un cercle façon monture.
 * Photo à fournir : carrée, 600 × 600 px minimum, sujet centré.
 * Remplacer le contenu par <Image src=… width={600} height={600} alt="…" className="size-full object-cover" />.
 */
export function CirclePhoto({ label, size = "xl" }: CirclePhotoProps) {
  return (
    <FramedCircle size={size}>
      <span className="px-6 text-center font-sans text-base font-normal leading-snug text-ink-soft">
        <span className="block font-bold">Photo à venir</span>
        {size === "xl" ? (
          <>
            {label}
            <span className="block">600 × 600 px</span>
          </>
        ) : null}
      </span>
    </FramedCircle>
  );
}
