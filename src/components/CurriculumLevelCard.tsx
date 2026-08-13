type CurriculumLevel = {
  title: string;
  ages: string;
  description: string;
  highlights: readonly string[];
};

export function CurriculumLevelCard({
  level,
  index,
}: {
  level: CurriculumLevel;
  index: number;
}) {
  return (
    <article className="curriculum-path-card curriculum-path-card-size md:max-w-none md:h-full">
      <div className="flex items-start justify-between gap-4">
        <span className="curriculum-path-card-number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="curriculum-path-card-ages pt-1 text-right">{level.ages}</p>
      </div>

      <h3 className="curriculum-path-card-title mt-4 line-clamp-2">{level.title}</h3>
      <p className="story-block-text mt-3 md:min-h-0 md:flex-1 md:overflow-hidden md:line-clamp-4">
        {level.description}
      </p>

      <ul className="curriculum-carousel-highlights">
        {level.highlights.map((highlight) => (
          <li key={highlight} className="flex items-center gap-2.5 about-bio-text">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
            {highlight}
          </li>
        ))}
      </ul>
    </article>
  );
}
