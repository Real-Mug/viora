"use client";

import type { ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes, InputHTMLAttributes } from "react";
import { useId } from "react";

import { cn } from "@/lib/cn";

/**
 * Accessible form field primitives.
 *
 * Every control gets: a real <label> tied by id, hint and error text wired
 * through aria-describedby, aria-invalid when in error, and a visible focus
 * ring from the global stylesheet. Errors are rendered in text, never by colour
 * alone.
 */

const controlBase =
  "w-full rounded-xl border bg-surface-raised px-3.5 text-base sm:text-[0.9375rem] text-ink placeholder:text-linen-500 " +
  "transition-colors duration-200 hover:border-line-strong focus:border-evergreen-700 " +
  "disabled:cursor-not-allowed disabled:opacity-60";

function describedBy(ids: (string | false | undefined)[]): string | undefined {
  const list = ids.filter(Boolean).join(" ");
  return list || undefined;
}

export function FieldShell({
  id,
  label,
  hint,
  error,
  required,
  children,
  className,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? (
          <span className="text-danger" aria-hidden="true">
            {" *"}
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-normal text-ink-subtle">(optional)</span>
        )}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="text-[0.8125rem] leading-snug text-ink-subtle">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-[0.8125rem] font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type BaseProps = {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  className?: string;
};

export function TextField({
  label,
  name,
  hint,
  error,
  className,
  required,
  ...props
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  const generated = useId();
  const id = props.id ?? `${name}-${generated}`;

  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required} className={className}>
      <input
        {...props}
        id={id}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy([hint && `${id}-hint`, error && `${id}-error`])}
        className={cn(controlBase, "h-11", error && "border-danger")}
      />
    </FieldShell>
  );
}

export function TextAreaField({
  label,
  name,
  hint,
  error,
  className,
  required,
  ...props
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const generated = useId();
  const id = props.id ?? `${name}-${generated}`;

  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required} className={className}>
      <textarea
        {...props}
        id={id}
        name={name}
        required={required}
        rows={props.rows ?? 5}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy([hint && `${id}-hint`, error && `${id}-error`])}
        className={cn(controlBase, "resize-y py-2.5", error && "border-danger")}
      />
    </FieldShell>
  );
}

export function SelectField({
  label,
  name,
  hint,
  error,
  className,
  required,
  options,
  placeholder,
  ...props
}: BaseProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: { value: string; label: string }[];
    placeholder?: string;
  }) {
  const generated = useId();
  const id = props.id ?? `${name}-${generated}`;

  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required} className={className}>
      <select
        {...props}
        id={id}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy([hint && `${id}-hint`, error && `${id}-error`])}
        className={cn(controlBase, "h-11", error && "border-danger")}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

export function RadioGroupField({
  label,
  name,
  options,
  value,
  onChange,
  error,
  hint,
  required,
  className,
}: BaseProps & {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  const id = useId();

  return (
    <fieldset
      className={cn("grid gap-2", className)}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy([hint && `${id}-hint`, error && `${id}-error`])}
    >
      <legend className="text-sm font-medium text-ink">
        {label}
        {required ? (
          <span className="text-danger" aria-hidden="true">
            {" *"}
          </span>
        ) : null}
      </legend>
      {hint ? (
        <p id={`${id}-hint`} className="text-[0.8125rem] text-ink-subtle">
          {hint}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 py-2",
                "text-base sm:min-h-0 sm:text-[0.9375rem] transition-colors",
                checked
                  ? "border-evergreen-800 bg-evergreen-50 text-evergreen-900"
                  : "border-line text-ink-muted hover:border-line-strong",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="h-5 w-5 accent-evergreen-800 sm:h-4 sm:w-4"
              />
              {option.label}
            </label>
          );
        })}
      </div>

      {error ? (
        <p id={`${id}-error`} className="text-[0.8125rem] font-medium text-danger">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

export function CheckboxField({
  label,
  name,
  checked,
  onChange,
  error,
  children,
}: {
  label?: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  children: ReactNode;
}) {
  const id = useId();

  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="flex min-h-11 cursor-pointer items-start gap-3 py-1.5 text-[0.875rem] leading-relaxed text-ink-muted sm:min-h-0 sm:py-0">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-line-strong accent-evergreen-800 sm:h-4 sm:w-4"
        />
        <span>
          {label ? <span className="sr-only">{label}</span> : null}
          {children}
        </span>
      </label>
      {error ? (
        <p id={`${id}-error`} className="ml-7 text-[0.8125rem] font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Honeypot: hidden from sighted users, hidden from screen readers, and skipped
 * in the tab order. A human never fills this in; automated scripts usually do.
 */
export function Honeypot({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
      <label htmlFor="website">Website</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

/** Summary of errors, announced on submit and linking to each bad field. */
export function ErrorSummary({ errors }: { errors: Record<string, string[]> }) {
  const entries = Object.entries(errors);
  if (!entries.length) return null;

  return (
    <div
      role="alert"
      tabIndex={-1}
      className="rounded-[var(--radius-card)] border border-danger/35 bg-danger/5 p-4"
    >
      <p className="text-sm font-semibold text-danger">
        There {entries.length === 1 ? "is 1 problem" : `are ${entries.length} problems`} with this form
      </p>
      <ul className="mt-2 grid gap-1 text-sm text-danger">
        {entries.map(([field, messages]) => (
          <li key={field}>{messages[0]}</li>
        ))}
      </ul>
    </div>
  );
}
