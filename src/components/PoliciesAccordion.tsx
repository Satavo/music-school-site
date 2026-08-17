"use client";

import { useId, useState, type ReactNode } from "react";
import {
  MAKEUP_RULES,
  LESSON_TUITION_OPTIONS,
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
      className={`h-5 w-5 shrink-0 text-paper-foreground transition-transform duration-300 ${className}`}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function PolicyTable({
  columns,
  children,
  layout = "balanced",
}: {
  columns: { label: string; align?: "left" | "right" }[];
  children: ReactNode;
  layout?: "balanced" | "numbered";
}) {
  const gridClass =
    layout === "numbered"
      ? "grid grid-cols-[3rem_minmax(0,1fr)] gap-4 md:grid-cols-[3.5rem_minmax(0,1fr)]"
      : "grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-4";

  return (
    <div className="policy-table">
      <div className={`policy-table-header ${gridClass}`}>
        {columns.map((column) => (
          <p
            key={column.label}
            className={`policy-table-header-label ${
              column.align === "right" ? "policy-table-header-label-right" : ""
            }`}
          >
            {column.label}
          </p>
        ))}
      </div>
      <ul className="policy-table-body">{children}</ul>
    </div>
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
      className={`overflow-hidden rounded-2xl border-2 border-paper-line/12 bg-paper transition-colors duration-300 ${
        open ? "shadow-[0_10px_32px_rgba(0,0,0,0.08)]" : ""
      }`}
    >
      <button
        type="button"
        id={triggerId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-paper-muted/60 md:px-7 md:py-5"
      >
        <span className="text-xl font-semibold text-paper-foreground md:text-2xl">
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
          <div className="policy-accordion-panel-content px-5 pb-5 pt-4 md:px-7 md:pb-6 md:pt-5">
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
      <PolicyAccordionItem title="Lesson Options & Monthly Tuition" defaultOpen>
        <PolicyTable
          columns={[
            { label: "Lesson Length" },
            { label: "Monthly Tuition", align: "right" },
          ]}
        >
          {LESSON_TUITION_OPTIONS.map((item) => (
            <li
              key={item.length}
              className="policy-table-row grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-baseline gap-4"
            >
              <span className="policy-table-cell-text">{item.length}</span>
              <span className="policy-table-cell-text text-right !mt-0">{item.tuition}</span>
            </li>
          ))}
        </PolicyTable>
      </PolicyAccordionItem>

      <PolicyAccordionItem title="Annual Tuition & Lesson Schedule">
        <p className="about-bio-text !mt-0">{POLICIES_INTRO}</p>
      </PolicyAccordionItem>

      <PolicyAccordionItem title="The 2026–2027 Studio Year">
        <p className="about-bio-text !mt-0">
          No regular lessons will be held during the following scheduled breaks. These breaks
          are already included in the annual tuition schedule.
        </p>

        <div className="mt-6">
          <PolicyTable
            columns={[
              { label: "Break" },
              { label: "Dates", align: "right" },
            ]}
          >
            {STUDIO_HOLIDAYS.map((item) => (
              <li
                key={item.name}
                className="policy-table-row grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-baseline gap-4"
              >
                <span className="policy-table-cell-emphasis">{item.name}</span>
                <span className="policy-table-cell-text text-right !mt-0">{item.dates}</span>
              </li>
            ))}
          </PolicyTable>
        </div>
      </PolicyAccordionItem>

      <PolicyAccordionItem title="Student Absences & Makeup Lessons">
        <p className="about-bio-text !mt-0">
          Family Music Academy understands that occasional conflicts, illnesses, or unexpected
          situations may occur. To provide flexibility, each enrolled student is eligible for
          up to <span className="font-semibold">4 makeup lessons</span> per academic year for
          missed lessons.
        </p>
        <p className="about-bio-text mt-5 font-semibold md:mt-6">To qualify for a makeup lesson:</p>

        <div className="mt-5 md:mt-6">
          <PolicyTable layout="numbered" columns={[{ label: "#" }, { label: "Requirement", align: "left" }]}>
            {MAKEUP_RULES.map((rule, index) => (
              <li
                key={rule}
                className="policy-table-row grid grid-cols-[3rem_minmax(0,1fr)] items-start gap-4 md:grid-cols-[3.5rem_minmax(0,1fr)]"
              >
                <span className="policy-table-cell-text tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="policy-table-cell-text !mt-0">{rule}</span>
              </li>
            ))}
          </PolicyTable>
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
