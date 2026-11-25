import { RotateCcw, X } from "lucide-react";
import { ActionBar, Screen } from "../components/layout/Screen";
import { Button } from "../components/ui/Button";
import { ProgressBar } from "../components/ui/ProgressBar";
import { getCoach, insightParams, sessionScore } from "../data/interview";
import { useNav } from "../navigation/NavigationProvider";
import { useAppState } from "../state/AppStateProvider";

export function InsightsScreen({ coachId, answered }: { coachId: string; answered: number }) {
  const coach = getCoach(coachId);
  const { goToTab, replace } = useNav();
  const { readiness } = useAppState();

  const total = coach.questions.length;
  const score = sessionScore(coach, answered);
  const params = insightParams.map((p) => ({
    ...p,
    score: Math.min(10, Math.max(1, Math.round((score + p.offset) / 10))),
  }));

  return (
    <Screen
      dark
      footer={
        <ActionBar dark>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="border border-night-line text-white active:bg-night-card"
              icon={<RotateCcw size={16} />}
              onClick={() => replace({ name: "session", coachId: coach.id })}
            >
              Retry
            </Button>
            <Button variant="accent" className="flex-1" onClick={() => goToTab("home")}>
              Done
            </Button>
          </div>
        </ActionBar>
      }
    >
      <div className="px-5 pt-[max(env(safe-area-inset-top),16px)] pb-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => goToTab("coach")}
            aria-label="Close insights"
            className="flex size-10 items-center justify-center rounded-full border border-night-line bg-night-card"
          >
            <X size={18} />
          </button>
          <h1 className="flex-1 text-center text-[15px] font-bold">Performance insights</h1>
          <span className="w-10" />
        </div>

        <section className="mt-8">
          <p
            className="tabular inline-block bg-clip-text text-[72px] leading-none font-extrabold tracking-tight text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, #7fd4ff, #9d8fff 55%, #e26bf5)" }}
          >
            {score}%
          </p>
          <p className="mt-3 text-[15px] font-semibold">
            Session score with {coach.name} · {coach.focus}
          </p>
          <p className="mt-1 text-sm text-night-mute">
            {answered} of {total} questions answered. Your overall interview readiness is now{" "}
            <span className="font-bold text-white">{readiness}%</span>.
          </p>
        </section>

        <ul className="mt-6 space-y-3">
          {params.map((param) => (
            <li key={param.label} className="rounded-3xl border border-night-line bg-night-card p-4">
              <div className="flex items-center justify-between">
                <p className="text-[15px] font-bold">{param.label}</p>
                <p className="tabular text-[15px] font-bold">
                  {param.score}
                  <span className="text-night-mute">/10</span>
                </p>
              </div>
              <div className="mt-3">
                <ProgressBar
                  value={param.score * 10}
                  color={param.score >= 7 ? "#7fd4ff" : "#f5a85b"}
                  track="var(--color-night-line)"
                />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-night-mute">{param.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </Screen>
  );
}
