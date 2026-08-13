"use client";

import { CarouselDots } from "@/components/CarouselDots";
import { DIRECTOR_PERFORMANCES } from "@/lib/content";
import { useSwipeCarousel } from "@/lib/use-swipe-carousel";

export function PerformancesCarousel() {
  const videos = DIRECTOR_PERFORMANCES;
  const { index, go, swipeRef } = useSwipeCarousel(videos.length);
  const activeVideo = videos[index];

  if (!activeVideo) return null;

  return (
    <div>
      <div
        ref={swipeRef}
        className="carousel-swipe"
        aria-roledescription="carousel"
        aria-label={`Performance ${index + 1} of ${videos.length}`}
      >
        <article>
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-secondary-dark shadow-[0_16px_48px_rgba(61,24,35,0.14)] ring-1 ring-secondary/15">
            <iframe
              key={activeVideo.id}
              suppressHydrationWarning
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?rel=0`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="pointer-events-none absolute inset-0 h-full w-full border-0 md:pointer-events-auto"
            />
          </div>
          {activeVideo.title && (
            <h4 className="mt-4 text-center font-serif text-xl font-semibold text-secondary-dark">
              {activeVideo.title}
            </h4>
          )}
        </article>
      </div>

      {videos.length > 1 && (
        <CarouselDots
          count={videos.length}
          index={index}
          onSelect={go}
          label="Performance videos"
        />
      )}
    </div>
  );
}
