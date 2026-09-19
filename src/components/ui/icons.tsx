import type { SVGProps } from "react";

import { cn } from "@/lib/cn";

/**
 * Inline icon set.
 *
 * Drawn here rather than pulled from an icon package: the site needs about
 * twenty glyphs, and inlining them avoids a runtime dependency, keeps them on
 * one stroke weight, and means zero extra network requests.
 *
 * Icons are decorative by default (aria-hidden). Where an icon carries meaning
 * on its own, the caller passes a `title`.
 */

type IconProps = SVGProps<SVGSVGElement> & { title?: string };

function Svg({ title, className, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6 shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/* --- Service icons ------------------------------------------------------- */

export const IconCoHosting = (props: IconProps) => (
  <Svg {...props}>
    <path d="M3 10.5 12 4l9 6.5" />
    <path d="M5.5 9.5V20h13V9.5" />
    <path d="M9.75 20v-5.5h4.5V20" />
    <circle cx="12" cy="10.75" r="1.25" />
  </Svg>
);

export const IconManagement = (props: IconProps) => (
  <Svg {...props}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
    <path d="M3 12h18" />
    <path d="M10.5 12v1.5h3V12" />
  </Svg>
);

export const IconVacation = (props: IconProps) => (
  <Svg {...props}>
    <path d="M3 18.5c1.6 0 1.6 1.2 3.2 1.2s1.6-1.2 3.2-1.2 1.6 1.2 3.2 1.2 1.6-1.2 3.2-1.2 1.6 1.2 3.2 1.2" />
    <path d="M12 16V8.5" />
    <path d="M5.5 8.5c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5c-1.8-1.3-3.6-1.3-5.4 0-1.8-1.3-3.6-1.3-5.4 0" />
  </Svg>
);

export const IconListing = (props: IconProps) => (
  <Svg {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
    <path d="M7.5 8.5h9" />
    <path d="M7.5 12h9" />
    <path d="M7.5 15.5h5" />
  </Svg>
);

export const IconCommunication = (props: IconProps) => (
  <Svg {...props}>
    <path d="M20 13.5a2.5 2.5 0 0 1-2.5 2.5H9l-4 3.5V6.5A2.5 2.5 0 0 1 7.5 4h10A2.5 2.5 0 0 1 20 6.5Z" />
    <path d="M9 8.75h6.5" />
    <path d="M9 11.75h4" />
  </Svg>
);

export const IconRevenue = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4 19.5h16" />
    <path d="M4 16V9" />
    <path d="M9.5 16V5.5" />
    <path d="M15 16v-6" />
    <path d="M20.5 16V7.5" />
  </Svg>
);

export const IconCare = (props: IconProps) => (
  <Svg {...props}>
    <path d="M14.5 6.5a3.5 3.5 0 0 1 4.8-3.24l-2.4 2.4 1.44 1.44 2.4-2.4A3.5 3.5 0 0 1 17.5 9.5c-.42 0-.82-.07-1.2-.2l-7 7a2.05 2.05 0 0 1-2.9-2.9l7-7a3.5 3.5 0 0 1-.2-1.2" />
    <path d="M6.5 17.5h.01" />
  </Svg>
);

export const IconMarketing = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4 10v4a1.5 1.5 0 0 0 1.5 1.5H8l5.5 4V6L8 10H5.5A1.5 1.5 0 0 0 4 11.5Z" />
    <path d="M17 9.5a3.5 3.5 0 0 1 0 5" />
    <path d="M19.5 7a7 7 0 0 1 0 10" />
  </Svg>
);

export const IconBooking = (props: IconProps) => (
  <Svg {...props}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 10h17" />
    <path d="M8 3.5V6.5" />
    <path d="M16 3.5V6.5" />
    <path d="M8.5 14.25l1.75 1.75 3.75-3.75" />
  </Svg>
);

/* --- Property attribute icons -------------------------------------------- */

export const IconBed = (props: IconProps) => (
  <Svg {...props}>
    <path d="M3 18v-7.5" />
    <path d="M3 13.5h18V18" />
    <path d="M21 18v2" />
    <path d="M3 18v2" />
    <path d="M6.5 13.5V10a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v3.5" />
    <circle cx="8.75" cy="11.25" r="1.25" />
  </Svg>
);

export const IconBath = (props: IconProps) => (
  <Svg {...props}>
    <path d="M3.5 11.5h17v2a5 5 0 0 1-5 5h-7a5 5 0 0 1-5-5Z" />
    <path d="M6 11.5V5.75A1.75 1.75 0 0 1 7.75 4c.97 0 1.75.78 1.75 1.75" />
    <path d="M8.25 6.5h2.5" />
    <path d="M6.5 18.5 5.5 20.5" />
    <path d="M17.5 18.5l1 2" />
  </Svg>
);

export const IconGuests = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="9" cy="8" r="3.25" />
    <path d="M3 19.5c0-2.9 2.7-5 6-5s6 2.1 6 5" />
    <path d="M16 5.2a3.25 3.25 0 0 1 0 5.6" />
    <path d="M17.5 15a5.3 5.3 0 0 1 3.5 4.5" />
  </Svg>
);

