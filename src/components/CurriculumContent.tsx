import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";
import { CURRICULUM_LEVELS, WHY_CHOOSE_ITEMS } from "@/lib/content";

export function CurriculumContent({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? undefined : "py-16 md:py-24"}>
      <div className={compact ? undefined : "mx-auto max-w-6xl px-6"}>
        <div className="space-y-12 md:space-y-14">
          <CurriculumLevels compact={compact} />
          {!compact && <CurriculumSecondary />}
        </div>
      </div>
    </section>
  );
}

function CurriculumLevels({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      {!compact && (
        <AnimateIn>
          <p className="section-eyebrow">Our Program</p>
          <h2 className="section-title max-w-2xl">Paths for every stage</h2>
          <p className="section-lead mt-4 max-w-2xl">
            Structured, individualized piano instruction designed for every age and stage — from
            first notes to competition-ready performance.
          </p>
        </AnimateIn>
      )}

      <div className={`grid gap-5 md:grid-cols-3 ${compact ? "" : "mt-10"}`}>
        {CURRICULUM_LEVELS.map((level, index) => (
          <AnimateIn key={level.title} delay={index * 100}>
            <article className="story-block flex h-full flex-col">
              <span className="font-serif text-4xl font-bold text-accent/50">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="story-block-label mt-2">{level.title}</h3>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">
                {level.ages}
              </p>
              <p className="story-block-text mt-3 flex-1">{level.description}</p>
              <ul className="mt-5 space-y-2 border-t border-secondary/10 pt-5">
                {level.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-center gap-2.5 text-base text-dominant-foreground/80"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </article>
          </AnimateIn>
        ))}
      </div>
    </div>
  );
}

function CurriculumSecondary() {
  return (
    <div className="border-t border-accent/10 pt-12 md:pt-14">
      <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
        <AnimateIn className="h-full">
          <div className="offers-panel h-full">
            <div className="offers-panel-header">
              <p className="section-eyebrow !mb-2">For every student</p>
              <h3 className="offers-panel-title">What&apos;s included in your lessons</h3>
            </div>
            <ul className="offers-list">
              {WHY_CHOOSE_ITEMS.map((item, index) => (
                <li key={item} className="offers-item">
                  <span className="offers-item-marker" aria-hidden>
                    {index + 1}.
                  </span>
                  <span className="offers-item-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimateIn>

        <AnimateIn delay={100} className="h-full">
          <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-secondary shadow-[0_20px_60px_rgba(61,24,35,0.2)]">
            <Image
              src="/images/gallery/sheet-music.jpg"
              alt="Classical sheet music on piano"
              fill
              className="object-cover opacity-25"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/90 to-secondary/75" />
            <div className="relative flex flex-1 flex-col p-8 md:p-10">
              <p className="section-eyebrow !text-accent-light">Advanced Track</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-secondary-foreground md:text-3xl">
                ABRSM & Competition Preparation
              </h3>
              <p className="mt-4 text-body leading-relaxed text-secondary-foreground/85">
                Specialized coaching in repertoire selection, sight-reading, aural skills, and
                performance psychology — ensuring students feel confident on exam day.
              </p>
              <ul className="mt-6 space-y-2">
                {[
                  "Graded exam repertoire coaching",
                  "Sight-reading & aural training",
                  "Competition performance prep",
                  "Studio recital opportunities",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/8 px-3.5 py-2.5 text-base text-secondary-foreground/90"
                  >
                    <span className="text-accent-light">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimateIn>
      </div>

      <AnimateIn delay={80}>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/#contact" className="btn-primary">
            Inquire About Lessons
          </Link>
          <Link href="/about" className="btn-secondary-dark">
            Meet the Director
          </Link>
        </div>
      </AnimateIn>
    </div>
  );
}
