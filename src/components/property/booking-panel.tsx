"use client";

import { useMemo, useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { IconInfo } from "@/components/ui/icons";
import { track } from "@/lib/analytics";
import { bookingEngineAvailable } from "@/lib/integrations";
import { buildQuote, formatCents, formatDollars } from "@/lib/pricing/quote";
import type { Property } from "@/lib/types/property";

/**
 * Stay panel - the booking module's front end, running in estimate-only mode.
 *
 * What it does today: takes dates and a guest count, and produces a genuine,
 * itemised price estimate from the property's published pricing rules using the
 * same `buildQuote` function a real checkout would call.
 *
 * What it deliberately does NOT do:
 *   - claim the dates are available. No calendar source is connected
 *     (see src/lib/integrations), and a fake availability check is worse than
 *     none, so the panel says availability is confirmed by us;
 *   - collect payment or pretend to take a booking. The action is an enquiry.
 *
 * When a booking engine is wired up, `bookingEngineAvailable` flips to true and
 * this component gains the availability check and the checkout step. The
 * layout, the pricing maths and the guest inputs do not change - which is the
 * point of building it this way now.
 */

function todayIso(offsetDays = 0): string {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

/** The day after an ISO date, used as the earliest possible check-out. */
function dayAfter(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return todayIso(1);
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
}

export function BookingPanel({ property }: { property: Property }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(0);

  const quote = useMemo(() => {
    if (!checkIn || !checkOut) return null;
    return buildQuote(
      property.id,
      property.pricing,
      { checkIn, checkOut },
      { adults, children, infants: 0, pets },
    );
  }, [property.id, property.pricing, checkIn, checkOut, adults, children, pets]);

  const rate = property.pricing?.baseNightlyRate;
  const minimumNights = property.pricing?.minimumStayNights;

  const enquiryHref = `/contact/?property=${encodeURIComponent(property.slug)}${
    checkIn ? `&from=${checkIn}` : ""
  }${checkOut ? `&to=${checkOut}` : ""}&guests=${adults + children}`;

  return (
    <div className="rounded-[var(--radius-panel)] border border-line bg-surface-raised p-5 shadow-card sm:p-6">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          {rate ? (
            <p className="text-ink">
              <span className="text-display-sm">{formatDollars(rate)}</span>
              <span className="text-sm text-ink-subtle"> per night from</span>
            </p>
          ) : (
            <p className="text-display-sm text-ink">Rates on request</p>
          )}
          {minimumNights ? (
            <p className="mt-1 text-sm text-ink-subtle">{minimumNights}-night minimum stay</p>
          ) : null}
        </div>
      </div>

      {rate ? (
        <>
          <div className="mt-5 grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Check in" id="check-in">
                <input
                  id="check-in"
                  type="date"
                  value={checkIn}
                  min={todayIso()}
                  onChange={(event) => {
                    setCheckIn(event.target.value);
                    if (checkOut && event.target.value >= checkOut) setCheckOut("");
                  }}
                  className={inputClasses}
                />
              </Field>
              <Field label="Check out" id="check-out">
                <input
                  id="check-out"
                  type="date"
                  value={checkOut}
                  min={checkIn ? dayAfter(checkIn) : todayIso(1)}
                  onChange={(event) => setCheckOut(event.target.value)}
                  className={inputClasses}
                />
              </Field>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Field label="Adults" id="adults">
                <NumberInput id="adults" value={adults} min={1} max={property.maxGuests} onChange={setAdults} />
              </Field>
              <Field label="Children" id="children">
                <NumberInput
                  id="children"
                  value={children}
                  min={0}
                  max={Math.max(0, property.maxGuests - adults)}
                  onChange={setChildren}
                />
              </Field>
              <Field label="Pets" id="pets">
                <NumberInput
                  id="pets"
                  value={pets}
                  min={0}
                  max={property.pricing?.petsAllowed ? 3 : 0}
                  onChange={setPets}
                  disabled={!property.pricing?.petsAllowed}
                />
              </Field>
            </div>
          </div>

          {adults + children > property.maxGuests ? (
            <p role="alert" className="mt-3 text-sm text-danger">
              This property sleeps up to {property.maxGuests} guests.
            </p>
          ) : null}

          {quote ? (
            <div className="mt-5 border-t border-line pt-5">
              {quote.issues.length > 0 ? (
                <ul className="mb-4 grid gap-1.5 text-sm text-danger" role="alert">
                  {quote.issues.map((issue) => (
                    <li key={issue}>{issue}</li>
                  ))}
                </ul>
              ) : null}

              {quote.nights > 0 ? (
                <>
                  <h3 className="sr-only">Price estimate</h3>
                  <dl className="grid gap-2.5 text-sm">
                    {quote.lines.map((line) => (
                      <div key={line.id} className="flex items-baseline justify-between gap-4">
                        <dt className={line.kind === "discount" ? "text-success" : "text-ink-muted"}>
                          {line.label}
                        </dt>
                        <dd
                          className={
                            line.kind === "discount" ? "tabular-nums text-success" : "tabular-nums text-ink"
                          }
                        >
                          {formatCents(line.amountCents)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-line pt-4">
                    <p className="font-medium text-ink">Estimated total</p>
                    <p className="text-lg font-semibold tabular-nums text-ink">
                      {formatCents(quote.totalCents)}
                    </p>
                  </div>
                </>
              ) : null}
            </div>
          ) : null}
        </>
      ) : (
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          Rates for this property are provided on request. Tell us your dates and group size and we
          will come back with pricing and availability.
        </p>
      )}

      <div className="mt-6 grid gap-3">
        <ButtonLink
          href={enquiryHref}
          size="lg"
          fullWidth
          onClick={() => track({ name: "book_direct_click", params: { property_slug: property.slug } })}
        >
          Enquire about these dates
        </ButtonLink>

        {property.airbnbUrl ? (
          <ButtonLink
            href={property.airbnbUrl}
            variant="secondary"
            size="lg"
            fullWidth
            external
            onClick={() => track({ name: "airbnb_click", params: { property_slug: property.slug } })}
          >
            View on Airbnb
          </ButtonLink>
        ) : null}
      </div>

      <div className="mt-5 flex gap-2.5 rounded-xl bg-linen-200/70 p-3.5 text-[0.8125rem] leading-relaxed text-ink-muted">
        <IconInfo className="mt-0.5 h-4 w-4 shrink-0 text-brass-600" />
        <p>
          {bookingEngineAvailable ? (
            "Availability is shown live and confirmed at booking."
          ) : (
            <>
              This is a price estimate, not a confirmed booking. No live calendar is connected yet,
              so we confirm availability with you directly. Instant direct booking is coming and no
              payment is taken through this site.
            </>
          )}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

const inputClasses =
  "h-11 w-full rounded-xl border border-line bg-surface px-3 text-[0.9375rem] text-ink " +
  "transition-colors hover:border-line-strong focus:border-evergreen-700 " +
  "disabled:cursor-not-allowed disabled:opacity-50";

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-[0.08em] text-ink-subtle">
        {label}
      </label>
      {children}
    </div>
  );
}

function NumberInput({
  id,
  value,
  min,
  max,
  onChange,
  disabled,
}: {
  id: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}) {
  return (
    <select
      id={id}
      value={value}
      disabled={disabled || max < min}
      onChange={(event) => onChange(Number(event.target.value))}
      className={inputClasses}
    >
      {Array.from({ length: Math.max(0, max - min + 1) }, (_, index) => min + index).map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
