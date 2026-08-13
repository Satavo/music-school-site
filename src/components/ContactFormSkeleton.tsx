export function ContactFormSkeleton() {
  return (
    <div className="space-y-5" aria-hidden="true">
      <div className="space-y-2">
        <div className="h-5 w-32 rounded bg-secondary/10" />
        <div className="input-field h-[50px] bg-dominant-surface/80" />
      </div>
      <div className="space-y-2">
        <div className="h-5 w-40 rounded bg-secondary/10" />
        <div className="input-field h-[50px] bg-dominant-surface/80" />
      </div>
      <div className="btn-primary h-12 w-full opacity-60 sm:w-48" />
    </div>
  );
}
