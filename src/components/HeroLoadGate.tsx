"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type HeroLoadContextValue = {
  markReady: () => void;
};

const HeroLoadContext = createContext<HeroLoadContextValue | null>(null);

export function useHeroLoad() {
  const context = useContext(HeroLoadContext);
  if (!context) {
    throw new Error("useHeroLoad must be used within HeroLoadProvider");
  }
  return context;
}

function HeroLoadScreen({ visible }: { visible: boolean }) {
  return (
    <div
      className={`absolute inset-0 z-[60] flex flex-col items-center justify-center bg-dominant px-6 transition-opacity duration-700 ease-out ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!visible}
      aria-busy={visible}
      aria-label="Loading"
    >
      <div className="hero-load-spinner" aria-hidden />
    </div>
  );
}

export function HeroLoadProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  const markReady = useCallback(() => {
    setReady(true);
  }, []);

  return (
    <HeroLoadContext.Provider value={{ markReady }}>
      {children}
      <HeroLoadScreen visible={!ready} />
    </HeroLoadContext.Provider>
  );
}
