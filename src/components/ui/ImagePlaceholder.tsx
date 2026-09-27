import { cn } from "@/lib/cn";

type ImagePlaceholderProps = {
  /** Ce que la future photo devra montrer (sert aussi de base au texte alternatif) */
  label: string;
  width: number;
  height: number;
  className?: string;
};

/**
 * Emplacement neutre pour une photo à venir. À remplacer par <Image> de next/image
 * avec les mêmes dimensions et un texte alternatif rédigé à partir de `label`.
 */
export function ImagePlaceholder({ label, width, height, className }: ImagePlaceholderProps) {
  return (
    <div
      style={{ aspectRatio: `${width} / ${height}` }}
      className={cn(
        "flex w-full items-center justify-center rounded-3xl border-[3px] border-dashed border-arc bg-lens-light p-6 text-center",
        className,
      )}
    >
      <p className="text-base text-ink-soft">
        <span className="block font-bold">Photo à venir</span>
        {label}
        <span className="block">
          {width} × {height} px
        </span>
      </p>
    </div>
  );
}
