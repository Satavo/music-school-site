"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/content";
import { scrollToContact } from "@/lib/scroll";
import { withHomeReturn } from "@/lib/navigation";

const SCROLL_SECTIONS = ["home", "why", "offers", "gallery"] as const;

function getHashFromHref(href: string) {
  const hashIndex = href.indexOf("#");
  return hashIndex >= 0 ? href.slice(hashIndex) : "";
}

function scrollToHash(hash: string) {
  if (hash === "#home" || !hash) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
}

function resolveActiveSection() {
  if (window.scrollY < 80) return "#home";

  const offset = 120;
  const position = window.scrollY + offset;
  let active = "#home";

  for (const id of SCROLL_SECTIONS) {
    const element = document.getElementById(id);
    if (element && element.offsetTop <= position) {
      active = `#${id}`;
    }
  }

  return active;
}

const PAGE_HERO_PATHS = ["/", "/about", "/curriculum", "/gallery"] as const;

function hasPageHero(pathname: string) {
  return PAGE_HERO_PATHS.includes(pathname as (typeof PAGE_HERO_PATHS)[number]);
}

function resolveScrolledPastHero() {
  const hero = document.getElementById("home") ?? document.getElementById("page-hero");
  if (!hero) return window.scrollY > 80;
  return window.scrollY > hero.offsetHeight - 120;
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const pageHasHero = hasPageHero(pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [scrolledPastHero, setScrolledPastHero] = useState(!pageHasHero);

  const useLightHeader = !pageHasHero || scrolledPastHero || menuOpen;

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    setScrolledPastHero(!hasPageHero(pathname));
  }, [pathname]);

  useEffect(() => {
    if (!pageHasHero) {
      setActiveSection("");
      return;
    }

    if (pathname === "/") {
      const hash = window.location.hash;
      setActiveSection(hash && SCROLL_SECTIONS.includes(hash.slice(1) as (typeof SCROLL_SECTIONS)[number]) ? hash : "#home");
    } else {
      setActiveSection("");
    }

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (pathname === "/") {
          setActiveSection(resolveActiveSection());
        }
        setScrolledPastHero(resolveScrolledPastHero());
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onScroll);
    };
  }, [pathname, pageHasHero]);

  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash;
    if (!hash) return;
    const timer = window.setTimeout(() => scrollToHash(hash), 50);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const contactHref = isHome ? "/#contact" : "#contact";

  const handleNavClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if ((href === "/" || href === "/#home") && isHome) {
        event.preventDefault();
        setActiveSection("#home");
        scrollToHash("#home");
        window.history.pushState(null, "", "/#home");
        setMenuOpen(false);
        return;
      }

      if (href === "#contact" || href === "/#contact") {
        event.preventDefault();
        scrollToContact(pathname);
        setMenuOpen(false);
        return;
      }

      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;

      const path = href.slice(0, hashIndex) || "/";
      const hash = href.slice(hashIndex);

      if (path !== "/" && path !== "") return;

      if (isHome) {
        event.preventDefault();
        if (hash === "#contact") {
          scrollToContact(pathname);
        } else {
          setActiveSection(hash === "#home" || !hash ? "#home" : hash);
          scrollToHash(hash);
          window.history.pushState(null, "", href);
        }
        setMenuOpen(false);
        return;
      }

      event.preventDefault();
      setActiveSection(hash);
      setMenuOpen(false);
      router.push(href);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToHash(hash));
      });
    },
    [isHome, pathname, router],
  );

  const isLinkActive = (href: string) => {
    if (href === "/" || href === "/#home") return isHome && activeSection === "#home";
    if (!href.includes("#")) return pathname === href;
    if (isHome) return getHashFromHref(href) === activeSection;
    return false;
  };

  const shellClass = useLightHeader
    ? "bg-dominant-muted/92 backdrop-blur-xl border-b border-accent/15 shadow-sm"
    : "bg-secondary-dark/40 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.15)]";

  const logoTextClass = useLightHeader ? "text-secondary-dark" : "text-secondary-foreground";
  const menuIconClass = useLightHeader ? "text-secondary-dark" : "text-secondary-foreground";

  const desktopLinkClass = (href: string) => {
    if (isLinkActive(href)) {
      return useLightHeader ? "font-semibold text-secondary" : "font-semibold text-accent-light";
    }
    return useLightHeader
      ? "text-dominant-foreground/75 hover:text-secondary"
      : "text-secondary-foreground/85 hover:text-secondary-foreground";
  };

  const mobileLinkClass = (href: string) => {
    if (isLinkActive(href)) {
      return "bg-secondary/10 font-semibold text-secondary";
    }
    return "text-dominant-foreground/80 hover:bg-secondary/5 hover:text-secondary";
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${shellClass}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link
          href="/#home"
          className="group flex items-center gap-3"
          onClick={(e) => handleNavClick(e, "/#home")}
        >
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-105 ${
              useLightHeader
                ? "bg-secondary text-accent-light"
                : "bg-white/15 text-accent-light ring-1 ring-white/20"
            }`}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </span>
          <span className={`font-serif text-lg font-semibold tracking-wide transition-colors duration-500 md:text-xl ${logoTextClass}`}>
            Family Music Academy
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={isHome ? withHomeReturn(link.href, activeSection) : link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              aria-current={isLinkActive(link.href) ? "page" : undefined}
              className={`text-sm font-medium tracking-wide transition-colors md:text-base ${desktopLinkClass(link.href)}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={contactHref}
            onClick={(e) => handleNavClick(e, contactHref)}
            className="btn-primary !px-5 !py-2.5 !text-sm md:!text-base"
          >
            Book a Lesson
          </Link>
        </nav>

        <button
          type="button"
          className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-500 lg:hidden ${menuIconClass}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-accent/15 bg-dominant-muted px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={isHome ? withHomeReturn(link.href, activeSection) : link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={isLinkActive(link.href) ? "page" : undefined}
                className={`rounded-xl px-3 py-3 font-medium transition-colors ${mobileLinkClass(link.href)}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={contactHref}
              onClick={(e) => handleNavClick(e, contactHref)}
              className="btn-primary mt-2 w-full !py-3 !text-sm"
            >
              Book a Lesson
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
