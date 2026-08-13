import Image from "next/image";
import { ADVANCED_TRACK } from "@/lib/content";

export function AdvancedTrackCard() {
  return (
    <article className="curriculum-path-card-size relative flex flex-col overflow-hidden rounded-3xl bg-secondary shadow-[0_20px_60px_rgba(61,24,35,0.2)] md:h-full md:max-w-none">
      <Image
        src="/images/gallery/concert-stage.png"
        alt=""
        fill
        className="object-cover opacity-25"
        sizes="(max-width: 768px) 85vw, 24rem"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/90 to-secondary/75" />
      <div className="relative flex h-full flex-col p-5 md:p-7">
        <p className="section-eyebrow shrink-0 !text-secondary-foreground/90">{ADVANCED_TRACK.eyebrow}</p>
        <h3 className="mt-2 line-clamp-2 shrink-0 font-serif text-xl font-semibold text-secondary-foreground md:text-2xl">
          {ADVANCED_TRACK.title}
        </h3>
        <p className="about-bio-text mt-3 !text-secondary-foreground/85 md:min-h-0 md:flex-1 md:overflow-hidden md:line-clamp-4">
          {ADVANCED_TRACK.description}
        </p>
        <ul className="curriculum-carousel-highlights shrink-0 !border-white/10">
          {ADVANCED_TRACK.highlights.map((item) => (
            <li
              key={item}
              className="about-bio-text flex items-center gap-2.5 !text-secondary-foreground/90"
            >
              <span className="shrink-0 text-secondary-foreground">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
