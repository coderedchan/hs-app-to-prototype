export function ProgressBar({
  value,
  color = "var(--color-ink)",
  track = "var(--color-line)",
  height = 6,
}: {
  value: number;
  color?: string;
  track?: string;
  height?: number;
}) {
  return (
    <div className="w-full overflow-hidden rounded-full" style={{ background: track, height }}>
      <div
        className="h-full rounded-full transition-[width] duration-500 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }}
      />
    </div>
  );
}
