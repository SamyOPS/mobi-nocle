import { getVisitType } from "@/content/rendez-vous";
import { capitalize, formatLongDay, formatWindow } from "@/lib/booking";
import type { BookingDraft, StepIndex } from "./draft";

type SummaryProps = {
  draft: BookingDraft;
  /** Si fourni, affiche un bouton « Modifier » par bloc */
  onEdit?: (step: StepIndex) => void;
};

type Block = {
  step: StepIndex;
  title: string;
  lines: string[];
};

function blocks(draft: BookingDraft): Block[] {
  const forRelative = draft.pourQui === "proche";
  const contact = [
    `${draft.patientNom} · ${draft.patientTelephone}`,
    ...(forRelative ? [`Rendez-vous pris par ${draft.demandeurNom} · ${draft.demandeurTelephone}`] : []),
    ...(draft.email ? [`E-mail : ${draft.email}`] : []),
    ...(draft.message ? [`Message : ${draft.message}`] : []),
  ];

  return [
    {
      step: 2,
      title: "Date",
      lines: draft.slot
        ? [capitalize(formatLongDay(draft.slot.date)), capitalize(formatWindow(draft.slot.start, draft.slot.end))]
        : [],
    },
    {
      step: 1,
      title: "Adresse",
      lines: [
        draft.rue,
        ...(draft.complement ? [draft.complement] : []),
        `${draft.codePostal} ${draft.commune}`,
      ],
    },
    {
      step: 0,
      title: "Motif",
      lines: [
        forRelative ? "Pour un proche" : "Pour moi",
        draft.visitType ? getVisitType(draft.visitType).label : "",
      ].filter(Boolean),
    },
    {
      step: 3,
      title: forRelative ? "Coordonnées" : "Vos coordonnées",
      lines: contact,
    },
  ];
}

/** Récapitulatif du rendez-vous, réutilisé à la vérification et à la confirmation. */
export function Summary({ draft, onEdit }: SummaryProps) {
  return (
    <dl className="divide-y-2 divide-lens overflow-hidden rounded-3xl border-2 border-lens bg-white">
      {blocks(draft).map((block) => (
        <div key={block.title} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
          <div>
            <dt className="font-display text-xl font-extrabold">{block.title}</dt>
            {block.lines.map((line) => (
              <dd key={line} className="mt-1 text-lg break-words">
                {line}
              </dd>
            ))}
          </div>
          {onEdit ? (
            <button
              type="button"
              onClick={() => onEdit(block.step)}
              className="inline-flex min-h-12 shrink-0 items-center self-start rounded-full px-2 font-bold text-primary underline underline-offset-4 hover:text-primary-dark"
            >
              Modifier<span className="sr-only"> : {block.title.toLowerCase()}</span>
            </button>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
