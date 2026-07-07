import Image from "next/image";
import { BackToHomeLink } from "@/components/BackToHomeLink";

type PageHeroProps = {
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
  from?: string;
  minimal?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  titleAccent,
  description,
  imageSrc,
  imageAlt = "",
  from,
  minimal = false,
}: PageHeroProps) {
  return (
    <section
      id="page-hero"
      className={`relative flex items-end overflow-hidden ${
        minimal ? "min-h-[20vh] md:min-h-[24vh]" : "min-h-[28vh] md:min-h-[32vh]"
      }`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-dark/85 via-secondary-dark/55 to-secondary-dark/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/75 via-transparent to-secondary-dark/45" />

      <div
        className={`relative mx-auto w-full max-w-6xl px-6 pt-28 md:pt-32 ${
          minimal ? "pb-6 md:pb-8" : "pb-8 md:pb-10"
        }`}
      >
        <BackToHomeLink from={from} />

        {!minimal && eyebrow && title && (
          <>
            <p className="animate-fade-up-delay-1 section-eyebrow !mb-2 !text-accent-light">{eyebrow}</p>
            <h1 className="animate-fade-up-delay-1 max-w-3xl font-serif text-3xl leading-[1.1] font-semibold text-secondary-foreground sm:text-4xl md:text-[2.75rem]">
              {title}
              {titleAccent && (
                <>
                  {" "}
                  <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">
                    {titleAccent}
                  </span>
                </>
              )}
            </h1>
            {description && (
              <p className="animate-fade-up-delay-2 mt-3 max-w-xl text-sm leading-relaxed text-secondary-foreground/80 md:text-base">
                {description}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
