"use client";

import { ContactLink } from "@/components/ContactLink";
import { InstagramIcon } from "@/components/ContactDetails";
import { AnimateIn } from "@/components/AnimateIn";
import { PhoneIcon } from "@/components/icons/PhoneIcon";
import { SCHOOL_CONTACT, SCHOOL_NAME } from "@/lib/content";

const HERO_CONTACT_ICON_CLASS = "h-8 w-8 sm:h-9 sm:w-9 lg:h-9 lg:w-9";

const HERO_CONTACT_TEXT_CLASS =
  "whitespace-nowrap font-sans font-normal leading-snug tracking-normal text-secondary-foreground/88 underline-offset-4 group-hover:text-secondary-foreground/95 group-hover:underline text-[clamp(1rem,4.2vw,1.1875rem)] sm:text-[clamp(1.0625rem,3.9vw,1.25rem)] lg:text-[clamp(0.875rem,3.4vw,1.5rem)]";

const HERO_SCHOOL_NAME_CLASS =
  "text-gradient-shimmer text-right font-serif font-semibold leading-tight text-[clamp(1.625rem,6.8vw,2.375rem)] sm:text-[clamp(1.75rem,6.2vw,2.5rem)] lg:text-[clamp(1.375rem,5.5vw,2.125rem)] xl:text-[clamp(1.5rem,4vw,2.25rem)] mr-12 sm:mr-[3.25rem] lg:mr-10 xl:mr-12";

function HeroSchoolName({ className = "" }: { className?: string }) {
  return (
    <p className={`${HERO_SCHOOL_NAME_CLASS} ${className}`.trim()}>{SCHOOL_NAME}</p>
  );
}

function MapPinIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    </svg>
  );
}

function HeroAddress({ className = "" }: { className?: string }) {
  const addressLabel = SCHOOL_CONTACT.addressLines.join(" ");

  return (
    <a
      href={SCHOOL_CONTACT.mapsHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open studio location: ${addressLabel}`}
      className={`group inline-flex max-w-full items-center gap-3.5 transition-opacity hover:opacity-90 sm:gap-4 flex-row-reverse justify-end ${className}`}
    >
      <span className="shrink-0 text-secondary">
        <MapPinIcon className={HERO_CONTACT_ICON_CLASS} />
      </span>
      <p className={HERO_CONTACT_TEXT_CLASS}>{addressLabel}</p>
    </a>
  );
}

function HeroInstagram({ className = "" }: { className?: string }) {
  return (
    <a
      href={SCHOOL_CONTACT.instagramHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Instagram ${SCHOOL_CONTACT.instagramHandle}`}
      className={`group inline-flex max-w-full items-center gap-3.5 transition-opacity hover:opacity-90 sm:gap-4 flex-row-reverse justify-end ${className}`}
    >
      <span className="shrink-0 text-secondary">
        <InstagramIcon className={`${HERO_CONTACT_ICON_CLASS} text-current`} strokeWidth={2} />
      </span>
      <p className={HERO_CONTACT_TEXT_CLASS}>{SCHOOL_CONTACT.instagramHandle}</p>
    </a>
  );
}

export function HeroMobileContact() {
  return (
    <AnimateIn className="flex flex-col items-end gap-3.5 sm:gap-4 lg:hidden">
      <HeroSchoolName />
      <HeroAddress />
      <HeroInstagram />
    </AnimateIn>
  );
}

export function HeroStudioContact() {
  return (
    <aside className="hidden shrink-0 animate-fade-up-delay-1 lg:flex lg:w-max lg:max-w-none lg:flex-col lg:items-end lg:gap-5">
      <div className="animate-fade-up-delay-2 flex flex-col items-end gap-2.5 sm:gap-3">
        <HeroSchoolName />
        <HeroAddress />
        <HeroInstagram />
      </div>

      <div className="mr-4 flex animate-fade-up-delay-2 justify-end xl:mr-6">
        <ContactLink className="btn-primary gap-2.5 whitespace-nowrap py-3">
          <PhoneIcon className="h-5 w-5 shrink-0" />
          Schedule a Consultation
        </ContactLink>
      </div>
    </aside>
  );
}
