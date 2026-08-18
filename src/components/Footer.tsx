import Link from "next/link";
import { ContactDetails } from "@/components/ContactDetails";
import { Logo } from "@/components/Logo";
import { NAV_LINKS, SCHOOL_SLOGAN } from "@/lib/content";

export function Footer() {
  return (
    <footer className="footer-top-glass relative z-[2] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="section-shell py-12">
        <div className="grid gap-10 md:grid-cols-3 md:items-stretch">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <Logo variant="mark" tone="light" />
              <p className="font-serif text-xl font-semibold text-dominant-foreground">
                Family Music Academy
              </p>
            </div>
            <p className="about-bio-text mt-3 max-w-xs font-serif text-lg font-medium italic tracking-wide text-dominant-foreground/90">
              {SCHOOL_SLOGAN}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Explore
            </p>
            <nav className="mt-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="about-bio-text transition-colors hover:text-secondary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Contact
            </p>
            <div className="mt-4">
              <ContactDetails compact />
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-center text-sm text-dominant-subtle sm:flex-row sm:text-left">
          <p suppressHydrationWarning>© {new Date().getFullYear()} Family Music Academy. All rights reserved.</p>
          <p className="text-sm text-dominant-subtle/35">
            Developed by{" "}
            <a
              href="https://t.me/Satavo"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-dominant-subtle/55"
            >
              @Satavo
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
