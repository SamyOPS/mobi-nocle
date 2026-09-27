# Mobi'Nocle — site vitrine

Site de Mobi'Nocle, opticien à domicile. Next.js 16 (App Router), TypeScript strict, Tailwind CSS v4. Toutes les pages sont générées statiquement, sauf la route `/api/demande-rappel`.

## Démarrer

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Où modifier quoi

| Quoi | Où |
|---|---|
| Informations de l'entreprise (téléphone, horaires, zone, tarifs, mentions légales…) | `src/config/site.ts` |
| Menus et liste des pages (sitemap) | `src/config/navigation.ts` |
| Textes des étapes, services, points de confiance, FAQ | `src/content/*.ts` |
| Couleurs, polices, styles de base | `src/app/globals.css` (bloc `@theme`) |
| Logo (version compacte mobile, passage au SVG) | `src/components/brand/Logo.tsx` |
| Envoi des demandes de rappel | `src/app/api/demande-rappel/route.ts` (voir le `TODO(envoi)`) |
| Prise de rendez-vous : plages, jours, délai, mode démo | `site.booking` dans `src/config/site.ts` |
| Prise de rendez-vous : branchement de la vraie API | `src/lib/booking/index.ts` (voir le `TODO(api-rdv)`), contrat dans `src/lib/booking/types.ts` |
| Types de visite proposés | `src/content/rendez-vous.ts` |

Toute valeur encore inconnue vaut `A_COMPLETER` et s'affiche « À COMPLÉTER » sur le site. Pour tout retrouver :

```bash
grep -rn "A_COMPLETER\|À COMPLÉTER\|BROUILLON\|TODO" src
```

Les valeurs non renseignées sont retirées automatiquement des données structurées (JSON-LD).

## Structure

```
src/
  app/            pages, layout, sitemap.ts, robots.ts, api/demande-rappel
  components/
    brand/        Logo
    layout/       Header, MobileMenu, Footer, SkipLink, NavLink
    ui/           Button, PhoneLink, Card, Section, ArcDivider, FramedCircle…
    sections/     blocs de page (étapes, services, FAQ, appel à l'action…)
    forms/        CallbackForm (seul formulaire, composant client)
    seo/          JsonLd
  config/         site.ts, navigation.ts
  content/        textes éditables
  lib/            métadonnées, JSON-LD, schéma zod, utilitaires
```

## Accessibilité

Objectif WCAG 2.1 AA :
- texte à 18 px minimum (taille racine à 112,5 %) ;
- zones cliquables de 48 px minimum ;
- focus toujours visible et lien d'évitement ;
- aucune animation automatique, et `prefers-reduced-motion` respecté.

Les contrastes de chaque couple de couleurs sont calculés et notés en tête de `globals.css`. La couleur `arc` (#6F96B3) est réservée aux éléments décoratifs : ne jamais l'utiliser pour du texte.

## Déploiement

Prévu sur Vercel. Tant que `site.url` n'est pas renseigné, les URL absolues (sitemap, Open Graph, JSON-LD) utilisent `VERCEL_PROJECT_PRODUCTION_URL`, puis `http://localhost:3000` en dernier recours.
