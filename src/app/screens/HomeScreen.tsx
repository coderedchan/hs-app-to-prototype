import { ArrowRight, Bell, FileText, Mic, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { JobCard } from "../components/jobs/JobCard";
import { Screen } from "../components/layout/Screen";
import { TabBar } from "../components/layout/TabBar";
import { Button } from "../components/ui/Button";
import { ScoreRing } from "../components/ui/ScoreRing";
import { jobs } from "../data/jobs";
import { user } from "../data/user";
import { useNav } from "../navigation/NavigationProvider";
import { stages, useAppState } from "../state/AppStateProvider";

export function HomeScreen() {
  const { push, goToTab } = useNav();
  const { applications, resumeScore, readiness, sessionsCompleted, stageOf } = useAppState();

  // Best-fit job Maya has not applied to yet.
  const topMatch = jobs.find((j) => {
    const stage = stageOf(j.id);
    return stage === undefined || stage === "saved";
  });
  const hasNewApplication = applications.some((a) => a.isNew);

  const nextStep = !hasNewApplication && topMatch
    ? {
        title: `Apply to ${topMatch.company}`,
        body: `It's your strongest match at ${topMatch.match}%. A tailored resume is ready.`,
        action: () => push({ name: "job", jobId: topMatch.id }),
      }
    : sessionsCompleted === 0
      ? {
          title: "Practice before they call",
          body: "A 6-minute mock interview can raise your readiness score today.",
          action: () => goToTab("coach"),
        }
      : {
          title: "Polish your resume",
          body: "Apply the remaining AI suggestions to lift your score.",
          action: () => goToTab("resume"),
        };

  return (
    <Screen footer={<TabBar active="home" />}>
      <div className="space-y-6 px-5 pt-[max(env(safe-area-inset-top),20px)] pb-6">
        <header className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-full bg-ink text-sm font-bold text-lime">
            {user.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-mute">Welcome back</p>
            <p className="text-lg leading-tight font-extrabold">{user.firstName}</p>
          </div>
          <button
            type="button"
            aria-label="Notifications, 2 new"
            onClick={() => goToTab("tracker")}
            className="relative flex size-11 items-center justify-center rounded-full border border-line bg-card"
          >
            <Bell size={19} />
            <span className="absolute top-2.5 right-3 size-2 rounded-full bg-accent ring-2 ring-card" />
          </button>
        </header>

        <section className="rounded-[28px] bg-ink p-5 text-white">
          <p className="text-xs font-semibold tracking-wide text-lime uppercase">Today's matches</p>
          <p className="mt-2 text-[40px] leading-none font-extrabold tracking-tight">
            {user.newMatches} <span className="text-xl font-bold text-white/70">new jobs</span>
          </p>
          <p className="mt-2 text-sm text-white/70">
            Picked for a {user.targetRole} based on your resume and preferences.
          </p>
          <Button
            variant="lime"
            fullWidth
            className="mt-4"
            trailingIcon={<ArrowRight size={18} />}
            onClick={() => goToTab("jobs")}
          >
            See your matches
          </Button>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <StatTile
            icon={<FileText size={16} />}
            label="Resume score"
            value={resumeScore}
            suffix="/100"
            onClick={() => goToTab("resume")}
          />
          <StatTile
            icon={<Mic size={16} />}
            label="Interview readiness"
            value={readiness}
            suffix="%"
            onClick={() => goToTab("coach")}
          />
        </section>

        <section className="rounded-3xl bg-accent-soft p-4">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wide text-accent uppercase">
            <Sparkles size={14} /> Suggested next step
          </div>
          <p className="mt-2 text-[15px] font-bold">{nextStep.title}</p>
          <p className="mt-1 text-sm text-ink-soft">{nextStep.body}</p>
          <Button variant="accent" size="md" className="mt-3" onClick={nextStep.action}>
            Let's go
          </Button>
        </section>

        {topMatch && (
          <section>
            <SectionTitle title="Top match for you" action="All jobs" onAction={() => goToTab("jobs")} />
            <JobCard job={topMatch} />
          </section>
        )}

        <section>
          <SectionTitle title="Your pipeline" action="Open tracker" onAction={() => goToTab("tracker")} />
          <button
            type="button"
            onClick={() => goToTab("tracker")}
            className="grid w-full grid-cols-4 divide-x divide-line rounded-3xl border border-line bg-card py-4"
          >
            {stages.map((stage) => (
              <span key={stage.id} className="flex flex-col items-center gap-0.5">
                <span className="tabular text-xl font-extrabold">
                  {applications.filter((a) => a.stage === stage.id).length}
                </span>
                <span className="text-xs font-medium text-mute">{stage.label}</span>
              </span>
            ))}
          </button>
        </section>
      </div>
    </Screen>
  );
}

function SectionTitle({ title, action, onAction }: { title: string; action: string; onAction: () => void }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-base font-bold">{title}</h2>
      <button type="button" onClick={onAction} className="text-sm font-semibold text-accent">
        {action}
      </button>
    </div>
  );
}

function StatTile({
  icon,
  label,
  value,
  suffix,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  value: number;
  suffix: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 rounded-3xl border border-line bg-card p-3.5 text-left"
    >
      <ScoreRing value={value} size={46} label={label} suffix={suffix} />
      <span className="min-w-0">
        <span className="flex items-center gap-1 text-mute">{icon}</span>
        <span className="mt-0.5 block text-[13px] leading-tight font-semibold">{label}</span>
      </span>
    </button>
  );
}
