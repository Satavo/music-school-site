import Link from "next/link";
import { NAV_LINKS } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-accent/15 bg-dominant-muted">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-serif text-xl font-semibold text-secondary-dark">
              Family Music Academy
            </p>
            <p className="mt-2 max-w-xs text-base leading-relaxed text-dominant-subtle">
              Classical piano education for the whole family — individualized instruction
              in a warm, encouraging studio.
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
                  className="text-base text-dominant-foreground/70 transition-colors hover:text-secondary"
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
            <div className="mt-4 space-y-2 text-base text-dominant-foreground/70">
              <a href="mailto:info@familymusicacademy.com" className="block hover:text-secondary">
                info@familymusicacademy.com
              </a>
              <a href="tel:+15551234567" className="block hover:text-secondary">
                (555) 123-4567
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-accent/15 pt-6 text-center text-sm text-dominant-subtle sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Family Music Academy. All rights reserved.</p>
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
