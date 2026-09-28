import Image from "next/image";
import type { Photo } from "@/content/photos";
import { cn } from "@/lib/cn";

type PhotoImageProps = {
  photo: Photo;
  className?: string;
  /** Largeurs d'affichage, pour que le navigateur télécharge la bonne taille */
  sizes?: string;
  eager?: boolean;
};

/** Photo d'illustration aux coins arrondis, optimisée par next/image. */
export function PhotoImage({ photo, className, sizes = "(min-width: 1024px) 50vw, 100vw", eager = false }: PhotoImageProps) {
  return (
    <Image
      src={photo.src}
      width={photo.width}
      height={photo.height}
      alt={photo.alt}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      className={cn("h-auto w-full rounded-3xl object-cover", className)}
    />
  );
}
