"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

const SectionRevealContext = createContext<boolean | null>(null);

export function useSectionReveal() {
  return useContext(SectionRevealContext);
}

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  motion?: "rise" | "fade";
};

export function SectionReveal({
  children,
  className = "",
  motion = "rise",
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hidden = motion === "fade" ? "opacity-0" : "-translate-y-8 opacity-0";
  const shown = motion === "fade" ? "opacity-100" : "translate-y-0 opacity-100";

  return (
    <SectionRevealContext.Provider value={visible}>
      <div
        ref={ref}
        className={`transition-all duration-700 ease-out ${visible ? shown : hidden} ${className}`.trim()}
      >
        {children}
      </div>
    </SectionRevealContext.Provider>
  );
}
