import { FileText, RefreshCw, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { CompanyLogo } from "../components/jobs/CompanyLogo";
import { ActionBar, Screen } from "../components/layout/Screen";
import { Button } from "../components/ui/Button";
import { getJob, skillInSentence, type Job } from "../data/jobs";
import { user } from "../data/user";
import { useNav } from "../navigation/NavigationProvider";
import { useAppState } from "../state/AppStateProvider";

/** Two AI drafts so "Regenerate" visibly changes the note. */
function coverNotes(job: Job): string[] {
  const skills = job.matchedSkills.slice(0, 2).map(skillInSentence).join(" and ");
  return [
    `Hi ${job.company} team,\n\nI'm an interaction design graduate with hands-on experience in ${skills}. My capstone cut checkout time by 35% in testing, and I'd love to bring that focus to the ${job.title} role.\n\nThanks for your time,\n${user.fullName}`,
    `Hello,\n\nThe ${job.title} role stood out because it matches how I like to work: research first, then fast prototypes. I've used ${skills} across two internships and a capstone project.\n\nI'd welcome the chance to talk.\n${user.fullName}`,
  ];
}

export function ApplyScreen({ jobId }: { jobId: string }) {
  const job = getJob(jobId);
  const { replace } = useNav();
  const { apply } = useAppState();
  const drafts = coverNotes(job);
  const [tailored, setTailored] = useState(true);
  const [draftIndex, setDraftIndex] = useState(0);
  const [note, setNote] = useState(drafts[0]);

  const regenerate = () => {
    const next = (draftIndex + 1) % drafts.length;
    setDraftIndex(next);
    setNote(drafts[next]);
  };

  const submit = () => {
    apply(job.id);
    // Replace so Back from the confirmation doesn't return to this form.
    replace({ name: "applied", jobId: job.id });
  };

  return (
    <Screen
      back
      title="Review application"
      footer={
        <ActionBar>
          <Button fullWidth icon={<Send size={17} />} onClick={submit}>
            Submit application
          </Button>
          <p className="mt-2 text-center text-xs text-mute">You can track this from the Tracker tab.</p>
        </ActionBar>
      }
    >
      <div className="space-y-5 px-5 pt-2 pb-6">
        <section className="flex items-center gap-3 rounded-3xl border border-line bg-card p-3.5">
          <CompanyLogo job={job} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-bold">{job.title}</p>
            <p className="truncate text-sm text-mute">
              {job.company} · {job.location}
            </p>
          </div>
          <span className="tabular rounded-full bg-good-soft px-2.5 py-1 text-xs font-bold text-good">
            {job.match}%
          </span>
        </section>

        <section>
          <StepLabel step={1} title="Resume" />
          <div className="rounded-3xl border border-line bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-paper">
                <FileText size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">Maya_Chen_Resume.pdf</p>
                <p className="text-xs text-mute">1 page · updated today</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
              <div>
                <p className="flex items-center gap-1.5 text-sm font-bold">
                  <Sparkles size={15} className="text-accent" /> Tailor for this role
                </p>
                <p className="mt-0.5 text-xs text-mute">
                  {tailored
                    ? `3 bullets reworded to highlight ${skillInSentence(job.matchedSkills[0])} and ${skillInSentence(job.matchedSkills[1])}.`
                    : "Your original resume will be sent as is."}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={tailored}
                aria-label="Tailor resume for this role"
                onClick={() => setTailored((t) => !t)}
                className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${tailored ? "bg-accent" : "bg-line"}`}
              >
                <span
                  className={`absolute top-1 left-1 size-5 rounded-full bg-white shadow transition-transform ${
                    tailored ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        <section>
          <StepLabel step={2} title="Note to the hiring team" />
          <div className="rounded-3xl border border-line bg-card p-4 focus-within:border-ink">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={9}
              aria-label="Note to the hiring team"
              className="block w-full resize-none bg-transparent text-sm leading-relaxed outline-none"
            />
            <div className="mt-2 flex items-center justify-between border-t border-line pt-3">
              <span className="flex items-center gap-1.5 text-xs font-medium text-accent">
                <Sparkles size={13} /> Drafted by AI · edit freely
              </span>
              <button
                type="button"
                onClick={regenerate}
                className="flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-bold"
              >
                <RefreshCw size={13} /> Regenerate
              </button>
            </div>
          </div>
        </section>

        <section>
          <StepLabel step={3} title="Contact" />
          <div className="rounded-3xl border border-line bg-card p-4 text-sm">
            <p className="font-bold">{user.fullName}</p>
            <p className="mt-0.5 text-mute">maya.chen@example.com · (555) 010-0142</p>
          </div>
        </section>
      </div>
    </Screen>
  );
}

function StepLabel({ step, title }: { step: number; title: string }) {
  return (
    <div className="mb-2.5 flex items-center gap-2">
      <span className="tabular flex size-6 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
        {step}
      </span>
      <h2 className="text-base font-bold">{title}</h2>
    </div>
  );
}
