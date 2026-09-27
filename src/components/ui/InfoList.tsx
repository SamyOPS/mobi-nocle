import { A_COMPLETER } from "@/config/site";

/** Liste simple issue de la config ; affiche « À COMPLÉTER » tant qu'elle est vide. */
export function InfoList({ items }: { items: readonly string[] }) {
  if (items.length === 0) return <p>{A_COMPLETER}</p>;
  return (
    <ul className="list-disc space-y-2 pl-6 marker:text-primary">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
