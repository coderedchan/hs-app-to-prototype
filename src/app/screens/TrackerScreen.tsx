import { ArrowRight, Inbox, Mic, PartyPopper } from "lucide-react";
import { useState } from "react";
import { CompanyLogo } from "../components/jobs/CompanyLogo";
import { Screen } from "../components/layout/Screen";
import { TabBar } from "../components/layout/TabBar";
import { Button } from "../components/ui/Button";
import { Chip } from "../components/ui/Chip";
import { getJob } from "../data/jobs";
import { useNav } from "../navigation/NavigationProvider";
import { stages, useAppState, type Application, type Stage } from "../state/AppStateProvider";

const advanceLabel: Record<Stage, string | undefined> = {
  saved: undefined, // Saved jobs move forward by applying.
  applied: "Got an interview",
  interview: "Got an offer",
  offer: undefined,
};

export function TrackerScreen() {
  const { applications } = useAppState();
  const { goToTab } = useNav();
  // Open on the column that holds the application Maya just sent.
  const [stage, setStage] = useState<Stage>(() => applications.find((a) => a.isNew)?.stage ?? "applied");

  const inStage = applications.filter((a) => a.stage === stage);
  const active = applications.filter((a) => a.stage !== "saved").length;

  return (
    <Screen footer={<TabBar active="tracker" />}>
      <div className="px-5 pt-[max(env(safe-area-inset-top),20px)]">
        <h1 className="text-2xl font-extrabold tracking-tight">Tracker</h1>
        <p className="mt-1 text-sm text-mute">
          {active} active {active === 1 ? "application" : "applications"} · all in one place
        </p>
      </div>

      <div role="tablist" aria-label="Stage" className="mx-5 mt-4 grid grid-cols-4 gap-1 rounded-full border border-line bg-card p-1">
        {stages.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={stage === s.id}
            onClick={() => setStage(s.id)}
            className={`flex h-9 items-center justify-center gap-1 rounded-full text-[13px] font-semibold transition-colors ${
              stage === s.id ? "bg-ink text-white" : "text-ink-soft"
            }`}
          >
            {s.label}
            <span className="tabular opacity-60">{applications.filter((a) => a.stage === s.id).length}</span>
          </button>
        ))}
      </div>

      <div className="space-y-3 px-5 pt-4 pb-6">
        {inStage.length > 0 ? (
          inStage.map((app) => <ApplicationCard key={app.jobId} app={app} onMoved={setStage} />)
        ) : (
          <div className="flex flex-col items-center rounded-3xl border border-dashed border-line px-6 py-10 text-center">
            <Inbox size={28} className="text-mute" />
            <p className="mt-3 font-bold">Nothing here yet</p>
            <p className="mt-1 text-sm text-mute">
              {stage === "saved"
                ? "Bookmark jobs to keep them here until you're ready."
                : "Applications move here as they progress."}
            </p>
            <Button variant="outline" size="md" className="mt-4" onClick={() => goToTab("jobs")}>
              Find jobs
            </Button>
          </div>
        )}
      </div>
    </Screen>
  );
}

function ApplicationCard({ app, onMoved }: { app: Application; onMoved: (stage: Stage) => void }) {
  const job = getJob(app.jobId);
  const { push, goToTab } = useNav();
  const { advance } = useAppState();
  const next = advanceLabel[app.stage];

  const moveForward = () => {
    advance(app.jobId);
    // Follow the card to its new column so the change is visible.
    onMoved(app.stage === "applied" ? "interview" : "offer");
  };

  return (
    <article className="rounded-3xl border border-line bg-card p-4">
      <button
        type="button"
        onClick={() => push({ name: "job", jobId: job.id })}
        className="flex w-full items-center gap-3 text-left"
      >
        <CompanyLogo job={job} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-bold">{job.title}</span>
          <span className="block truncate text-sm text-mute">
            {job.company} · {job.location}
          </span>
        </span>
        {app.isNew && <Chip tone="accent">New</Chip>}
      </button>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-line pt-3">
        <p className="flex items-center gap-1.5 text-xs font-medium text-mute">
          {app.stage === "offer" && <PartyPopper size={14} className="text-good" />}
          {app.note}
        </p>
        <span className="tabular text-xs font-bold">{job.match}% match</span>
      </div>

      <div className="mt-3 flex gap-2">
        {app.stage === "saved" && (
          <Button size="md" className="flex-1" onClick={() => push({ name: "apply", jobId: job.id })}>
            Apply now
          </Button>
        )}
        {app.stage === "interview" && (
          <Button
            variant="accent"
            size="md"
            className="flex-1"
            icon={<Mic size={15} />}
            onClick={() => goToTab("coach")}
          >
            Practice
          </Button>
        )}
        {next && (
          <Button
            variant="outline"
            size="md"
            className="flex-1"
            trailingIcon={<ArrowRight size={15} />}
            onClick={moveForward}
          >
            {next}
          </Button>
        )}
      </div>
    </article>
  );
}
