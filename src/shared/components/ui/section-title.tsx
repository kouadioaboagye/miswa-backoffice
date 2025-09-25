import React from "react";
import clsx from "clsx";

type TitleVariant = "primary" | "secondary" | "danger" | "success";

interface SectionTitleProps {
  content: string;
  variant?: TitleVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantStyles: Record<TitleVariant, string> = {
  primary: "text-[#14385C]",
  secondary: "text-gray-600",
  danger: "text-red-600",
  success: "text-green-600",
};

const sizeStyles: Record<"sm" | "md" | "lg", string> = {
  sm: "text-[18px]",
  md: "text-[22px]",
  lg: "text-[28px]",
};

export function SectionTitle({
  content,
  variant = "primary",
  size = "md",
  className,
}: Readonly<SectionTitleProps>) {
  return (
    <h2
      className={clsx(
        "font-semibold mb-4",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {content}
    </h2>
  );
}
