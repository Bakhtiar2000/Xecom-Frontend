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
      {subtitle && <h2 className="lg:mb-2 text-center text-sm md:text-lg text-muted-foreground">{subtitle}</h2>}
      <h1 className="font-bold text-center merriweather-font lg:text-4xl text-2xl mb-2">
        {title}
      </h1>
      {description && (
        <p className="text-muted-foreground text-center max-w-150 mx-auto">{description}</p>
      )}
    </header>
  );
}
