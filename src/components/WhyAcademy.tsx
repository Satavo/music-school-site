import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";
import { ContactLink } from "@/components/ContactLink";
import { HOME_INTRO, WHY_CHOOSE_ITEMS } from "@/lib/content";
import { pageHref } from "@/lib/navigation";

export function WhyAcademy() {
  return (
    <>
      <section className="py-24 md:py-32">
        <div id="who" className="mx-auto max-w-7xl px-6">
          <AnimateIn>
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(61,24,35,0.12)] ring-1 ring-secondary/10">
                <Image
                  src="/images/who-we-are.jpg"
                  alt="Family Music Academy students and teachers at a recital"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div>
                <p className="section-eyebrow">About us</p>
                <h2 className="section-title">
                  Family Music
                  <br />
                  Academy
                </h2>
                <p className="mt-6 text-[1.0625rem] leading-relaxed text-dominant-foreground md:text-lg md:leading-[1.8]">
                  {HOME_INTRO}
                </p>
                <div className="mt-8">
                  <Link href={pageHref("/gallery", "home")} className="btn-primary">
                    Look at our gallery
                  </Link>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section id="why" className="border-t border-accent/10 bg-dominant-muted/50 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <AnimateIn>
            <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
              <div className="flex h-full flex-col">
                <p className="section-eyebrow">Why choose us</p>
                <h2 className="section-title">
                  Why you should choose our academy?
                </h2>
                <ul className="mt-8 flex-1 space-y-4">
                  {WHY_CHOOSE_ITEMS.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-dominant-foreground"
                        aria-hidden
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                        </svg>
                      </span>
                      <span className="text-[1.0625rem] leading-relaxed text-dominant-foreground/90 md:text-lg">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ContactLink className="btn-primary">Enroll on lessons</ContactLink>
                </div>
              </div>

              <div className="flex h-full min-h-0 flex-col gap-3">
                <DiscoverCard
                  href={pageHref("/about", "why")}
                  eyebrow="Meet the Owner"
                  title="Maria Alexeeva"
                  description="Third-generation pianist. St. Petersburg Conservatory graduate. Over 15 years of teaching experience."
                  cta="Read her story"
                  imageSrc="/images/about.png"
                  imagePosition="object-[center_18%]"
                  variant="burgundy"
                />
                <DiscoverCard
                  href={pageHref("/curriculum", "why")}
                  eyebrow="Curriculum"
                  title="Our Program"
                  description="Structured paths for beginners through advanced students, including ABRSM exam preparation."
                  cta="View curriculum"
                  imageSrc="/images/sheet-music.jpg"
                  variant="burgundy"
                />
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}

type DiscoverCardProps = {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  imageSrc: string;
  imagePosition?: string;
  variant: "dark" | "burgundy";
};

function DiscoverCard({
  href,
  eyebrow,
  title,
  description,
  cta,
  imageSrc,
  imagePosition = "object-center",
  variant,
}: DiscoverCardProps) {
  const bg = variant === "dark" ? "bg-secondary-dark" : "bg-secondary";
  const gradient =
    variant === "dark"
      ? "from-secondary-dark/90 via-secondary-dark/55 to-secondary-dark/25"
      : "from-secondary/90 via-secondary/50 to-secondary/20";

  return (
    <Link
      href={href}
      className={`group relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${bg}`}
    >
      <div className="absolute inset-0 opacity-55 transition-opacity duration-500 group-hover:opacity-70">
        <Image
          src={imageSrc}
          alt=""
          fill
          className={`object-cover ${imagePosition} transition-transform duration-700 group-hover:scale-105`}
          sizes="50vw"
        />
      </div>
      <div className={`absolute inset-0 bg-gradient-to-t ${gradient}`} />

      <div className="relative flex flex-1 flex-col p-4 md:p-5">
        <p className="section-eyebrow !mb-0 !text-accent-light">
          {eyebrow}
        </p>
        <h3 className="mt-2 font-serif text-xl font-semibold text-secondary-foreground md:text-2xl">
          {title}
        </h3>
        <p className="mt-2.5 line-clamp-2 flex-1 text-sm leading-relaxed text-secondary-foreground/85 md:text-base">
          {description}
        </p>
        <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold text-accent-light md:text-base">
          {cta}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
