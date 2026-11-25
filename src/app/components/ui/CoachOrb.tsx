import type { Coach } from "../../data/interview";

/** Abstract gradient avatar for an AI coach. */
export function CoachOrb({ coach, size = 56, active }: { coach: Coach; size?: number; active?: boolean }) {
  const [from, to] = coach.orb;
  return (
    <span className="relative flex shrink-0 items-center justify-center" style={{ width: size, height: size }} aria-hidden>
      {active && (
        <span className="animate-pulse-ring absolute inset-0 rounded-full" style={{ background: to }} />
      )}
      <span
        className="relative block size-full rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 28%, #ffffff 0%, ${from} 28%, ${to} 70%, #1a1440 100%)`,
          boxShadow: `0 0 ${size * 0.5}px -${size * 0.12}px ${to}`,
        }}
      />
    </span>
  );
}
