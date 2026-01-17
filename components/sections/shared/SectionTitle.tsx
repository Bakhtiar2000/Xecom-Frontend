export interface SectionTitleProps {
  className?: string;
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function SectionTitle({
  className,
  title,
  subtitle,
  description,
}: SectionTitleProps) {
  return (
    <header className={`${className || ""}`}>
      {subtitle && <h2 className="mb-2 text-muted-foreground">{subtitle}</h2>}
      <h1 className="font-bold merriweather-font lg:text-4xl text-2xl">
        {title}
      </h1>
      {description && (
        <p className="mb-8 text-muted-foreground">{description}</p>
      )}
    </header>
  );
}
