import { ArrowRight, Check, Clock, MessageCircleQuestion } from "lucide-react";
import { useState } from "react";
import { ActionBar, Screen } from "../components/layout/Screen";
import { TabBar } from "../components/layout/TabBar";
import { Button } from "../components/ui/Button";
import { CoachOrb } from "../components/ui/CoachOrb";
import { ProgressBar } from "../components/ui/ProgressBar";
import { coaches } from "../data/interview";
import { useNav } from "../navigation/NavigationProvider";
import { useAppState } from "../state/AppStateProvider";

export function CoachScreen() {
  const { push } = useNav();
  const { readiness, sessionsCompleted } = useAppState();
  const [selectedId, setSelectedId] = useState(coaches[0].id);
  const selected = coaches.find((c) => c.id === selectedId) ?? coaches[0];

  return (
    <Screen
      dark
      footer={
        <>
          <ActionBar dark>
            <Button
              variant="accent"
              fullWidth
              trailingIcon={<ArrowRight size={18} />}
              onClick={() => push({ name: "session", coachId: selected.id })}
            >
              Start session with {selected.name}
            </Button>
          </ActionBar>
          <TabBar active="coach" dark />
        </>
      }
    >
      <div className="px-5 pt-[max(env(safe-area-inset-top),20px)] pb-6">
        <p className="text-xs font-bold tracking-[0.14em] text-[#9d8fff] uppercase">AI interview prep</p>
        <h1 className="mt-2 text-[28px] leading-tight font-extrabold tracking-tight">Choose your coach</h1>

        <section className="mt-5 rounded-3xl border border-night-line bg-night-card p-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-medium text-night-mute">Interview readiness</p>
              <p className="tabular mt-0.5 text-3xl font-extrabold">{readiness}%</p>
            </div>
            <p className="text-xs text-night-mute">
              {sessionsCompleted === 0
                ? "No sessions yet today"
                : `${sessionsCompleted} ${sessionsCompleted === 1 ? "session" : "sessions"} today`}
            </p>
          </div>
          <div className="mt-3">
            <ProgressBar
              value={readiness}
              color="linear-gradient(90deg, #5b47f5, #e26bf5)"
              track="var(--color-night-line)"
            />
          </div>
        </section>

        <div role="radiogroup" aria-label="Coach" className="mt-4 space-y-3">
          {coaches.map((coach) => {
            const isSelected = coach.id === selectedId;
            return (
              <button
                key={coach.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelectedId(coach.id)}
                className={`flex w-full items-center gap-4 rounded-3xl border p-4 text-left transition-colors ${
                  isSelected ? "border-accent bg-[#1d1a3d]" : "border-night-line bg-night-card"
                }`}
              >
                <CoachOrb coach={coach} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-base font-bold">{coach.name}</span>
                    <span className="rounded-full border border-night-line px-2 py-0.5 text-[11px] font-semibold text-night-mute">
                      {coach.level}
                    </span>
                  </span>
                  <span className="block text-sm font-semibold text-[#b9b0ff]">{coach.focus}</span>
                  <span className="mt-1 block text-[13px] leading-snug text-night-mute">{coach.description}</span>
                  <span className="mt-2 flex items-center gap-3 text-xs text-night-mute">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {coach.minutes} min
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircleQuestion size={12} /> {coach.questions.length} questions
                    </span>
                  </span>
                </span>
                <span
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full border ${
                    isSelected ? "border-accent bg-accent" : "border-night-line"
                  }`}
                >
                  {isSelected && <Check size={14} strokeWidth={3} />}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </Screen>
  );
}
