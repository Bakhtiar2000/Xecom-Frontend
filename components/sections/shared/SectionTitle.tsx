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
      {subtitle && <h2 className="mb-2 text-muted-foreground">{subtitle}</h2>}
      <h1 className="font-bold merriweather-font lg:text-4xl text-2xl mb-2">
        {title}
      </h1>
      {description && (
        <p className="text-muted-foreground max-w-150 mx-auto">{description}</p>
      )}
    </header>
  );
}
