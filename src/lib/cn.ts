type ClassValue = string | number | null | undefined | false | ClassValue[];

/**
 * Minimal class-name joiner.
 *
 * Deliberately not clsx + tailwind-merge: the component library here composes
 * classes in one direction (base then variant then caller override) and never
 * needs conflict resolution, so two dependencies are not worth the bytes.
 */
export function cn(...values: ClassValue[]): string {
  const out: string[] = [];
  for (const value of values) {
    if (!value) continue;
    if (Array.isArray(value)) {
      const nested = cn(...value);
      if (nested) out.push(nested);
    } else {
      out.push(String(value));
    }
  }
  return out.join(" ");
}
