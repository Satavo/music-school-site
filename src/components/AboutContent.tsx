import { AboutPhotoCarousel } from "@/components/AboutPhotoCarousel";
import { DirectorAchievements } from "@/components/DirectorAchievements";
import { PerformancesCarousel } from "@/components/PerformancesCarousel";
import { SectionReveal } from "@/components/SectionReveal";
import { SectionTitle } from "@/components/SectionTitle";
import { DIRECTOR, DIRECTOR_PERFORMANCES } from "@/lib/content";

export function AboutContent({
  compact = false,
}: {
  compact?: boolean;
  from?: string;
}) {
  return (
    <section id="about" className="section-pad bg-dominant-muted">
      <div className="section-shell">
        <AboutMain compact={compact} />
      </div>
    </section>
  );
}

function AboutMain({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <SectionReveal>
        {!compact && <SectionTitle className="max-w-2xl">{DIRECTOR.sectionTitle}</SectionTitle>}

        <div
          className={`grid items-start gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] xl:gap-10 ${
            compact ? "" : "mt-8 md:mt-10"
          }`}
        >
          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <AboutPhotoCarousel />
          </div>

          <div>
            <div className="space-y-5">
              {DIRECTOR.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="about-bio-text">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {!compact && <DirectorAchievements />}
      </SectionReveal>

      {!compact && (
        <div id="performances" className="mt-10 md:mt-12">
          <SectionReveal>
            <div className="mx-auto max-w-2xl text-center">
              <SectionTitle>Performances</SectionTitle>
            </div>

            <div className="mt-8 md:hidden">
              <PerformancesCarousel />
            </div>

            <div className="mt-8 hidden gap-6 md:grid md:grid-cols-2 md:gap-8">
              {DIRECTOR_PERFORMANCES.map((video) => (
                <article key={video.id}>
                  <div className="relative aspect-video overflow-hidden rounded-2xl bg-secondary-dark shadow-[0_16px_48px_rgba(61,24,35,0.14)] ring-1 ring-line/15">
                    <iframe
                      suppressHydrationWarning
                      src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                      className="absolute inset-0 h-full w-full border-0"
                    />
                  </div>
                  {video.title && (
                    <h4 className="mt-4 font-serif text-xl font-semibold text-dominant-foreground md:text-2xl">
                      {video.title}
                    </h4>
                  )}
                </article>
              ))}
            </div>
          </SectionReveal>
        </div>
      )}
    </>
  );
}
