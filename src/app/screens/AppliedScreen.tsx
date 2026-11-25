import { Check, Mic, SquareKanban } from "lucide-react";
import { CompanyLogo } from "../components/jobs/CompanyLogo";
import { ActionBar, Screen } from "../components/layout/Screen";
import { Button } from "../components/ui/Button";
import { getJob } from "../data/jobs";
import { useNav } from "../navigation/NavigationProvider";

/** Final result of the main task: the application is confirmed. */
export function AppliedScreen({ jobId }: { jobId: string }) {
  const job = getJob(jobId);
  const { goToTab } = useNav();

  const timeline = [
    { label: "Application sent", detail: "Just now", done: true },
    { label: "Added to your tracker", detail: "Applied column", done: true },
    { label: "Reply from the hiring team", detail: "Usually within 5 to 7 days", done: false },
  ];

  return (
    <Screen
      footer={
        <ActionBar>
          <Button fullWidth icon={<SquareKanban size={18} />} onClick={() => goToTab("tracker")}>
            Track application
          </Button>
          <Button
            variant="ghost"
            fullWidth
            className="mt-1.5"
            icon={<Mic size={18} />}
            onClick={() => goToTab("coach")}
          >
            Practice for the interview
          </Button>
        </ActionBar>
      }
    >
      <div className="flex min-h-full flex-col items-center justify-center px-6 py-10 text-center">
        <div className="animate-pop-in flex size-24 items-center justify-center rounded-full bg-lime">
          <Check size={44} strokeWidth={2.6} />
        </div>
        <h1 className="mt-6 text-[28px] leading-tight font-extrabold tracking-tight">Application sent</h1>
        <p className="mt-2 text-[15px] text-mute">
          {job.company} now has your resume and note.
        </p>

        <div className="mt-7 w-full rounded-3xl border border-line bg-card p-4 text-left">
          <div className="flex items-center gap-3 border-b border-line pb-4">
            <CompanyLogo job={job} />
            <div className="min-w-0">
              <p className="truncate text-[15px] font-bold">{job.title}</p>
              <p className="truncate text-sm text-mute">{job.company}</p>
            </div>
          </div>
          <ol className="mt-4 space-y-3.5">
            {timeline.map((step) => (
              <li key={step.label} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
                    step.done ? "bg-good text-white" : "border-2 border-line"
                  }`}
                >
                  {step.done && <Check size={12} strokeWidth={3} />}
                </span>
                <span>
                  <span className="block text-sm font-bold">{step.label}</span>
                  <span className="block text-xs text-mute">{step.detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Screen>
  );
}
