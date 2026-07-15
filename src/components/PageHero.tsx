import Image from "next/image";

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
  minimal = false,
}: PageHeroProps) {
  return (
    <section
      id="page-hero"
      key={imageSrc}
      className={`relative flex items-end overflow-hidden bg-secondary-dark ${
        minimal ? "min-h-[20vh] md:min-h-[24vh]" : "min-h-[28vh] md:min-h-[32vh]"
      }`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="animate-hero-media object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-dark/90 via-secondary-dark/60 to-secondary-dark/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/80 via-secondary-dark/20 to-secondary-dark/50" />

      <div
        className={`relative mx-auto w-full max-w-7xl px-6 pt-28 md:pt-32 ${
          minimal ? "pb-6 md:pb-8" : "pb-8 md:pb-10"
        }`}
      >
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
