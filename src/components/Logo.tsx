type LogoProps = {
  /** Full circular logo, compact mark, or header-sized logo */
  variant?: "full" | "mark" | "header";
  /** White logo for dark backgrounds, black for light */
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
  alt?: string;
};

const SIZES = {
  full: {
    width: 220,
    height: 157,
    className: "block h-auto w-[min(100%,14rem)] object-contain sm:w-52 md:w-56",
  },
  mark: {
    width: 44,
    height: 32,
    className: "block h-10 w-auto max-w-[2.75rem] object-contain md:h-11 md:max-w-[3rem]",
  },
  header: {
    width: 200,
    height: 143,
    className:
      "block h-[clamp(3.25rem,14vw,4.5rem)] w-auto object-contain sm:h-[4.25rem] md:h-[4.75rem] lg:h-20",
  },
} as const;

export function Logo({
  variant = "full",
  tone = "dark",
  className = "",
  priority = false,
  alt = "Family Music Academy",
}: LogoProps) {
  const { width, height, className: sizeClass } = SIZES[variant];
  const src = tone === "light" ? "/images/logo-light.png" : "/images/logo.png";

  return (
    // Native img keeps PNG alpha without optimizer flattening transparency.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={`${sizeClass} ${className}`.trim()}
    />
  );
}
