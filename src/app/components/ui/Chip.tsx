import type { ReactNode } from "react";
import type { Tone } from "../../data/jobs";

const tones: Record<Tone | "neutral" | "accent", string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  low: "bg-low-soft text-low",
  neutral: "bg-paper text-ink-soft border border-line",
  accent: "bg-accent-soft text-accent",
};

export function Chip({
  tone = "neutral",
  icon,
  children,
}: {
  tone?: Tone | "neutral" | "accent";
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${tones[tone]}`}
    >
      {icon}
      {children}
    </span>
  );
}

/** Selectable chip used for filters and tabs. */
export function FilterChip({
  active,
  onClick,
  children,
  dark,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  /** Use on the dark coach screens. */
  dark?: boolean;
}) {
  const on = dark ? "bg-white text-night" : "bg-ink text-white";
  const off = dark
    ? "bg-night-card text-night-mute border border-night-line"
    : "bg-card text-ink-soft border border-line";
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`h-9 shrink-0 rounded-full px-4 text-sm font-medium transition-colors ${active ? on : off}`}
    >
      {children}
    </button>
  );
}
