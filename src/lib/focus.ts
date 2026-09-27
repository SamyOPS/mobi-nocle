/**
 * Place le focus sur un élément en le faisant défiler juste sous le header
 * collant (grâce à scroll-padding-top). Défilement immédiat, sans animation.
 */
export function focusBelowHeader(element: HTMLElement | null) {
  if (!element) return;
  element.scrollIntoView({ block: "start", behavior: "instant" });
  element.focus({ preventScroll: true });
}
