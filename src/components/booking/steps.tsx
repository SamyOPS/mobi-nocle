import Link from "next/link";
import { site } from "@/config/site";
import { visitTypes, type VisitTypeId } from "@/content/rendez-vous";
import { MESSAGE_MAX_LENGTH, type FieldErrors } from "@/lib/booking/schema";
import { ChoiceCards, FieldError, TextField } from "@/components/forms/fields";
import type { BookingDraft } from "./draft";

export type StepProps = {
  draft: BookingDraft;
  update: (patch: Partial<BookingDraft>) => void;
  errors: FieldErrors;
};

/* ---------- Étape 1 : pour qui et pourquoi ---------- */

export function StepVisit({ draft, update, errors }: StepProps) {
  return (
    <div className="space-y-10">
      <ChoiceCards
        name="pourQui"
        legend="Le rendez-vous est :"
        columns={2}
        value={draft.pourQui}
        onChange={(pourQui) => update({ pourQui })}
        error={errors.pourQui}
        options={[
          { value: "moi", label: "Pour moi" },
          { value: "proche", label: "Pour un proche", description: "Un parent, un voisin, une personne que vous aidez…" },
        ]}
      />
      <ChoiceCards<VisitTypeId>
        name="visitType"
        legend="Quel est le motif de la visite ?"
        value={draft.visitType}
        onChange={(visitType) => update({ visitType })}
        error={errors.visitType}
        options={visitTypes.map((type) => ({
          value: type.id,
          label: type.label,
          description: type.description,
        }))}
      />
    </div>
  );
}

/* ---------- Étape 2 : adresse ---------- */

export function StepAddress({ draft, update, errors }: StepProps) {
  const forRelative = draft.pourQui === "proche";
  const { communes } = site.zone;
  const outsideZone =
    communes.length > 0 &&
    /^\d{5}$/.test(draft.codePostal) &&
    !communes.some((commune) => commune.postalCode === draft.codePostal);

  return (
    <div className="space-y-6">
      <p className="text-lg">
        {forRelative
          ? "Indiquez l'adresse de votre proche, là où l'opticien se rendra."
          : "Indiquez l'adresse où l'opticien viendra vous voir."}
      </p>
      <TextField
        id="rue"
        label="Numéro et rue"
        hint="Par exemple : 12 rue des Lilas"
        autoComplete={forRelative ? "off" : "address-line1"}
        maxLength={200}
        value={draft.rue}
        onChange={(rue) => update({ rue })}
        error={errors.rue}
      />
      <TextField
        id="complement"
        label="Complément d'adresse"
        hint="Étage, bâtiment, digicode, nom de la résidence…"
        optional
        autoComplete={forRelative ? "off" : "address-line2"}
        maxLength={200}
        value={draft.complement}
        onChange={(complement) => update({ complement })}
        error={errors.complement}
      />
      <div className="grid gap-6 sm:grid-cols-[12rem_1fr]">
        <TextField
          id="codePostal"
          label="Code postal"
          inputMode="numeric"
          autoComplete={forRelative ? "off" : "postal-code"}
          value={draft.codePostal}
          // Chiffres uniquement : « 69 003 » collé devient « 69003 »
          onChange={(codePostal) => update({ codePostal: codePostal.replace(/\D/g, "").slice(0, 5) })}
          error={errors.codePostal}
        />
        <TextField
          id="commune"
          label="Commune"
          autoComplete={forRelative ? "off" : "address-level2"}
          maxLength={100}
          value={draft.commune}
          onChange={(commune) => update({ commune })}
          error={errors.commune}
        />
      </div>
      {outsideZone ? (
        <div role="status" className="rounded-2xl border-2 border-arc bg-lens-light p-5">
          <p className="font-bold">Cette commune ne fait pas partie de notre zone habituelle.</p>
          <p className="mt-1">
            Vous pouvez continuer, ou nous appeler pour vérifier que nous pouvons nous déplacer.
          </p>
        </div>
      ) : null}
    </div>
  );
}

