export interface TitleProps {
  mainTitle: string;
  subTitle?: string;
  className?: string;
}

export default function Title({ mainTitle, subTitle, className }: TitleProps) {
  return (
    <header className={`text-xl lg:text-2xl ${className || ""}`}>
      <h1 className="gold-color-text font-bold">{mainTitle}</h1>
      {subTitle && <h2 className="text-sm font-medium md:text-base">{subTitle}</h2>}
    </header>
  );
}
