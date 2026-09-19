import type { PricingRule } from "@/lib/types/property";
import type { GuestCount, Quote, QuoteLine, StayDates } from "@/lib/types/booking";

/**
 * Deterministic, offline quote calculation.
 *
 * This is real arithmetic over whatever pricing a property actually publishes;
 * it invents nothing. When a property has no `pricing` record the caller gets
 * `null` back and the UI says pricing is available on request.
 *
 * It runs identically on the server and in the browser, so the same function
 * can back a future /api/quote endpoint without being duplicated.
 */

const MS_PER_DAY = 86_400_000;

export function nightsBetween(dates: StayDates): number {
  const inMs = Date.parse(`${dates.checkIn}T00:00:00Z`);
  const outMs = Date.parse(`${dates.checkOut}T00:00:00Z`);
  if (Number.isNaN(inMs) || Number.isNaN(outMs)) return 0;
  return Math.max(0, Math.round((outMs - inMs) / MS_PER_DAY));
}

function toCents(dollars: number): number {
  return Math.round(dollars * 100);
}

/** Friday and Saturday nights carry the weekend rate where one is set. */
function isWeekend(date: Date): boolean {
  const day = date.getUTCDay();
  return day === 5 || day === 6;
}

/** Nightly rate for a single date, applying seasonal then weekend overrides. */
function rateForNight(rule: PricingRule, date: Date): number | undefined {
  const iso = date.toISOString().slice(0, 10);

  const seasonal = rule.seasonalRates?.find(
    (season) => iso >= season.startDate && iso <= season.endDate,
  );
  if (seasonal) return seasonal.nightlyRate;

  if (isWeekend(date) && rule.weekendNightlyRate != null) return rule.weekendNightlyRate;

  return rule.baseNightlyRate;
}

export function buildQuote(
  propertyId: string,
  rule: PricingRule | undefined,
  dates: StayDates,
  guests: GuestCount,
): Quote | null {
  if (!rule || rule.baseNightlyRate == null) return null;

  const nights = nightsBetween(dates);
  const issues: string[] = [];
  const lines: QuoteLine[] = [];

  if (nights <= 0) {
    issues.push("Select a check-out date after your check-in date.");
  }
  if (rule.minimumStayNights && nights > 0 && nights < rule.minimumStayNights) {
    issues.push(`This property has a ${rule.minimumStayNights}-night minimum stay.`);
  }
  if (rule.maximumStayNights && nights > rule.maximumStayNights) {
    issues.push(`This property accepts stays of up to ${rule.maximumStayNights} nights.`);
  }
  if (!rule.petsAllowed && guests.pets > 0) {
    issues.push("This property does not accept pets.");
  }

  // Accommodation is priced night by night so seasonal and weekend rates apply.
  let accommodationCents = 0;
  const start = new Date(`${dates.checkIn}T00:00:00Z`);
  for (let i = 0; i < nights; i += 1) {
    const night = new Date(start.getTime() + i * MS_PER_DAY);
    const rate = rateForNight(rule, night);
    if (rate == null) continue;
    accommodationCents += toCents(rate);
  }

  if (nights > 0) {
    lines.push({
      id: "accommodation",
      label: `${nights} ${nights === 1 ? "night" : "nights"}`,
      amountCents: accommodationCents,
      kind: "accommodation",
      detail: "Includes any seasonal or weekend rates that apply to these dates.",
    });
  }

  // Length-of-stay discounts: the longest qualifying discount wins.
  const totalGuests = guests.adults + guests.children;
  const weekly = rule.discounts?.find((d) => d.type === "weekly");
  const monthly = rule.discounts?.find((d) => d.type === "monthly");
  const applicable = nights >= 28 && monthly ? monthly : nights >= 7 && weekly ? weekly : undefined;
  if (applicable && accommodationCents > 0) {
    lines.push({
      id: `discount-${applicable.type}`,
      label: applicable.label,
      amountCents: -Math.round(accommodationCents * applicable.rate),
      kind: "discount",
    });
  }

  if (
    rule.guestsIncluded != null &&
    rule.additionalGuestFee != null &&
    totalGuests > rule.guestsIncluded
  ) {
    const extra = totalGuests - rule.guestsIncluded;
    lines.push({
      id: "additional-guests",
      label: `Additional guest fee (${extra} x ${nights} ${nights === 1 ? "night" : "nights"})`,
      amountCents: toCents(rule.additionalGuestFee) * extra * nights,
      kind: "fee",
    });
  }

  if (rule.cleaningFee != null) {
    lines.push({
      id: "cleaning",
      label: "Cleaning fee",
      amountCents: toCents(rule.cleaningFee),
      kind: "fee",
    });
  }

  if (rule.petFee != null && guests.pets > 0 && rule.petsAllowed) {
    lines.push({
      id: "pet-fee",
      label: `Pet fee (${guests.pets})`,
      amountCents: toCents(rule.petFee) * guests.pets,
      kind: "fee",
    });
  }

  const preServiceSubtotal = lines
    .filter((line) => line.kind !== "tax")
    .reduce((sum, line) => sum + line.amountCents, 0);

  if (rule.serviceFeeRate) {
    lines.push({
      id: "service-fee",
      label: "Service fee",
      amountCents: Math.round(preServiceSubtotal * rule.serviceFeeRate),
      kind: "fee",
    });
  }

  const subtotalCents = lines
    .filter((line) => line.kind !== "tax")
    .reduce((sum, line) => sum + line.amountCents, 0);

  let taxCents = 0;
  if (rule.taxRate) {
    taxCents = Math.round(subtotalCents * rule.taxRate);
    lines.push({ id: "tax", label: "Taxes", amountCents: taxCents, kind: "tax" });
  }

  return {
    propertyId,
    currency: "CAD",
    nights,
    lines,
    subtotalCents,
    taxCents,
    totalCents: subtotalCents + taxCents,
    issues,
  };
}

const CAD_ROUNDED = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
});

const CAD_PRECISE = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" });

export function formatCents(cents: number, precise = true): string {
  return (precise ? CAD_PRECISE : CAD_ROUNDED).format(cents / 100);
}

export function formatDollars(dollars: number): string {
  return CAD_ROUNDED.format(dollars);
}
