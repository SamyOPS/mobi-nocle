import { HONEYPOT_FIELD, validateCallback } from "@/lib/callback-schema";

/**
 * Réception des demandes de rappel.
 *
 * - Appel en JavaScript (fetch, JSON) : répond en JSON.
 * - Envoi classique du formulaire (sans JavaScript) : redirige vers
 *   la page de confirmation, ou vers le formulaire en cas d'erreur.
 *
 * Aucune donnée personnelle n'est journalisée.
 */
export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  let raw: unknown;
  try {
    raw = isJson ? await request.json() : Object.fromEntries((await request.formData()).entries());
  } catch {
    raw = null;
  }
  if (!isPlainObject(raw)) {
    return respond(isJson, request, 400, { ok: false, error: "Requête invalide." });
  }

  // Piège anti-spam : un humain ne voit pas ce champ. S'il est rempli,
  // on fait comme si tout s'était bien passé, sans rien traiter.
  const honeypot = raw[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return respond(isJson, request, 200, { ok: true });
  }

  const result = validateCallback(raw);
  if (!result.success) {
    return respond(isJson, request, 400, { ok: false, errors: result.errors });
  }

  // TODO(envoi) : transmettre la demande à Mobi'Nocle.
  // Brancher ici le service choisi (e-mail transactionnel type Resend / Brevo,
  // SMS, CRM…) avec `result.data` : { nom, telephone, commune, pourQui, message }.
  // Penser à :
  //   - stocker la clé d'API dans une variable d'environnement Vercel ;
  //   - ajouter une limitation du nombre de requêtes (rate limiting) ;
  //   - renvoyer une erreur 502 si l'envoi échoue, pour que le formulaire
  //     propose d'appeler directement.

  return respond(isJson, request, 200, { ok: true });
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function respond(
  isJson: boolean,
  request: Request,
  status: number,
  body: Record<string, unknown>,
): Response {
  if (isJson) return Response.json(body, { status });
  const target = status === 200 ? "/contact/merci" : "/contact/erreur";
  return Response.redirect(new URL(target, request.url), 303);
}
