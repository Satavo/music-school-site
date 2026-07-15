import { AnimateIn } from "@/components/AnimateIn";
import { ContactLink } from "@/components/ContactLink";
import { DIRECTOR_PERFORMANCES } from "@/lib/content";

export function AboutPerformances() {
  if (DIRECTOR_PERFORMANCES.length === 0) return null;

  return (
    <section id="performances" className="border-t border-accent/10 bg-dominant-muted/50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateIn className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Performances</p>
          <h2 className="section-title">On Stage</h2>
        </AnimateIn>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {DIRECTOR_PERFORMANCES.map((video, index) => (
            <AnimateIn key={video.id} delay={index * 100}>
              <article>
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-secondary-dark shadow-[0_16px_48px_rgba(61,24,35,0.14)] ring-1 ring-secondary/15">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
                {video.title && (
                  <h3 className="mt-4 font-serif text-xl font-semibold text-secondary-dark md:text-2xl">
                    {video.title}
                  </h3>
                )}
              </article>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={160}>
          <div className="mt-12 flex justify-center md:mt-14">
            <ContactLink className="btn-primary">Schedule a Consultation</ContactLink>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