export const IconMapPin = (props: IconProps) => (
  <Svg {...props}>
    <path d="M19 10.5c0 5-7 10.5-7 10.5S5 15.5 5 10.5a7 7 0 1 1 14 0Z" />
    <circle cx="12" cy="10.25" r="2.5" />
  </Svg>
);

export const IconHome = (props: IconProps) => (
  <Svg {...props}>
    <path d="M3.5 10.5 12 3.5l8.5 7" />
    <path d="M5.75 9.25V20h12.5V9.25" />
  </Svg>
);

/* --- Interface icons ------------------------------------------------------ */

export const IconCheck = (props: IconProps) => (
  <Svg {...props}>
    <path d="M5 12.5 9.5 17 19 7.5" />
  </Svg>
);

export const IconChevronDown = (props: IconProps) => (
  <Svg {...props}>
    <path d="M6 9.5 12 15.5l6-6" />
  </Svg>
);

export const IconChevronLeft = (props: IconProps) => (
  <Svg {...props}>
    <path d="M14.5 5.5 8 12l6.5 6.5" />
  </Svg>
);

export const IconChevronRight = (props: IconProps) => (
  <Svg {...props}>
    <path d="M9.5 5.5 16 12l-6.5 6.5" />
  </Svg>
);

export const IconMenu = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </Svg>
);

export const IconClose = (props: IconProps) => (
  <Svg {...props}>
    <path d="M6 6l12 12" />
    <path d="M18 6 6 18" />
  </Svg>
);

export const IconExternal = (props: IconProps) => (
  <Svg {...props}>
    <path d="M14 5h5v5" />
    <path d="M19 5l-7.5 7.5" />
    <path d="M18 14.5V18a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5 18V8a1.5 1.5 0 0 1 1.5-1.5H10" />
  </Svg>
);

export const IconMail = (props: IconProps) => (
  <Svg {...props}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
    <path d="m4.5 8 6.6 4.6a1.5 1.5 0 0 0 1.8 0L19.5 8" />
  </Svg>
);

export const IconPhone = (props: IconProps) => (
  <Svg {...props}>
    <path d="M8.2 4.5 5.9 4a2 2 0 0 0-2.3 1.4A14.5 14.5 0 0 0 18.6 20.4a2 2 0 0 0 1.4-2.3l-.5-2.3a1.5 1.5 0 0 0-1.7-1.2l-2.2.4a1.5 1.5 0 0 1-1.5-.6 11 11 0 0 1-2.5-2.5 1.5 1.5 0 0 1-.6-1.5l.4-2.2a1.5 1.5 0 0 0-1.2-1.7Z" />
  </Svg>
);

export const IconShield = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 3.5 5 6v6c0 4.2 2.9 7.4 7 8.5 4.1-1.1 7-4.3 7-8.5V6Z" />
    <path d="m9 12 2.25 2.25L15.5 10" />
  </Svg>
);

export const IconSparkle = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 3.5 13.8 9 19.5 10.75 13.8 12.5 12 18l-1.8-5.5L4.5 10.75 10.2 9Z" />
    <path d="M18 17.5 18.7 19.3 20.5 20 18.7 20.7 18 22.5" />
  </Svg>
);

export const IconClock = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
);

export const IconFilter = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4 6.5h16" />
    <path d="M7 12h10" />
    <path d="M10 17.5h4" />
  </Svg>
);

export const IconPlay = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M10.25 9.25 15 12l-4.75 2.75Z" fill="currentColor" />
  </Svg>
);

export const IconStar = ({ className, title, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    className={cn("h-5 w-5 shrink-0", className)}
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <path
      d="M12 3.5l2.6 5.8 6.4.7-4.8 4.3 1.3 6.2L12 17.4 6.5 20.5l1.3-6.2L3 10l6.4-.7Z"
      fill="currentColor"
    />
  </svg>
);

export const IconInfo = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5.5" />
    <path d="M12 7.75h.01" />
  </Svg>
);

export const IconDocument = (props: IconProps) => (
  <Svg {...props}>
    <path d="M13.5 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8.5Z" />
    <path d="M13.5 3.5v5h5" />
    <path d="M8.75 13h6.5" />
    <path d="M8.75 16.25h4" />
  </Svg>
);

/** Maps a service record's `icon` field to a component. */
export const SERVICE_ICONS = {
  "co-hosting": IconCoHosting,
  management: IconManagement,
  vacation: IconVacation,
  listing: IconListing,
  communication: IconCommunication,
  revenue: IconRevenue,
  care: IconCare,
  marketing: IconMarketing,
  booking: IconBooking,
} as const;
