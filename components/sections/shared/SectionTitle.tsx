export interface SectionTitleProps {
  className?: string;
  title: string;
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
    <header className={`mb-4 lg:mb-8 ${className || ""}`}>
      {subtitle && (
        <h2 className="text-muted-foreground text-center text-sm md:text-lg lg:mb-2">{subtitle}</h2>
      )}
      <h1 className="merriweather-font mb-2 text-center text-2xl font-bold lg:text-4xl">{title}</h1>
      {description && (
        <p className="text-muted-foreground mx-auto max-w-150 text-center">{description}</p>
      )}
    </header>
  );
}
