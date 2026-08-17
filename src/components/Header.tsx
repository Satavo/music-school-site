"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { NAV_LINKS } from "@/lib/content";
import { scrollToContact, scrollToSection } from "@/lib/scroll";

const SCROLL_SECTIONS = [
  "home",
  "who",
  "why",
  "policies",
  "about",
  "gallery",
  "contact",
] as const;

function getHashFromHref(href: string) {
  const hashIndex = href.indexOf("#");
  return hashIndex >= 0 ? href.slice(hashIndex) : "";
}

function scrollToHash(hash: string) {
  if (hash === "#home" || !hash) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(null, "", "#home");
    return;
  }

  if (hash === "#contact") {
    scrollToContact("/");
    return;
  }

  scrollToSection(hash.slice(1));
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

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const hash = window.location.hash;
    setActiveSection(
      hash && SCROLL_SECTIONS.includes(hash.slice(1) as (typeof SCROLL_SECTIONS)[number])
        ? hash
        : "#home",
    );

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setActiveSection(resolveActiveSection());
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
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const timer = window.setTimeout(() => scrollToHash(hash), 50);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href === "#contact" || href === "/#contact") {
        event.preventDefault();
        scrollToContact("/");
        setMenuOpen(false);
        return;
      }

      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;

      const hash = href.slice(hashIndex);

      event.preventDefault();
      setActiveSection(hash === "#home" || !hash ? "#home" : hash);
      scrollToHash(hash);
      window.history.pushState(null, "", href);
      setMenuOpen(false);
    },
    [],
  );

  const isLinkActive = (href: string) => getHashFromHref(href) === activeSection;

  const desktopLinkClass = (href: string) => {
    if (isLinkActive(href)) {
      return "font-semibold text-secondary-foreground";
    }
    return "text-secondary-foreground/85 hover:text-secondary-foreground";
  };

  return (
    <header
      className={`absolute top-0 left-0 right-0 z-50 border-b transition-all duration-300 ease-out pt-[calc(env(safe-area-inset-top,0px)+0.5rem)] lg:pt-[env(safe-area-inset-top,0px)] ${
        menuOpen
          ? "border-white/10 bg-secondary-dark/45 backdrop-blur-xl lg:border-transparent lg:bg-transparent lg:backdrop-blur-none"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="section-shell flex items-center justify-between py-3 sm:py-3.5 md:py-5">
        <Link
          href="/#home"
          className="group flex min-w-0 shrink transition-opacity duration-200 hover:opacity-90 lg:transition-none lg:hover:opacity-100"
          onClick={(e) => handleNavClick(e, "/#home")}
        >
          <Logo variant="header" tone="light" priority />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              aria-current={isLinkActive(link.href) ? "page" : undefined}
              className={`text-sm font-medium tracking-wide transition-colors duration-200 md:text-base ${desktopLinkClass(link.href)}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-secondary-foreground transition-colors duration-200 lg:hidden"
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

      <nav
        aria-hidden={!menuOpen}
        className={`mobile-menu lg:hidden ${
          menuOpen
            ? "mobile-menu-open pointer-events-auto border-t border-white/10"
            : "pointer-events-none border-transparent"
        }`}
      >
        <div className="mobile-menu-inner">
          <div className="mobile-menu-content safe-x py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isLinkActive(link.href) ? "page" : undefined}
                  tabIndex={menuOpen ? 0 : -1}
                  className={`rounded-xl px-3 py-3 font-medium transition-colors ${
                    isLinkActive(link.href)
                      ? "bg-white/12 font-semibold text-secondary-foreground"
                      : "text-secondary-foreground/85 hover:bg-white/8 hover:text-secondary-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
