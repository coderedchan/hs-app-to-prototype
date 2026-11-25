import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "accent" | "lime" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white active:bg-ink-soft",
  accent: "bg-accent text-white active:opacity-90",
  lime: "bg-lime text-ink active:opacity-90",
  outline: "border border-line bg-card text-ink active:bg-paper",
  ghost: "text-ink active:bg-line/60",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "md" | "lg";
  fullWidth?: boolean;
  icon?: ReactNode;
  trailingIcon?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "lg",
  fullWidth,
  icon,
  trailingIcon,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={[
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[transform,opacity,background-color] active:scale-[0.98] disabled:opacity-45 disabled:active:scale-100",
        size === "lg" ? "h-13 px-6 text-[15px]" : "h-10 px-4 text-sm",
        fullWidth ? "w-full" : "",
        variants[variant],
        className,
      ].join(" ")}
      {...rest}
    >
      {icon}
      {children}
      {trailingIcon}
    </button>
  );
}
