import { site } from "@/config/site";

/**
 * Avertissement affiché tant que la prise de rendez-vous fonctionne avec des
 * créneaux fictifs (site.booking.demoMode). Indispensable si le site est mis
 * en ligne avant le branchement de la vraie API.
 */
export function DemoBanner() {
  if (!site.booking.demoMode) return null;
  return (
    <div className="mb-8 rounded-3xl border-2 border-dashed border-ink bg-lens p-5">
      <p className="text-lg font-bold">Démonstration : aucun rendez-vous ne sera enregistré.</p>
      <p className="mt-1">
        Les créneaux affichés sont fictifs. Pour prendre rendez-vous, appelez-nous au{" "}
        {site.contact.phoneDisplay}.
      </p>
    </div>
  );
}
