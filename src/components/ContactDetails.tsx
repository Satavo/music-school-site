import type { ReactNode } from "react";
import { SCHOOL_CONTACT } from "@/lib/content";

function ContactIcon({
  children,
  compact = false,
  dense = false,
}: {
  children: ReactNode;
  compact?: boolean;
  dense?: boolean;
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-secondary/8 ${
        dense ? "h-9 w-9" : compact ? "h-10 w-10" : "h-12 w-12"
      }`}
    >
      {children}
    </span>
  );
}

function InstagramIcon({
  className = "h-6 w-6 text-secondary",
  strokeWidth = 1.5,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ContactDetails({
  compact = false,
  dense = false,
}: {
  compact?: boolean;
  dense?: boolean;
}) {
  const rowClass = `about-bio-text flex items-center transition-colors hover:text-secondary ${
    compact ? "gap-2.5" : "gap-4"
  }`;

  return (
    <div className={dense ? "space-y-2" : compact ? "space-y-3" : "space-y-4"}>
      <a href={SCHOOL_CONTACT.emailHref} className={rowClass}>
        <ContactIcon compact={compact} dense={dense}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6 text-secondary">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </ContactIcon>
        <span className="min-w-0 break-all leading-snug">{SCHOOL_CONTACT.email}</span>
      </a>
      <a href={SCHOOL_CONTACT.mapsHref} target="_blank" rel="noopener noreferrer" className={rowClass}>
        <ContactIcon compact={compact} dense={dense}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6 text-secondary">
            <path d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          </svg>
        </ContactIcon>
        <span className="min-w-0 leading-snug">
          {SCHOOL_CONTACT.addressLines.map((line, index) => (
            <span key={line}>
              {index > 0 ? <br /> : null}
              {line}
            </span>
          ))}
        </span>
      </a>
      <a href={SCHOOL_CONTACT.instagramHref} target="_blank" rel="noopener noreferrer" className={rowClass}>
        <ContactIcon compact={compact} dense={dense}>
          <InstagramIcon />
        </ContactIcon>
        <span className="leading-snug">{SCHOOL_CONTACT.instagramHandle}</span>
      </a>
    </div>
  );
}

export { InstagramIcon };
