import type { Job } from "../../data/jobs";

/** Monogram logo generated from the company name. No real brand marks are used. */
export function CompanyLogo({ job, size = 44 }: { job: Job; size?: number }) {
  const initials = job.company
    .split(" ")
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div
      aria-hidden
      className="flex shrink-0 items-center justify-center rounded-2xl font-bold tracking-tight text-white"
      style={{ width: size, height: size, background: job.logoColor, fontSize: size * 0.34 }}
    >
      {initials}
    </div>
  );
}
