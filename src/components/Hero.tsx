import Link from "next/link";
import { ContactLink } from "@/components/ContactLink";
import { HeroBackground } from "@/components/HeroBackground";
import { HeroScrollDown } from "@/components/HeroScrollDown";
import { SCHOOL_CONTACT } from "@/lib/content";
import { pageHref } from "@/lib/navigation";

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <HeroBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-dark/80 via-secondary-dark/55 to-secondary-dark/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/70 via-transparent to-secondary-dark/50" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-36 pb-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(15rem,18rem)] lg:items-center lg:gap-16 xl:gap-24">
          <div>
            <p className="animate-fade-up section-eyebrow !text-accent-light">
              Classical Piano Education
            </p>
            <h1 className="animate-fade-up-delay-1 font-serif text-4xl leading-[1.08] font-semibold text-secondary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-gradient-shimmer">
                Family Music
                <br />
                Academy
              </span>
            </h1>
            <div className="animate-fade-up-delay-2 mt-10 flex flex-wrap gap-4">
              <ContactLink className="btn-primary">
                Schedule a Consultation
              </ContactLink>
              <Link href={pageHref("/about", "home")} className="btn-secondary">
                Meet the Owner
              </Link>
            </div>
          </div>

          <aside className="animate-fade-up-delay-2 text-right">
            <p className="font-serif text-[1.65rem] leading-[1.25] text-secondary-foreground md:text-3xl">
              {SCHOOL_CONTACT.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <a
              href={SCHOOL_CONTACT.phoneHref}
              className="mt-6 block font-serif text-2xl leading-snug text-accent-light transition-colors hover:text-accent md:text-[1.75rem]"
            >
              {SCHOOL_CONTACT.phone}
            </a>
            <a
              href={SCHOOL_CONTACT.emailHref}
              className="mt-3 block text-base leading-relaxed text-secondary-foreground/75 transition-colors hover:text-accent-light md:text-lg"
            >
              {SCHOOL_CONTACT.email}
            </a>
          </aside>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
        <HeroScrollDown />
      </div>
    </section>
  );
}