/* ---------- Étape 4 : coordonnées ---------- */

export function StepContact({ draft, update, errors }: StepProps) {
  const forRelative = draft.pourQui === "proche";
  return (
    <div className="space-y-10">
      <fieldset className="space-y-6">
        <legend className="text-xl font-bold">
          {forRelative ? "La personne qui recevra l'opticien" : "Vous"}
        </legend>
        <TextField
          id="patientNom"
          label={forRelative ? "Son prénom et son nom" : "Votre prénom et votre nom"}
          autoComplete={forRelative ? "off" : "name"}
          maxLength={100}
          value={draft.patientNom}
          onChange={(patientNom) => update({ patientNom })}
          error={errors.patientNom}
        />
        <TextField
          id="patientTelephone"
          type="tel"
          inputMode="tel"
          label={forRelative ? "Son numéro de téléphone" : "Votre numéro de téléphone"}
          hint="Par exemple : 06 12 34 56 78"
          autoComplete={forRelative ? "off" : "tel"}
          value={draft.patientTelephone}
          onChange={(patientTelephone) => update({ patientTelephone })}
          error={errors.patientTelephone}
        />
      </fieldset>

      {forRelative ? (
        <fieldset className="space-y-6">
          <legend className="text-xl font-bold">Vous, qui prenez le rendez-vous</legend>
          <p>Nous vous contacterons si besoin, par exemple en cas de changement d&apos;horaire.</p>
          <TextField
            id="demandeurNom"
            label="Votre prénom et votre nom"
            autoComplete="name"
            maxLength={100}
            value={draft.demandeurNom}
            onChange={(demandeurNom) => update({ demandeurNom })}
            error={errors.demandeurNom}
          />
          <TextField
            id="demandeurTelephone"
            type="tel"
            inputMode="tel"
            label="Votre numéro de téléphone"
            hint="Par exemple : 06 12 34 56 78"
            autoComplete="tel"
            value={draft.demandeurTelephone}
            onChange={(demandeurTelephone) => update({ demandeurTelephone })}
            error={errors.demandeurTelephone}
          />
        </fieldset>
      ) : null}

      <TextField
        id="email"
        type="email"
        label="Votre adresse e-mail"
        hint="Pour recevoir la confirmation du rendez-vous."
        optional
        autoComplete="email"
        maxLength={200}
        value={draft.email}
        onChange={(email) => update({ email: email.trim() })}
        error={errors.email}
      />

      <TextField
        id="message"
        multiline
        label="Un mot pour l'opticien"
        hint="Disponibilités, accès au logement, présence d'un proche… Merci de ne pas indiquer d'informations médicales : nous en parlerons de vive voix."
        optional
        maxLength={MESSAGE_MAX_LENGTH}
        value={draft.message}
        onChange={(message) => update({ message })}
        error={errors.message}
        footer={`${draft.message.length} / ${MESSAGE_MAX_LENGTH} caractères`}
      />
    </div>
  );
}

/* ---------- Case de consentement (récapitulatif) ---------- */

export function ConsentField({ draft, update, errors }: StepProps) {
  return (
    <div>
      <div className="flex items-start gap-4">
        <input
          id="consentement"
          name="consentement"
          type="checkbox"
          checked={draft.consentement}
          onChange={(event) => update({ consentement: event.target.checked })}
          aria-invalid={errors.consentement ? true : undefined}
          aria-describedby={errors.consentement ? "consentement-erreur" : undefined}
          className="mt-1 size-7 shrink-0 cursor-pointer accent-primary"
        />
        <label htmlFor="consentement" className="cursor-pointer text-lg">
          J&apos;accepte que {site.name} utilise ces informations uniquement pour organiser ce
          rendez-vous.
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
      <FieldError id="consentement-erreur" message={errors.consentement} />
    </div>
  );
}
