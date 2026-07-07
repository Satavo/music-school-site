import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";
import { ContactLink } from "@/components/ContactLink";
import { WHY_CHOOSE_ITEMS } from "@/lib/content";
import { pageHref } from "@/lib/navigation";

export function WhyAcademy() {
  return (
    <>
      <section id="why" className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <AnimateIn>
            <p className="section-eyebrow">Our Story</p>
            <h2 className="section-title max-w-2xl">
              Why Family Music Academy?
            </h2>

            <div className="mt-6 grid items-stretch gap-8 md:mt-8 lg:grid-cols-2 lg:gap-10">
              <div className="space-y-5">
                <p className="story-intro">
                  The name{" "}
                  <span className="text-highlight">Family Music Academy</span> reflects two
                  values at the heart of our school — a{" "}
                  <span className="text-highlight-gold">deep family tradition</span> in music,
                  and a belief that learning together strengthens families.
                </p>

                <article className="story-block">
                  <h3 className="story-block-label">A Family Legacy</h3>
                  <p className="story-block-text">
                    Music has been part of my family for generations. As a{" "}
                    <span className="text-highlight">third-generation professional musician</span>,
                    I continue a tradition where passion, dedication, and artistry are passed
                    from one generation to the next. For me, music is more than a profession
                    — it is a <span className="text-highlight-gold">lifelong family legacy</span>.
                  </p>
                </article>

                <article className="story-block">
                  <h3 className="story-block-label">Together Through Music</h3>
                  <p className="story-block-text">
                    I believe music has the power to{" "}
                    <span className="text-highlight">bring families together</span>. Our academy
                    welcomes students of all ages — siblings, parents and children, or adults
                    pursuing a lifelong dream — in a warm community where every student feels
                    encouraged to grow.
                  </p>
                </article>
              </div>

              <div className="flex h-full min-h-0 flex-col gap-3">
                <DiscoverCard
                  href={pageHref("/about", "why")}
                  eyebrow="About"
                  title="About the Owner"
                  description="Learn about the third-generation musician behind the academy and her teaching philosophy."
                  cta="Read her story"
                  imageSrc="/images/about.jpg"
                  variant="dark"
                  compact
                  stretch
                />
                <DiscoverCard
                  href={pageHref("/gallery", "why")}
                  eyebrow="Gallery"
                  title="Photo Gallery"
                  description="Moments from lessons, recitals, and our vibrant musical community."
                  cta="View gallery"
                  imageSrc="/images/gallery/studio.jpg"
                  variant="burgundy"
                  compact
                  stretch
                />
                <ContactLink className="btn-primary w-full shrink-0">
                  Enroll
                </ContactLink>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section id="offers" className="border-t border-accent/10 bg-dominant-muted/50 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <AnimateIn>
            <p className="section-eyebrow">What we offer</p>
            <h2 className="section-title max-w-2xl">Your experience at the academy</h2>

            <div className="mt-6 grid items-stretch gap-8 md:mt-8 lg:grid-cols-2 lg:gap-10">
              <div className="flex h-full min-h-0 flex-col gap-3">
                <DiscoverCard
                  href={pageHref("/curriculum", "offers")}
                  eyebrow="Curriculum"
                  title="Our Program"
                  description="Explore structured paths for beginners through advanced students, including ABRSM exam preparation."
                  cta="View curriculum"
                  imageSrc="/images/gallery/sheet-music.jpg"
                  variant="burgundy"
                  compact
                  stretch
                />
                <ContactLink className="btn-primary w-full shrink-0">
                  Enroll
                </ContactLink>
              </div>
              <OffersPanel />
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}

function OffersPanel() {
  return (
    <div className="offers-panel">
      <div className="offers-panel-header">
        <p className="section-eyebrow !mb-2">For every student</p>
        <h3 className="offers-panel-title">What&apos;s included in your lessons</h3>
      </div>
      <ul className="offers-list">
        {WHY_CHOOSE_ITEMS.map((item, index) => (
          <li key={item} className="offers-item">
            <span className="offers-item-marker" aria-hidden>
              {index + 1}.
            </span>
            <span className="offers-item-text">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type DiscoverCardProps = {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  imageSrc: string;
  variant: "dark" | "burgundy";
  className?: string;
  compact?: boolean;
  stretch?: boolean;
};

function DiscoverCard({
  href,
  eyebrow,
  title,
  description,
  cta,
  imageSrc,
  variant,
  className = "",
  compact = false,
  stretch = false,
}: DiscoverCardProps) {
  const bg = variant === "dark" ? "bg-secondary-dark" : "bg-secondary";
  const gradient =
    variant === "dark"
      ? "from-secondary-dark via-secondary-dark/85 to-secondary-dark/55"
      : "from-secondary via-secondary/85 to-secondary/55";

  const heightClass = stretch
    ? "min-h-0 flex-1"
    : compact
      ? "min-h-[10rem] md:min-h-[11rem]"
      : "min-h-[16rem] md:min-h-[18rem]";

  return (
    <Link
      href={href}
      className={`group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${bg} ${heightClass} ${className}`}
    >
      <div className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-40">
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="50vw"
        />
      </div>
      <div className={`absolute inset-0 bg-gradient-to-t ${gradient}`} />

      <div className={`relative flex flex-1 flex-col ${compact ? (stretch ? "p-4 md:p-5" : "p-4 md:p-5") : "p-6 md:p-7"}`}>
        <p
          className={`font-semibold uppercase tracking-[0.25em] text-accent-light ${
            compact && stretch ? "text-sm md:text-base" : compact ? "text-xs md:text-sm" : "text-xs md:text-sm"
          }`}
        >
          {eyebrow}
        </p>
        <h3
          className={`font-serif font-semibold text-secondary-foreground ${
            compact && stretch
              ? "mt-2 text-xl md:text-2xl"
              : compact
                ? "mt-2 text-xl md:text-2xl"
                : "mt-2 text-xl md:text-2xl"
          }`}
        >
          {title}
        </h3>
        <p
          className={`max-w-md flex-1 text-secondary-foreground/85 ${
            compact && stretch
              ? "mt-2.5 text-base leading-relaxed md:text-lg md:leading-relaxed"
              : compact
                ? "mt-2.5 line-clamp-2 text-sm leading-relaxed md:text-base"
                : "mt-3 text-sm leading-relaxed"
          }`}
        >
          {description}
        </p>
        <span
          className={`inline-flex items-center gap-2 font-semibold text-accent-light ${
            compact && stretch
              ? "mt-auto pt-2 text-base"
              : compact
                ? "mt-3 text-sm"
                : "mt-4 text-sm"
          }`}
        >
          {cta}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`transition-transform duration-300 group-hover:translate-x-1 ${
              compact ? "h-5 w-5" : "h-5 w-5"
            }`}
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
