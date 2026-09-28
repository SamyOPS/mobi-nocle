import Image from "next/image";
import type { Photo } from "@/content/photos";
import { FramedCircle } from "@/components/ui/FramedCircle";

type CirclePhotoProps = {
  /** Ce que la photo devra montrer (affiché tant qu'aucune photo n'est fournie) */
  label: string;
  size?: "lg" | "xl";
  /** Photo carrée ; sans photo, un emplacement neutre est affiché */
  photo?: Photo;
  eager?: boolean;
};

/**
 * Photo dans un cercle façon monture, avec un léger reflet de verre.
 * Photo attendue : carrée, 600 × 600 px minimum, sujet centré.
 */
export function CirclePhoto({ label, size = "xl", photo, eager = false }: CirclePhotoProps) {
  if (photo) {
    return (
      <FramedCircle size={size}>
        <Image
          src={photo.src}
          width={photo.width}
          height={photo.height}
          alt={photo.alt}
          sizes={size === "xl" ? "(min-width: 640px) 240px, 208px" : "128px"}
          loading={eager ? "eager" : "lazy"}
          className="absolute inset-0 size-full object-cover"
        />
        {/* Reflet façon verre de lunettes, par-dessus la photo */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[14%] top-[10%] h-[22%] w-[38%] -rotate-[25deg] rounded-full bg-white/35"
        />
      </FramedCircle>
    );
  }

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
