import { Bookmark, Check, Clock, MapPin, Sparkles, Users } from "lucide-react";
import { CompanyLogo } from "../components/jobs/CompanyLogo";
import { ActionBar, Screen } from "../components/layout/Screen";
import { Button } from "../components/ui/Button";
import { Chip } from "../components/ui/Chip";
import { ProgressBar } from "../components/ui/ProgressBar";
import { ScoreRing } from "../components/ui/ScoreRing";
import { getJob, scoreLabel, scoreTone } from "../data/jobs";
import { useNav } from "../navigation/NavigationProvider";
import { stages, useAppState } from "../state/AppStateProvider";

const toneColor = { good: "var(--color-good)", warn: "var(--color-warn)", low: "var(--color-low)" };

export function JobDetailScreen({ jobId }: { jobId: string }) {
  const job = getJob(jobId);
  const { push, goToTab } = useNav();
  const { stageOf, toggleSave } = useAppState();
  const stage = stageOf(job.id);
  const saved = stage === "saved";
  const applied = stage !== undefined && !saved;

  const breakdown = [
    { label: "Skills", value: job.breakdown.skills },
    { label: "Experience", value: job.breakdown.experience },
    { label: "Location", value: job.breakdown.location },
  ];

  return (
    <Screen
      back
      title="Job details"
      headerRight={
        !applied && (
          <button
            type="button"
            onClick={() => toggleSave(job.id)}
            aria-pressed={saved}
            aria-label={saved ? "Remove from saved" : "Save job"}
            className={`flex size-10 items-center justify-center rounded-full border ${
              saved ? "border-ink bg-ink text-white" : "border-line bg-card"
            }`}
          >
            <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
          </button>
        )
      }
      footer={
        <ActionBar>
          {applied ? (
            <Button variant="outline" fullWidth icon={<Check size={18} />} onClick={() => goToTab("tracker")}>
              {stages.find((s) => s.id === stage)?.label} · View in tracker
            </Button>
          ) : (
            <Button fullWidth icon={<Sparkles size={18} />} onClick={() => push({ name: "apply", jobId: job.id })}>
              Apply with CareerPilot
            </Button>
          )}
        </ActionBar>
      }
    >
      <div className="space-y-5 px-5 pt-2 pb-6">
        <section>
          <CompanyLogo job={job} size={56} />
          <p className="mt-3 text-sm font-medium text-mute">{job.company}</p>
          <h2 className="text-2xl leading-tight font-extrabold tracking-tight">{job.title}</h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Chip icon={<MapPin size={12} />}>{job.location}</Chip>
            <Chip>{job.type}</Chip>
            {!job.location.startsWith(job.mode) && <Chip>{job.mode}</Chip>}
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="tabular font-bold">{job.salary}</span>
            <span className="flex items-center gap-3 text-mute">
              <span className="flex items-center gap-1">
                <Clock size={14} /> {job.posted}
              </span>
              <span className="flex items-center gap-1">
                <Users size={14} /> {job.applicants}
              </span>
            </span>
          </div>
        </section>

        <section className="rounded-3xl border border-line bg-card p-4">
          <div className="flex items-center gap-4">
            <ScoreRing value={job.match} size={84} stroke={7} label="Match" />
            <div>
              <p className="text-xs font-bold tracking-wide text-mute uppercase">Compatibility</p>
              <p className="text-lg font-extrabold">{scoreLabel(job.match)}</p>
              <p className="text-sm text-mute">Based on your resume and preferences</p>
            </div>
          </div>
          <dl className="mt-4 space-y-3">
            {breakdown.map((row) => (
              <div key={row.label}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <dt className="font-medium">{row.label}</dt>
                  <dd className="tabular font-bold">{row.value}%</dd>
                </div>
                <ProgressBar value={row.value} color={toneColor[scoreTone(row.value)]} />
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h3 className="text-base font-bold">Why you match</h3>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {job.matchedSkills.map((skill) => (
              <Chip key={skill} tone="good" icon={<Check size={12} />}>
                {skill}
              </Chip>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-base font-bold">
            Skill gaps <span className="font-medium text-mute">· {job.gaps.length}</span>
          </h3>
          <ul className="mt-2.5 space-y-2">
            {job.gaps.map((gap) => (
              <li key={gap.name} className="rounded-2xl bg-accent-soft p-3.5">
                <p className="text-sm font-bold">{gap.name}</p>
                <p className="mt-1 flex gap-1.5 text-sm text-ink-soft">
                  <Sparkles size={14} className="mt-0.5 shrink-0 text-accent" />
                  {gap.tip}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-base font-bold">About the role</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{job.about}</p>
          <ul className="mt-3 space-y-2">
            {job.responsibilities.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ink" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Screen>
  );
}
