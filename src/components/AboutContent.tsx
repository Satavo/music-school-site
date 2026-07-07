import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";
import { ContactLink } from "@/components/ContactLink";

export function AboutContent({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? undefined : "py-16 md:py-24"}>
      <div className={compact ? undefined : "mx-auto max-w-6xl px-6"}>
        <AboutMain compact={compact} />
      </div>
    </section>
  );
}

function AboutMain({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      {!compact && <AnimateIn><p className="section-eyebrow">Her Story</p><h2 className="section-title max-w-2xl">About the owner</h2></AnimateIn>}

      <div className={`grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14 ${compact ? "" : "mt-8"}`}>
        <AnimateIn>
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-accent/20 via-secondary/10 to-transparent" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(61,24,35,0.18)] ring-1 ring-secondary/15">
              <Image
                src="/images/about.jpg"
                alt="Owner of Family Music Academy at the piano"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </AnimateIn>

        <div className="flex h-full flex-col gap-5">
          <AnimateIn delay={80}>
            <p className="story-intro">
              As the owner and founder of Family Music Academy, I bring decades of professional
              performance experience and a deep commitment to nurturing the next generation of
              musicians.
            </p>
          </AnimateIn>

          <AnimateIn delay={140}>
            <p className="story-block-text">
              I was trained in the classical tradition and have performed internationally. Over
              the years, my focus has become clear: helping students build a strong technical
              foundation while discovering their own artistic voice at the piano.
            </p>
          </AnimateIn>

          <AnimateIn delay={220}>
            <p className="story-block-text">
              Music has connected generations of my family, and that legacy shapes everything we
              do at the academy. My lessons combine structure, warmth, and encouragement so each
              student can progress with confidence and joy.
            </p>
          </AnimateIn>

          {!compact && (
            <AnimateIn delay={280} className="mt-auto">
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <ContactLink className="btn-primary">
                  Schedule a Consultation
                </ContactLink>
                <Link href="/curriculum" className="btn-secondary-dark">
                  Explore Curriculum
                </Link>
              </div>
            </AnimateIn>
          )}
        </div>
      </div>
    </div>
  );
}
