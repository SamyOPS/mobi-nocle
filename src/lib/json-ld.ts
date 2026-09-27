/**
 * Sérialisation sûre du JSON-LD (recommandation Next.js) :
 * `<` est échappé pour empêcher toute fermeture prématurée de la balise <script>.
 */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\u003c");
}
