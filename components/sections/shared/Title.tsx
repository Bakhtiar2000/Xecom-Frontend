export interface TitleProps {
  mainTitle: string;
  subTitle?: string;
  className?: string;
}

export default function Title({ mainTitle, subTitle, className }: TitleProps) {
  return (
    <header className={`text-xl md:text-2xl font-bold ${className || ""}`}>
      <h1 className="mb-2">{mainTitle}</h1>
      {subTitle && <h2>{subTitle}</h2>}
    </header>
  );
}
