import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";
import { DIRECTOR_STATS } from "@/lib/content";

const STORY_BLOCKS = [
  {
    label: "Classical Training",
    text: (
      <>
        Trained in the classical tradition, I have performed internationally and dedicated my
        career to sharing the joy and discipline of piano with students of every age and
        ability level.
      </>
    ),
  },
  {
    label: "Teaching Philosophy",
    text: (
      <>
        My teaching philosophy centers on meeting each student where they are — building
        technique and musicality through patience, encouragement, and a genuine love for the
        art form.
      </>
    ),
  },
  {
    label: "A Family Legacy",
    text: (
      <>
        Music has been the thread connecting generations of my family. That legacy shapes
        everything we do at the academy: rigorous classical training delivered with warmth,
        respect, and a genuine belief in every student&apos;s potential.
      </>
    ),
  },
] as const;

export function AboutContent({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? undefined : "py-16 md:py-24"}>
      <div className={compact ? undefined : "mx-auto max-w-6xl px-6"}>
        <div className="space-y-12 md:space-y-14">
          <AboutMain compact={compact} />
          {!compact && <AboutSecondary />}
        </div>
      </div>
    </section>
  );
}

function AboutMain({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      {!compact && (
        <AnimateIn>
          <p className="section-eyebrow">Her Story</p>
          <h2 className="section-title max-w-2xl">A lifelong dedication to music</h2>
        </AnimateIn>
      )}

      <div className={`grid items-start gap-10 lg:grid-cols-2 lg:gap-14 ${compact ? "" : "mt-8"}`}>
        <AnimateIn>
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-accent/20 via-secondary/10 to-transparent" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(61,24,35,0.18)] ring-1 ring-secondary/15">
              <Image
                src="/images/about.jpg"
                alt="Director of Family Music Academy at the piano"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-4 -right-3 hidden rounded-2xl border border-accent/30 bg-secondary px-5 py-4 text-secondary-foreground shadow-xl md:block">
              <p className="font-serif text-3xl font-bold text-accent-light">3rd</p>
              <p className="mt-1 max-w-[8rem] text-sm leading-snug text-secondary-foreground/90">
                Generation of professional musicians
              </p>
            </div>
          </div>
        </AnimateIn>

        <div className="space-y-5">
          <AnimateIn delay={80}>
            <p className="story-intro">
              As the founder and director of Family Music Academy, I bring decades of
              professional performance experience and a deep commitment to nurturing the next
              generation of musicians.
            </p>
          </AnimateIn>

          {STORY_BLOCKS.map((block, index) => (
            <AnimateIn key={block.label} delay={120 + index * 80}>
              <article className="story-block">
                <h3 className="story-block-label">{block.label}</h3>
                <p className="story-block-text">{block.text}</p>
              </article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutSecondary() {
  return (
    <>
      <div className="grid gap-4 border-t border-accent/10 pt-12 sm:grid-cols-3 md:pt-14">
        {DIRECTOR_STATS.map((stat, index) => (
          <AnimateIn key={stat.label} delay={index * 80}>
            <div className="offers-panel !p-6 text-center md:!p-8">
              <p className="font-serif text-4xl font-bold text-secondary md:text-5xl">{stat.value}</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-dominant-subtle">
                {stat.label}
              </p>
            </div>
          </AnimateIn>
        ))}
      </div>

      <AnimateIn delay={100}>
        <div className="overflow-hidden rounded-3xl bg-secondary shadow-[0_20px_60px_rgba(61,24,35,0.2)]">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 md:p-10 lg:p-12">
              <p className="section-eyebrow !mb-2 !text-accent-light">Philosophy</p>
              <blockquote className="font-serif text-2xl leading-snug font-semibold text-secondary-foreground md:text-3xl">
                &ldquo;Every student carries unique potential — my role is to help them hear it,
                trust it, and bring it to life at the piano.&rdquo;
              </blockquote>
            </div>
            <div className="flex flex-col justify-center gap-3 bg-secondary-dark/35 p-8 md:p-10">
              {[
                "One-on-one individualized instruction",
                "Warm, encouraging studio environment",
                "Performance opportunities through recitals",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-base text-secondary-foreground/90"
                >
                  <span className="text-accent-light">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimateIn>

      <AnimateIn delay={80}>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/#contact" className="btn-primary">
            Schedule a Consultation
          </Link>
          <Link href="/curriculum" className="btn-secondary-dark">
            Explore Our Curriculum
          </Link>
        </div>
      </AnimateIn>
    </>
  );
}
