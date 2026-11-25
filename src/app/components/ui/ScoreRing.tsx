import { scoreTone, type Tone } from "../../data/jobs";

const strokes: Record<Tone, string> = {
  good: "var(--color-good)",
  warn: "var(--color-warn)",
  low: "var(--color-low)",
};

interface ScoreRingProps {
  value: number;
  size?: number;
  stroke?: number;
  /** Override the automatic tone color (e.g. on dark surfaces). */
  color?: string;
  trackColor?: string;
  suffix?: string;
  label?: string;
  className?: string;
}

/** Circular 0-100 score. Used for match, resume and readiness scores. */
export function ScoreRing({
  value,
  size = 48,
  stroke = 4,
  color,
  trackColor = "var(--color-line)",
  suffix = "%",
  label,
  className = "",
}: ScoreRingProps) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(100, Math.max(0, value)) / 100);

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${label ?? "Score"}: ${value}${suffix}`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={trackColor} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color ?? strokes[scoreTone(value)]}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 600ms ease-out" }}
        />
      </svg>
      <span
        className="tabular absolute inset-0 flex items-center justify-center font-bold"
        style={{ fontSize: Math.round(size * 0.3) }}
      >
        {value}
        {size >= 72 && <span className="text-[0.55em] font-semibold opacity-60">{suffix}</span>}
      </span>
    </div>
  );
}
