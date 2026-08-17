type CarouselDotsProps = {
  count: number;
  index: number;
  onSelect: (index: number) => void;
  label: string;
  className?: string;
};

export function CarouselDots({
  count,
  index,
  onSelect,
  label,
  className = "mt-4",
}: CarouselDotsProps) {
  return (
    <div
      className={`flex items-center justify-center gap-1.5 ${className}`.trim()}
      role="tablist"
      aria-label={label}
    >
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === index}
          aria-label={`Show slide ${i + 1}`}
          onClick={() => onSelect(i)}
          className={`h-1 rounded-full transition-all duration-300 ${
            i === index ? "w-4 bg-white" : "w-1 bg-white hover:bg-white"
          }`}
        />
      ))}
    </div>
  );
}
