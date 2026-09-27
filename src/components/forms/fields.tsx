import { cn } from "@/lib/cn";

/** Briques de formulaire accessibles, partagées par les formulaires du site. */

export const inputClass =
  "mt-2 block w-full rounded-2xl border-2 border-ink-soft bg-white px-4 py-3 text-lg text-ink placeholder:text-ink-soft aria-invalid:border-[3px] aria-invalid:border-error";

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 font-bold text-error">
      <span aria-hidden="true">⚠ </span>
      {message}
    </p>
  );
}

/** Concatène les id d'aide et d'erreur pour aria-describedby. */
export function describedBy(...ids: Array<string | false | undefined>): string | undefined {
  return cn(...ids) || undefined;
}

type TextFieldProps = {
  id: string;
  label: React.ReactNode;
  hint?: React.ReactNode;
  error?: string;
  optional?: boolean;
  multiline?: boolean;
  /** Texte discret sous le champ (ex. compteur de caractères) */
  footer?: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "value" | "onChange" | "className">;

/** Champ texte avec libellé, aide et message d'erreur reliés. */
export function TextField({
  id,
  label,
  hint,
  error,
  optional = false,
  multiline = false,
  footer,
  value,
  onChange,
  ...rest
}: TextFieldProps) {
  const hintId = hint ? `${id}-aide` : undefined;
  const errorId = `${id}-erreur`;
  const common = {
    id,
    name: id,
    value,
    required: !optional,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy(hintId, error && errorId),
    className: inputClass,
  } as const;

  return (
    <div>
      <label htmlFor={id} className="block text-lg font-bold">
        {label}
        {optional ? <span className="font-normal"> (facultatif)</span> : null}
      </label>
      {hint ? (
        <p id={hintId} className="text-ink-soft">
          {hint}
        </p>
      ) : null}
      {multiline ? (
        <textarea
          {...common}
          rows={3}
          maxLength={rest.maxLength}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input {...rest} {...common} onChange={(event) => onChange(event.target.value)} />
      )}
      {footer ? <p className="mt-1 text-ink-soft">{footer}</p> : null}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

export type ChoiceOption<T extends string> = {
  value: T;
  label: React.ReactNode;
  description?: React.ReactNode;
};

type ChoiceCardsProps<T extends string> = {
  name: string;
  legend: React.ReactNode;
  options: ChoiceOption<T>[];
  value: T | undefined;
  onChange: (value: T) => void;
  error?: string;
  columns?: 1 | 2;
  /** Pour un titre de fieldset plus discret */
  legendClassName?: string;
};

/** Groupe de boutons radio présentés en grandes cartes cliquables. */
export function ChoiceCards<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  columns = 1,
  legendClassName,
}: ChoiceCardsProps<T>) {
  const errorId = `${name}-erreur`;
  return (
    <fieldset aria-describedby={describedBy(error && errorId)}>
      <legend className={cn("text-xl font-bold", legendClassName)}>{legend}</legend>
      <div className={cn("mt-3 grid gap-3", columns === 2 && "sm:grid-cols-2")}>
        {options.map((option) => {
          const id = `${name}-${option.value}`;
          return (
            <label
              key={option.value}
              htmlFor={id}
              className="flex min-h-12 cursor-pointer items-start gap-4 rounded-2xl border-2 border-ink-soft bg-white px-4 py-4 text-lg hover:bg-lens-light has-checked:border-[3px] has-checked:border-primary has-checked:bg-lens-light has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-ink"
            >
              <input
                id={id}
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                className="mt-1 size-6 shrink-0 accent-primary focus-visible:shadow-none focus-visible:outline-none"
              />
              <span>
                <span className="block font-bold">{option.label}</span>
                {option.description ? (
                  <span className="mt-1 block text-ink-soft">{option.description}</span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}

type ErrorSummaryProps = {
  errors: Array<{ fieldId: string; message: string }>;
  ref?: React.Ref<HTMLDivElement>;
};

/** Récapitulatif des erreurs, placé en haut du formulaire et focalisé à l'envoi. */
export function ErrorSummary({ errors, ref }: ErrorSummaryProps) {
  if (errors.length === 0) return null;
  return (
    <div ref={ref} tabIndex={-1} role="alert" className="rounded-3xl border-4 border-error bg-white p-6">
      <h3 className="text-2xl text-error">
        {errors.length === 1
          ? "Une information est à corriger"
          : `${errors.length} informations sont à corriger`}
      </h3>
      <ul className="mt-3 list-disc space-y-1 pl-6">
        {errors.map((error) => (
          <li key={error.fieldId}>
            <a href={`#${error.fieldId}`} className="font-bold text-error underline underline-offset-4">
              {error.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
