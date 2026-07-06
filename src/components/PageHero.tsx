import Image from "next/image";
import Link from "next/link";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
};

export function PageHero({
  eyebrow,
  title,
  titleAccent,
  description,
  imageSrc,
  imageAlt = "",
}: PageHeroProps) {
  return (
    <section
      id="page-hero"
      className="relative flex min-h-[28vh] items-end overflow-hidden md:min-h-[32vh]"
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

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-28 pb-8 md:pt-32 md:pb-10">
        <Link
          href="/"
          className="animate-fade-up mb-4 inline-flex items-center gap-2 rounded-full border border-secondary-foreground/30 bg-white/8 px-3.5 py-1.5 text-sm font-medium text-secondary-foreground/80 backdrop-blur-sm transition-colors hover:bg-white/15 hover:text-secondary-foreground"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

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
      </div>
    </section>
  );
}
