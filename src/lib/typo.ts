/**
 * Typographie française : espace insécable avant ? ! : ; pour éviter
 * qu'un signe se retrouve seul en début de ligne.
 */
export function frTypo(text: string): string {
  return text.replace(/ ([?!:;»])/g, " $1").replace(/« /g, "« ");
}
