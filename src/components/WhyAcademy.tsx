import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";
import { ContactLink } from "@/components/ContactLink";
import { HOME_INTRO, WHY_CHOOSE_ITEMS } from "@/lib/content";

function AboutHeadings({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full ${className}`.trim()}>
      <p className="section-eyebrow max-lg:mb-2.5">About us</p>
      <h2 className="section-title max-lg:text-[clamp(1.875rem,7.5vw,2.25rem)] max-lg:leading-[1.12] text-balance">
        Family Music Academy
      </h2>
    </div>
  );
}

export function WhyAcademy() {
  return (
    <>
      <section className="section-pad">
        <div id="who" className="section-shell">
          <AnimateIn>
            <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-10">
              <AboutHeadings className="order-1 max-lg:text-center lg:hidden" />

              <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(61,24,35,0.12)] ring-1 ring-secondary/10 max-lg:shadow-[0_20px_52px_rgba(61,24,35,0.14)] lg:order-1 lg:col-start-1">
                <Image
                  src="/images/who-we-are.jpg"
                  alt="Family Music Academy students and teachers at a recital"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

              <div className="order-3 flex flex-col gap-5 sm:gap-6 lg:order-2 lg:col-start-2">
                <AboutHeadings className="hidden lg:block" />
                <p className="about-bio-text">{HOME_INTRO}</p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section id="why" className="section-pad border-t border-secondary/10 bg-dominant-muted/50">
        <div className="section-shell">
          <AnimateIn>
            <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
              <div className="mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-none">
                <p className="section-eyebrow">Why choose us</p>
                <h2 className="section-title">What our students get:</h2>
                <ul className="mt-8 space-y-4 lg:flex-1">
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
                      <span className="about-bio-text">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex justify-center lg:justify-start">
                  <ContactLink className="btn-primary">Enroll on lessons</ContactLink>
                </div>
              </div>

              <div className="hidden min-h-0 flex-col gap-3 lg:flex">
                <DiscoverCard
                  href="/#about"
                  eyebrow="Meet the Owner"
                  title="Maria Alexeeva"
                  description="Third-generation pianist. St. Petersburg Conservatory graduate. Over 15 years of teaching experience."
                  cta="Read her story"
                  imageSrc="/images/about.png"
                  imagePosition="object-[center_18%]"
                  variant="burgundy"
                />
                <DiscoverCard
                  href="/#curriculum"
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
        <p className="section-eyebrow !mb-0 !text-secondary-foreground/90">{eyebrow}</p>
        <h3 className="mt-2 font-serif text-xl font-semibold text-secondary-foreground md:text-2xl">
          {title}
        </h3>
        <p className="about-bio-text mt-2.5 line-clamp-2 flex-1 !text-secondary-foreground/85">
          {description}
        </p>
        <span className="about-bio-text mt-auto inline-flex items-center gap-2 pt-2 font-semibold !text-secondary-foreground">
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
