import { AnimateIn } from "@/components/AnimateIn";
import { AboutPhotoCarousel } from "@/components/AboutPhotoCarousel";
import { AboutScrollToPerformances } from "@/components/AboutScrollToPerformances";
import { DIRECTOR } from "@/lib/content";

export function AboutContent({
  compact = false,
}: {
  compact?: boolean;
  from?: string;
}) {
  return (
    <section className={compact ? undefined : "pt-20 pb-16 md:pt-24 md:pb-24"}>
      <div className={compact ? undefined : "mx-auto max-w-7xl px-6"}>
        <AboutMain compact={compact} />
      </div>
    </section>
  );
}

function AboutMain({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      {!compact && (
        <AnimateIn>
          <p className="section-eyebrow">Bio</p>
          <h1 className="section-title max-w-2xl">Meet {DIRECTOR.name}</h1>
        </AnimateIn>
      )}

      <div
        className={`grid items-start gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] xl:gap-10 ${
          compact ? "" : "mt-8 md:mt-10"
        }`}
      >
        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          <div className="animate-fade-up">
            <AboutPhotoCarousel />
          </div>
        </div>

        <div>
          <AnimateIn>
            <div className="space-y-5">
              {DIRECTOR.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="about-bio-text">
                  {paragraph}
                </p>
              ))}
            </div>
          </AnimateIn>
        </div>
      </div>

      {!compact && <AboutScrollToPerformances />}
    </div>
  );
}
