"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  HONEYPOT_FIELD,
  MESSAGE_MAX_LENGTH,
  validateCallback,
  type CallbackErrors,
  type CallbackField,
} from "@/lib/callback-schema";
import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { focusBelowHeader } from "@/lib/focus";

type Status = "idle" | "sending" | "success" | "error";

const fieldOrder: CallbackField[] = ["nom", "telephone", "commune", "pourQui", "message", "consentement"];

const labels: Record<CallbackField, string> = {
  nom: "Votre nom",
  telephone: "Votre numéro de téléphone",
  commune: "Votre commune",
  pourQui: "Cette demande est",
  message: "Message",
  consentement: "Accord pour être rappelé",
};

const inputClass =
  "mt-2 block w-full rounded-2xl border-2 border-ink-soft bg-white px-4 py-3 text-lg text-ink placeholder:text-ink-soft aria-invalid:border-error aria-invalid:border-[3px]";

/**
 * Formulaire de demande de rappel.
 * - Avec JavaScript : validation zod, messages d'erreur reliés aux champs,
 *   récapitulatif des erreurs, envoi en fetch.
 * - Sans JavaScript : validation native du navigateur et envoi classique.
 */
export function CallbackForm() {
  // true une fois le JavaScript chargé : active la validation personnalisée.
  const enhanced = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<CallbackErrors>({});
  const [messageLength, setMessageLength] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") focusBelowHeader(successRef.current);
  }, [status]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());

    const result = validateCallback(raw);
    if (!result.success) {
      setErrors(result.errors);
      setStatus("idle");
      // Laisse React afficher le récapitulatif avant d'y placer le focus.
      requestAnimationFrame(() => focusBelowHeader(summaryRef.current));
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...result.data, [HONEYPOT_FIELD]: raw[HONEYPOT_FIELD] ?? "" }),
      });
      const body = (await response.json().catch(() => null)) as
        | { ok: boolean; errors?: CallbackErrors }
        | null;
      if (response.ok && body?.ok) {
        form.reset();
        setMessageLength(0);
        setStatus("success");
        return;
      }
      if (body?.errors) {
        setErrors(body.errors);
        setStatus("idle");
        requestAnimationFrame(() => focusBelowHeader(summaryRef.current));
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-3xl border-4 border-primary bg-lens-light p-8"
      >
        <div className="flex items-start gap-4">
          <CheckIcon className="mt-1 size-8 shrink-0 text-primary" />
          <div>
            <h2 className="text-xl text-ink">Merci, votre demande est bien envoyée</h2>
            <p className="mt-3 text-lg">
              Nous vous rappelons {site.contact.callbackDelay}. Si c&apos;est urgent, vous pouvez
              aussi nous appeler directement.
            </p>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row">
              <PhoneLink />
              <Button variant="secondary" onClick={() => setStatus("idle")}>
                Faire une autre demande
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const errorFields = fieldOrder.filter((field) => errors[field]);
  const describedBy = (field: CallbackField, hint?: string) =>
    cn(hint, errors[field] && `${field}-erreur`) || undefined;

  return (
    <form
      id="formulaire"
      action="/api/demande-rappel"
      method="post"
      noValidate={enhanced}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {errorFields.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-3xl border-4 border-error bg-white p-6"
        >
          <h2 className="text-2xl text-error">
            {errorFields.length === 1
              ? "Une information est à corriger"
              : `${errorFields.length} informations sont à corriger`}
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            {errorFields.map((field) => (
              <li key={field}>
                <a
                  href={`#${field === "pourQui" ? "pourQui-moi" : field}`}
                  className="font-bold text-error underline underline-offset-4"
                >
                  {errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {status === "error" ? (
        <div role="alert" className="rounded-3xl border-4 border-error bg-white p-6">
          <h2 className="text-2xl text-error">L&apos;envoi n&apos;a pas fonctionné</h2>
          <p className="mt-2">
            Votre demande n&apos;a pas pu être envoyée. Réessayez dans un instant, ou appelez-nous
            directement.
          </p>
          <div className="mt-4">
            <PhoneLink />
          </div>
        </div>
      ) : null}

      <p>Tous les champs sont obligatoires, sauf le message.</p>

      <div>
        <label htmlFor="nom" className="block text-lg font-bold">
          {labels.nom}
        </label>
        <input
          id="nom"
          name="nom"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          maxLength={100}
          aria-invalid={errors.nom ? true : undefined}
          aria-describedby={describedBy("nom")}
          className={inputClass}
        />
        <FieldError field="nom" message={errors.nom} />
      </div>

      <div>
        <label htmlFor="telephone" className="block text-lg font-bold">
          {labels.telephone}
        </label>
        <p id="telephone-aide" className="text-ink-soft">
          Par exemple : 06 12 34 56 78
        </p>
        <input
          id="telephone"
          name="telephone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          aria-invalid={errors.telephone ? true : undefined}
          aria-describedby={describedBy("telephone", "telephone-aide")}
          className={inputClass}
        />
        <FieldError field="telephone" message={errors.telephone} />
      </div>

      <div>
        <label htmlFor="commune" className="block text-lg font-bold">
          {labels.commune}
        </label>
        <input
          id="commune"
          name="commune"
          type="text"
          autoComplete="address-level2"
          required
          minLength={2}
          maxLength={100}
          aria-invalid={errors.commune ? true : undefined}
          aria-describedby={describedBy("commune")}
          className={inputClass}
        />
        <FieldError field="commune" message={errors.commune} />
      </div>

      <fieldset aria-describedby={describedBy("pourQui")}>
        <legend className="text-lg font-bold">{labels.pourQui}</legend>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          {[
            { value: "moi", label: "Pour moi" },
            { value: "proche", label: "Pour un proche" },
          ].map((option) => (
            <label
              key={option.value}
              htmlFor={`pourQui-${option.value}`}
              className="flex min-h-12 flex-1 cursor-pointer items-center gap-3 rounded-2xl border-2 border-ink-soft bg-white px-4 py-3 text-lg has-checked:border-[3px] has-checked:border-primary has-checked:bg-lens-light"
            >
              <input
                id={`pourQui-${option.value}`}
                type="radio"
                name="pourQui"
                value={option.value}
                required
                className="size-6 accent-primary"
              />
              {option.label}
            </label>
          ))}
        </div>
        <FieldError field="pourQui" message={errors.pourQui} />
      </fieldset>

      <div>
        <label htmlFor="message" className="block text-lg font-bold">
          {labels.message} <span className="font-normal">(facultatif)</span>
        </label>
        <p id="message-aide" className="text-ink-soft">
          Un mot sur votre demande ou vos disponibilités. Merci de ne pas indiquer
          d&apos;informations médicales : nous en parlerons de vive voix.
        </p>
        <textarea
          id="message"
          name="message"
          rows={3}
          maxLength={MESSAGE_MAX_LENGTH}
          onChange={(event) => setMessageLength(event.target.value.length)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message", "message-aide message-compteur")}
          className={inputClass}
        />
        <p id="message-compteur" className="mt-1 text-ink-soft">
          {messageLength} / {MESSAGE_MAX_LENGTH} caractères
        </p>
        <FieldError field="message" message={errors.message} />
      </div>

      {/* Piège anti-spam : masqué pour tout le monde, y compris les lecteurs d'écran */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>Ne pas remplir ce champ</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <div className="flex items-start gap-4">
          <input
            id="consentement"
            name="consentement"
            type="checkbox"
            required
            aria-invalid={errors.consentement ? true : undefined}
            aria-describedby={describedBy("consentement")}
            className="mt-1 size-7 shrink-0 cursor-pointer accent-primary"
          />
          <label htmlFor="consentement" className="cursor-pointer text-lg">
            J&apos;accepte que {site.name} utilise ces informations uniquement pour me rappeler
            au sujet de ma demande.
          </label>
        </div>
        <p className="mt-2 pl-11">
          <Link
            href="/politique-de-confidentialite"
            className="inline-flex min-h-12 items-center font-bold text-primary underline underline-offset-4 hover:text-primary-dark"
          >
            Lire la politique de confidentialité
          </Link>
        </p>
        <FieldError field="consentement" message={errors.consentement} />
      </div>

      <Button type="submit" size="lg" disabled={status === "sending"} className="w-full sm:w-auto disabled:opacity-70">
        {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande de rappel"}
      </Button>
    </form>
  );
}

function subscribeNoop() {
  return () => {};
}

function FieldError({ field, message }: { field: CallbackField; message?: string }) {
  if (!message) return null;
  return (
    <p id={`${field}-erreur`} className="mt-2 font-bold text-error">
      <span aria-hidden="true">⚠ </span>
      {message}
    </p>
  );
}
