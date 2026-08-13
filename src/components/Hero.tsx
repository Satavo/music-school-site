import { Header } from "@/components/Header";
import { HeroBackground } from "@/components/HeroBackground";
import { HeroAddress, HeroInstagram, HeroStudioContact } from "@/components/HeroStudioContact";
import { HeroViewportLock } from "@/components/HeroViewportLock";

export function Hero() {
  return (
    <section
      id="home"
      className="hero-viewport relative flex flex-col overflow-hidden lg:min-h-screen lg:items-center lg:justify-center"
    >
      <link rel="preload" href="/videos/hero-bg.mp4" as="video" type="video/mp4" />
      <HeroBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-dark/85 via-secondary-dark/60 to-secondary-dark/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/80 via-secondary-dark/20 to-secondary-dark/55 lg:from-secondary-dark/75 lg:via-transparent lg:to-secondary-dark/55" />

      <Header />
      <HeroViewportLock />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center safe-x pb-[max(4.5rem,env(safe-area-inset-bottom))] pt-[calc(5rem+env(safe-area-inset-top,0px))] max-lg:min-h-0 sm:pt-[calc(5.5rem+env(safe-area-inset-top,0px))] lg:flex-none lg:pb-16 lg:pt-28">
        <div className="flex items-start justify-between gap-3 sm:gap-4 lg:grid lg:grid-cols-[minmax(0,1.2fr)_auto] lg:items-center lg:gap-12 xl:gap-20">
          <div className="min-w-0 flex-1 pl-5 pt-10 lg:pl-4 lg:pt-0">
            <h1 className="animate-fade-up-delay-1 font-serif text-[clamp(3rem,14vw,4.75rem)] leading-[1.04] font-semibold text-secondary-foreground sm:text-[clamp(3.75rem,13vw,5.5rem)] lg:text-7xl lg:leading-[1.04] xl:text-[5rem]">
              <span className="text-gradient-shimmer">
                Music
                <br />
                shapes
                <br />
                the Mind
              </span>
            </h1>

            <div className="mt-5 flex flex-col gap-2.5 max-lg:mt-6 sm:gap-3 lg:hidden">
              <HeroAddress className="animate-fade-up-delay-2" />
              <HeroInstagram className="animate-fade-up-delay-2" />
            </div>
          </div>

          <HeroStudioContact />
        </div>
      </div>
    </section>
  );
}
