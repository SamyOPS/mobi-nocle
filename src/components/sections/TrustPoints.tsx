import { trustPoints } from "@/content/confiance";
import { IconBadge } from "./serviceIcons";

export function TrustPoints() {
  return (
    <ul className="grid gap-8 sm:grid-cols-2">
      {trustPoints.map((point) => (
        <li key={point.title} className="flex gap-5">
          <IconBadge icon={point.icon} />
          <div>
            <h3 className="text-xl text-ink">{point.title}</h3>
            <p className="mt-2">{point.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
