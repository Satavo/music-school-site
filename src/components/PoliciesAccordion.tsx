"use client";

import { useId, useState, type ReactNode } from "react";
import {
  MAKEUP_RULES,
  POLICIES_CLOSING,
  POLICIES_INTRO,
  POLICY_SECTIONS,
  STUDIO_HOLIDAYS,
} from "@/lib/content";

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`h-5 w-5 shrink-0 text-secondary transition-transform duration-300 ${className}`}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function PolicyAccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const panelId = `${baseId}-panel`;

  return (
    <div
      className={`overflow-hidden rounded-2xl border-2 bg-dominant-surface/70 transition-colors duration-300 ${
        open ? "border-secondary/35 shadow-[0_10px_32px_rgba(61,24,35,0.06)]" : "border-secondary/22"
      }`}
    >
      <button
        type="button"
        id={triggerId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-dominant-muted/40 md:px-7 md:py-5"
      >
        <span className="font-serif text-xl font-semibold text-secondary-dark md:text-2xl">
          {title}
        </span>
        <ChevronIcon className={open ? "rotate-180" : ""} />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!open}
        className={`policy-accordion-panel ${open ? "policy-accordion-panel-open" : ""}`}
      >
        <div className="policy-accordion-panel-inner">
          <div className="policy-accordion-panel-content border-t-2 border-secondary/18 px-5 pb-5 pt-4 md:px-7 md:pb-6 md:pt-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PoliciesAccordion() {
  return (
    <div className="mt-8 space-y-3 md:space-y-4">
      <PolicyAccordionItem title="Annual Tuition & Lesson Schedule">
        <p className="about-bio-text !mt-0">{POLICIES_INTRO}</p>
      </PolicyAccordionItem>

      <PolicyAccordionItem title="The 2026–2027 Studio Year">
        <p className="about-bio-text !mt-0">
          No regular lessons will be held during the following scheduled breaks. These breaks
          are already included in the annual tuition schedule.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-secondary/12 bg-dominant-muted/50">
          <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-4 border-b border-secondary/12 bg-dominant-muted/80 px-4 py-3 md:px-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary md:text-sm">
              Break
            </p>
            <p className="text-right text-xs font-bold uppercase tracking-[0.2em] text-secondary md:text-sm">
              Dates
            </p>
          </div>
          <ul className="divide-y divide-secondary/10">
            {STUDIO_HOLIDAYS.map((item) => (
              <li
                key={item.name}
                className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-baseline gap-4 px-4 py-3.5 md:px-5 md:py-4"
              >
                <span className="font-serif text-lg font-semibold text-secondary-dark md:text-xl">
                  {item.name}
                </span>
                <span className="about-bio-text text-right !mt-0">
                  {item.dates}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </PolicyAccordionItem>

      <PolicyAccordionItem title="Student Absences & Makeup Lessons">
        <p className="about-bio-text !mt-0">
          Family Music Academy understands that occasional conflicts, illnesses, or unexpected
          situations may occur. To provide flexibility, each enrolled student is eligible for
          up to <span className="font-semibold text-secondary">4 makeup lessons</span> per
          academic year for missed lessons.
        </p>
        <p className="about-bio-text mt-5 font-semibold text-secondary-dark md:mt-6">
          To qualify for a makeup lesson:
        </p>

        <div className="mt-5 overflow-hidden rounded-2xl border border-secondary/12 bg-dominant-muted/50 md:mt-6">
          <div className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-b border-secondary/12 bg-dominant-muted/80 px-4 py-3 md:grid-cols-[3.5rem_minmax(0,1fr)] md:px-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary md:text-sm">
              #
            </p>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary md:text-sm">
              Requirement
            </p>
          </div>
          <ul className="divide-y divide-secondary/10">
            {MAKEUP_RULES.map((rule, index) => (
              <li
                key={rule}
                className="grid grid-cols-[3rem_minmax(0,1fr)] items-start gap-4 px-4 py-3.5 md:grid-cols-[3.5rem_minmax(0,1fr)] md:px-5 md:py-4"
              >
                <span className="font-serif text-lg font-semibold text-secondary md:text-xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="about-bio-text !mt-0">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </PolicyAccordionItem>

      {POLICY_SECTIONS.map((section) => (
        <PolicyAccordionItem key={section.id} title={section.title}>
          <p className="about-bio-text !mt-0">{section.body}</p>
        </PolicyAccordionItem>
      ))}

      <PolicyAccordionItem title="Enrollment Agreement">
        <p className="about-bio-text !mt-0">{POLICIES_CLOSING}</p>
      </PolicyAccordionItem>
    </div>
  );
}
