import type { ServiceIcon } from "@/content/services";
import type { TrustIcon } from "@/content/confiance";
import {
  ClockIcon,
  EuroIcon,
  EyeIcon,
  GlassesIcon,
  HeartIcon,
  HomeIcon,
  WrenchIcon,
} from "@/components/ui/icons";

export const contentIcons: Record<ServiceIcon | TrustIcon, (props: { className?: string }) => React.ReactNode> = {
  glasses: GlassesIcon,
  eye: EyeIcon,
  wrench: WrenchIcon,
  home: HomeIcon,
  clock: ClockIcon,
  heart: HeartIcon,
  euro: EuroIcon,
};

/** Pastille ronde contenant une icône, façon verre de lunettes. */
export function IconBadge({ icon }: { icon: ServiceIcon | TrustIcon }) {
  const Icon = contentIcons[icon];
  return (
    <span className="inline-flex size-14 items-center justify-center rounded-full border-4 border-ink bg-lens-light text-primary">
      <Icon className="size-7" />
    </span>
  );
}
