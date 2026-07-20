import { AnimateIn } from "@/components/AnimateIn";
import { ContactLink } from "@/components/ContactLink";
import {
  MAKEUP_RULES,
  POLICIES_CLOSING,
  POLICIES_INTRO,
  POLICY_SECTIONS,
  STUDIO_HOLIDAYS,
} from "@/lib/content";

export function PoliciesContent() {
  return (
    <section className="pt-20 pb-16 md:pt-24 md:pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateIn>
          <p className="section-eyebrow">Policies & Tuition</p>
          <h1 className="section-title max-w-3xl">Annual Tuition & Lesson Schedule</h1>
          <p className="about-bio-text mt-6 max-w-3xl">{POLICIES_INTRO}</p>
        </AnimateIn>

        <AnimateIn className="mt-16 md:mt-20">
          <p className="section-eyebrow">Studio Calendar</p>
          <h2 className="section-title max-w-3xl">The 2026–2027 Studio Year</h2>
          <p className="about-bio-text mt-6 max-w-3xl">
            No regular lessons will be held during the following scheduled breaks.
            These breaks are already included in the annual tuition schedule.
          </p>

          <div className="mt-10 max-w-3xl overflow-hidden rounded-2xl border border-secondary/12 bg-dominant-surface/70">
            <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-4 border-b border-secondary/12 bg-dominant-muted/80 px-5 py-3.5 md:px-7">
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
                  className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-baseline gap-4 px-5 py-4 md:px-7 md:py-5"
                >
                  <span className="font-serif text-xl font-semibold text-secondary-dark md:text-2xl">
                    {item.name}
                  </span>
                  <span className="text-right text-base text-dominant-foreground/75 md:text-lg">
                    {item.dates}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </AnimateIn>

        <AnimateIn className="mt-16 md:mt-20">
          <p className="section-eyebrow">Makeup Lessons</p>
          <h2 className="section-title max-w-3xl">
            Student Absences & Makeup Lessons
          </h2>
          <p className="about-bio-text mt-6 max-w-3xl">
            Family Music Academy understands that occasional conflicts, illnesses, or
            unexpected situations may occur. To provide flexibility, each enrolled student
            is eligible for up to{" "}
            <span className="font-semibold text-secondary">4 makeup lessons</span> per
            academic year for missed lessons.
          </p>
          <p className="about-bio-text mt-6 max-w-3xl font-semibold text-secondary-dark">
            To qualify for a makeup lesson:
          </p>

          <div className="mt-8 max-w-3xl overflow-hidden rounded-2xl border border-secondary/12 bg-dominant-surface/70">
            <div className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-4 border-b border-secondary/12 bg-dominant-muted/80 px-5 py-3.5 md:grid-cols-[4.5rem_minmax(0,1fr)] md:px-7">
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
                  className="grid grid-cols-[3.5rem_minmax(0,1fr)] items-start gap-4 px-5 py-4 md:grid-cols-[4.5rem_minmax(0,1fr)] md:px-7 md:py-5"
                >
                  <span className="font-serif text-xl font-semibold text-accent md:text-2xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="about-bio-text !mt-0 md:!text-lg">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimateIn>

        <div className="mt-16 md:mt-20">
          <AnimateIn>
            <p className="section-eyebrow">Studio Guidelines</p>
          </AnimateIn>
          <div className="mt-2 space-y-14 md:mt-3 md:space-y-16">
            {POLICY_SECTIONS.map((section, index) => (
              <AnimateIn key={section.id} delay={index * 60}>
                <h2 className="section-title max-w-3xl">{section.title}</h2>
                <p className="about-bio-text mt-6 max-w-3xl">{section.body}</p>
              </AnimateIn>
            ))}
          </div>
        </div>

        <AnimateIn className="mt-16 md:mt-20">
          <div className="max-w-3xl overflow-hidden rounded-2xl border border-secondary/12 bg-dominant-muted/70 px-6 py-8 md:px-8 md:py-10">
            <p className="about-bio-text !mt-0">{POLICIES_CLOSING}</p>
            <div className="mt-8">
              <ContactLink className="btn-primary">Schedule a Consultation</ContactLink>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
