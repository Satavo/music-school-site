import { Header } from "@/components/Header";
import { HeroBackground } from "@/components/HeroBackground";
import { HeroLoadProvider } from "@/components/HeroLoadGate";
import { HeroMobileContact, HeroStudioContact } from "@/components/HeroStudioContact";
import { HeroVideoCredit } from "@/components/HeroVideoCredit";
import { HeroViewportLock } from "@/components/HeroViewportLock";

export function Hero() {
  return (
    <section
      id="home"
      className="hero-viewport relative flex flex-col lg:min-h-screen lg:items-center lg:justify-end lg:overflow-hidden"
    >
      <HeroLoadProvider>
        <link rel="preload" href="/videos/hero-bg.mp4" as="video" type="video/mp4" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <HeroBackground />
          <div className="absolute inset-0 bg-gradient-to-br from-secondary-dark/78 via-secondary-dark/52 to-secondary-dark/38" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/72 via-secondary-dark/18 to-secondary-dark/50 lg:from-secondary-dark/68 lg:via-transparent lg:to-secondary-dark/48" />
        </div>

        <Header />
        <HeroViewportLock />

        <div className="hero-contact-wrap pointer-events-none relative z-[2] mx-auto flex w-full max-w-7xl flex-1 flex-col items-end justify-end safe-x pb-[max(10rem,env(safe-area-inset-bottom))] pt-[calc(5rem+env(safe-area-inset-top,0px))] max-lg:min-h-0 sm:pb-[max(10.75rem,env(safe-area-inset-bottom))] sm:pt-[calc(5.5rem+env(safe-area-inset-top,0px))] lg:flex-none lg:pb-20 lg:pt-0 xl:pb-24">
          <div className="pointer-events-auto flex w-full flex-col items-end gap-3 sm:gap-4 lg:w-auto">
            <HeroMobileContact />
            <HeroStudioContact />
          </div>
        </div>

        <HeroVideoCredit />
      </HeroLoadProvider>
    </section>
  );
}
