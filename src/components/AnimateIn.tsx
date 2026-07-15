"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type AnimateInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** `rise` = from above (default); `fade` = opacity only */
  motion?: "rise" | "fade";
};

export function AnimateIn({
  children,
  className = "",
  delay = 0,
  motion = "rise",
}: AnimateInProps) {
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
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hidden =
    motion === "fade" ? "opacity-0" : "-translate-y-8 opacity-0";
  const shown =
    motion === "fade" ? "opacity-100" : "translate-y-0 opacity-100";

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? shown : hidden} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
