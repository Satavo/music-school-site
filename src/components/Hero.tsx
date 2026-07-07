import Link from "next/link";
import { ContactLink } from "@/components/ContactLink";
import { HeroBackground } from "@/components/HeroBackground";
import { pageHref } from "@/lib/navigation";

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <HeroBackground />      <div className="absolute inset-0 bg-gradient-to-br from-secondary-dark/80 via-secondary-dark/55 to-secondary-dark/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/70 via-transparent to-secondary-dark/50" />

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-36 pb-28">
        <div className="max-w-3xl">
          <p className="animate-fade-up section-eyebrow !text-accent-light">
            Classical Piano Education
          </p>
          <h1 className="animate-fade-up-delay-1 font-serif text-4xl leading-[1.08] font-semibold text-secondary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Where Music Becomes a{" "}
            <span className="text-gradient-shimmer">Family Legacy</span>
          </h1>
          <p className="animate-fade-up-delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-secondary-foreground/90 md:text-xl">
            Welcome to Family Music Academy — a warm, supportive studio offering
            professional one-on-one piano instruction for students of all ages.
          </p>
          <div className="animate-fade-up-delay-2 mt-10 flex flex-wrap gap-4">
            <ContactLink className="btn-primary">
              Schedule a Consultation
            </ContactLink>
            <Link href={pageHref("/about", "home")} className="btn-secondary">
              About the Owner
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
        <Link
          href="#why"
          aria-label="Scroll down"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary-foreground/35 text-secondary-foreground/75 transition-colors hover:border-secondary-foreground/60 hover:text-secondary-foreground"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
