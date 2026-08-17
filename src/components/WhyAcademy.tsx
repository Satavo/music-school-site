import Image from "next/image";
import { ClickablePhoto } from "@/components/ClickablePhoto";
import { ContactLink } from "@/components/ContactLink";
import { SectionReveal } from "@/components/SectionReveal";
import { SectionTitle } from "@/components/SectionTitle";
import { HOME_INTRO, WHY_CHOOSE_ITEMS } from "@/lib/content";

export function WhyAcademy() {
  return (
    <>
      <section className="section-pad">
        <div id="who" className="section-shell">
          <SectionReveal>
            <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-10">
              <ClickablePhoto
                item={{
                  id: "who-we-are",
                  type: "image",
                  src: "/images/who-we-are.jpg",
                  alt: "Family Music Academy students and teachers at a recital",
                  caption: "Family Music Academy students and teachers at a recital",
                }}
                className="relative block aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(61,24,35,0.12)] ring-1 ring-line/10 transition-opacity hover:opacity-95 max-lg:shadow-[0_20px_52px_rgba(61,24,35,0.14)] lg:col-start-1"
              >
                <Image
                  src="/images/who-we-are.jpg"
                  alt="Family Music Academy students and teachers at a recital"
                  fill
                  className="pointer-events-none object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </ClickablePhoto>

              <div className="flex flex-col gap-5 sm:gap-6 lg:col-start-2">
                <div className="space-y-5">
                  {HOME_INTRO.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="about-bio-text">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section id="why" className="why-section section-pad border-t border-paper-line/10 bg-paper text-black">
        <div className="section-shell">
          <SectionReveal>
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
              <div className="mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-none lg:col-start-1">
                <SectionTitle className="!text-black">What our students get</SectionTitle>
                <ul className="mt-8 space-y-4 lg:flex-1">
                  {WHY_CHOOSE_ITEMS.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="why-note-icon mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-black"
                        aria-hidden
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                        </svg>
                      </span>
                      <span className="about-bio-text !text-black">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 hidden justify-start lg:flex">
                  <ContactLink className="btn-primary">Enroll on lessons</ContactLink>
                </div>
              </div>

              <ClickablePhoto
                item={{
                  id: "why-concert-stage",
                  type: "image",
                  src: "/images/gallery/concert-stage.png",
                  alt: "Piano performance in a concert hall",
                  caption: "Piano performance in a concert hall",
                }}
                className="relative block aspect-square w-full overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(61,24,35,0.12)] ring-1 ring-line/10 transition-opacity hover:opacity-95 max-lg:shadow-[0_20px_52px_rgba(61,24,35,0.14)] lg:col-start-2"
              >
                <Image
                  src="/images/gallery/concert-stage.png"
                  alt="Piano performance in a concert hall"
                  fill
                  className="pointer-events-none object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </ClickablePhoto>

              <div className="flex justify-center lg:hidden">
                <ContactLink className="btn-primary">Enroll on lessons</ContactLink>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
