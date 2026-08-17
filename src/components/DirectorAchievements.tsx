"use client";

import { useId, useState, type ReactNode } from "react";
import { DIRECTOR_ACHIEVEMENT_SECTIONS } from "@/lib/content";

function splitAchievementItem(item: string) {
  const match = item.match(/^(.*?)(?:\s*\((\d{4})\))?\s*$/);

  if (!match) {
    return { text: item, year: null };
  }

  return {
    text: match[1]?.trim() ?? item,
    year: match[2] ?? null,
  };
}

function AchievementList({
  items,
  gridClassName,
}: {
  items: readonly string[];
  gridClassName: string;
}) {
  return (
    <ul className={`grid gap-x-5 gap-y-1.5 ${gridClassName}`.trim()}>
      {items.map((item) => {
        const { text, year } = splitAchievementItem(item);

        return (
          <li
            key={item}
            className="grid grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-x-2 text-[0.8125rem] font-medium leading-snug text-black sm:text-sm"
          >
            <span className="pt-px text-[0.8125rem] font-extrabold tabular-nums text-black sm:text-sm">
              {year ?? ""}
            </span>
            <span className="font-semibold">{text}</span>
          </li>
        );
      })}
    </ul>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`h-5 w-5 shrink-0 text-black transition-transform duration-300 ${className}`}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function AchievementSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const panelId = `${baseId}-panel`;

  return (
    <div className="border-b border-paper-line/10 last:border-b-0">
      <button
        type="button"
        id={triggerId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-paper-muted/60 sm:px-5 sm:py-4 lg:pointer-events-none lg:hover:bg-transparent"
      >
        <h3 className="font-serif text-lg font-bold text-black sm:text-xl">
          {title}
        </h3>
        <ChevronIcon className={`lg:hidden ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!open}
        className={`achievement-accordion-panel policy-accordion-panel ${open ? "policy-accordion-panel-open" : ""}`}
      >
        <div className="policy-accordion-panel-inner">
          <div className="mt-2.5 px-4 pb-3.5 sm:px-5 sm:pb-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function DirectorAchievements() {
  const [awards, orchestra, masterClasses] = DIRECTOR_ACHIEVEMENT_SECTIONS;

  return (
    <div className="mt-8 md:mt-10">
      <div className="overflow-hidden rounded-2xl border border-paper-line/12 bg-paper">
          {awards ? (
            <AchievementSection title={awards.title}>
              <AchievementList
                items={awards.items}
                gridClassName="sm:grid-cols-2 xl:grid-cols-4"
              />
            </AchievementSection>
          ) : null}

          {orchestra ? (
            <AchievementSection title={orchestra.title}>
              <AchievementList
                items={orchestra.items}
                gridClassName="lg:grid-cols-2"
              />
            </AchievementSection>
          ) : null}

          {masterClasses ? (
            <AchievementSection title={masterClasses.title}>
              <AchievementList
                items={masterClasses.items}
                gridClassName="sm:grid-cols-2"
              />
            </AchievementSection>
          ) : null}
        </div>
    </div>
  );
}
