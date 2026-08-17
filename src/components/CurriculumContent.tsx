import { AnimateIn } from "@/components/AnimateIn";
import { ContactLink } from "@/components/ContactLink";
import { CurriculumPathsGrid } from "@/components/CurriculumPathsGrid";
import { SectionTitle } from "@/components/SectionTitle";

export function CurriculumContent({ compact = false }: { compact?: boolean }) {
  return (
    <section id="curriculum" className="curriculum-content section-pad">
      <div className="section-shell">
        <div>
          {!compact && (
            <AnimateIn>
              <SectionTitle className="max-w-2xl">Paths for every stage</SectionTitle>
              <p className="section-lead mt-4 max-w-2xl">
                Structured, individualized piano instruction designed for every age and stage — from
                first notes to competition-ready performance.
              </p>
            </AnimateIn>
          )}

          <div className={compact ? "" : "mt-8"}>
            <CurriculumPathsGrid />
          </div>

          {!compact && (
            <AnimateIn delay={80}>
              <div className="mt-8 flex justify-center">
                <ContactLink className="btn-primary">Inquire About Lessons</ContactLink>
              </div>
            </AnimateIn>
          )}
        </div>
      </div>
    </section>
  );
}
