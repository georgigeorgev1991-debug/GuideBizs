import type { InputHTMLAttributes, ReactNode } from "react";

type FieldProps = {
  label: string;
  hint?: ReactNode;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Field({
  label,
  hint,
  error,
  id,
  className = "",
  ...props
}: FieldProps) {
  const fieldId = id ?? props.name;

  return (
    <div className={className}>
      <label htmlFor={fieldId} className="block text-sm">
        {label}
      </label>
      <input
        id={fieldId}
        className="mt-2 min-h-11 w-full border border-glacier/40 bg-granite px-3 text-base text-snowfield"
        aria-invalid={error ? true : undefined}
        aria-describedby={
          error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined
        }
        {...props}
      />
      {hint ? (
        <p id={`${fieldId}-hint`} className="mt-2 text-xs opacity-80">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${fieldId}-error`} className="mt-2 text-sm text-blaze-ui" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
