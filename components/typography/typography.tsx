import React, { JSX } from "react";

type TypographyVariant = "title" | "subtitle" | "paragraph";

type TypographyProps = {
  variant: TypographyVariant;
  children: React.ReactNode;
  className?: string;
};

const Typography = ({ variant, children, className = "" }: TypographyProps) => {
  const baseStyles = "text-gray-900";

  const variants = {
    title: "text-4xl font-bold",
    subtitle: "text-xl font-semibold text-muted-foreground ",
    paragraph: "text-base text-gray-700  text-muted-foreground",
  };

  const Component = {
    title: "h1",
    subtitle: "h2",
    paragraph: "p",
  }[variant] as keyof JSX.IntrinsicElements;

  return (
    <Component className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </Component>
  );
};

export default Typography;
