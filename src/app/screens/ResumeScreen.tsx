import { ArrowDown, Check, Sparkles } from "lucide-react";
import { Screen } from "../components/layout/Screen";
import { TabBar } from "../components/layout/TabBar";
import { Button } from "../components/ui/Button";
import { Chip } from "../components/ui/Chip";
import { ScoreRing } from "../components/ui/ScoreRing";
import { resumeFixes, resumeStrengths } from "../data/resume";
import { useAppState } from "../state/AppStateProvider";

export function ResumeScreen() {
  const { resumeScore, appliedFixes, applyFix } = useAppState();
  const remaining = resumeFixes.filter((f) => !appliedFixes.includes(f.id));
  const potential = remaining.reduce((sum, f) => sum + f.points, 0);

  return (
    <Screen footer={<TabBar active="resume" />}>
      <div className="space-y-6 px-5 pt-[max(env(safe-area-inset-top),20px)] pb-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Resume</h1>
          <p className="mt-1 text-sm text-mute">AI analysis of how recruiters and screening tools read it.</p>
        </div>

        <section className="flex items-center gap-4 rounded-3xl border border-line bg-card p-4">
          <ScoreRing value={resumeScore} size={92} stroke={8} suffix="" label="Resume score" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">Maya_Chen_Resume.pdf</p>
            <p className="mt-1 text-sm text-mute">
              {remaining.length > 0
                ? `${remaining.length} ${remaining.length === 1 ? "fix" : "fixes"} could add ${potential} points.`
                : "Every suggestion is applied. Nice work."}
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold">What's working</h2>
          <ul className="mt-2.5 space-y-2">
            {resumeStrengths.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-ink-soft">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-good-soft text-good">
                  <Check size={12} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="flex items-center gap-1.5 text-base font-bold">
            <Sparkles size={16} className="text-accent" /> AI suggestions
          </h2>
          <ul className="mt-2.5 space-y-3">
            {resumeFixes.map((fix) => {
              const applied = appliedFixes.includes(fix.id);
              return (
                <li key={fix.id} className="rounded-3xl border border-line bg-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[15px] font-bold">{fix.title}</p>
                      <p className="mt-0.5 text-sm text-mute">{fix.detail}</p>
                    </div>
                    <Chip tone={applied ? "good" : "accent"}>+{fix.points} pts</Chip>
                  </div>
                  <div className="mt-3 rounded-2xl bg-paper p-3 text-sm leading-relaxed">
                    <p className={applied ? "text-mute line-through" : "text-ink-soft"}>{fix.before}</p>
                    <ArrowDown size={14} className="my-1.5 text-mute" />
                    <p className="font-medium">{fix.after}</p>
                  </div>
                  {applied ? (
                    <p className="mt-3 flex items-center gap-1.5 text-sm font-bold text-good">
                      <Check size={16} strokeWidth={3} /> Applied to your resume
                    </p>
                  ) : (
                    <Button variant="accent" size="md" className="mt-3" onClick={() => applyFix(fix.id)}>
                      Apply fix
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </Screen>
  );
}
