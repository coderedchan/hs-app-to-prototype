import { Lightbulb, Mic, Square, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ActionBar, Screen } from "../components/layout/Screen";
import { Button } from "../components/ui/Button";
import { CoachOrb } from "../components/ui/CoachOrb";
import { ProgressBar } from "../components/ui/ProgressBar";
import { getCoach, sessionScore } from "../data/interview";
import { useNav } from "../navigation/NavigationProvider";
import { useAppState } from "../state/AppStateProvider";

type AnswerState = "idle" | "recording" | "done";

/** How fast the simulated transcript appears. */
const MS_PER_WORD = 110;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function SessionScreen({ coachId }: { coachId: string }) {
  const coach = getCoach(coachId);
  const { back, replace } = useNav();
  const { completeSession } = useAppState();

  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<AnswerState>("idle");
  const [wordCount, setWordCount] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const question = coach.questions[index];
  const words = question.sampleAnswer.split(" ");
  const isLast = index === coach.questions.length - 1;

  useEffect(() => {
    const timer = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // While "recording", reveal the transcript one word at a time.
  useEffect(() => {
    if (answer !== "recording") return;
    if (wordCount >= words.length) {
      setAnswer("done");
      return;
    }
    const timer = setTimeout(() => setWordCount((n) => n + 1), MS_PER_WORD);
    return () => clearTimeout(timer);
  }, [answer, wordCount, words.length]);

  const toggleMic = () => {
    if (answer === "idle") setAnswer("recording");
    else if (answer === "recording") setAnswer("done");
  };

  const goNext = (didAnswer: boolean) => {
    const total = answered + (didAnswer ? 1 : 0);
    if (isLast) {
      completeSession(sessionScore(coach, total));
      replace({ name: "insights", coachId: coach.id, answered: total });
      return;
    }
    setAnswered(total);
    setIndex((i) => i + 1);
    setAnswer("idle");
    setWordCount(0);
  };

  const micLabel =
    answer === "idle" ? "Tap to answer" : answer === "recording" ? "Listening… tap to stop" : "Answer recorded";

  return (
    <Screen
      dark
      footer={
        <ActionBar dark>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="text-night-mute active:bg-night-card"
              onClick={() => goNext(false)}
              disabled={answer === "recording"}
            >
              Skip
            </Button>
            <Button
              variant="accent"
              className="flex-1"
              disabled={answer !== "done"}
              onClick={() => goNext(true)}
            >
              {isLast ? "See my insights" : "Next question"}
            </Button>
          </div>
        </ActionBar>
      }
    >
      <div
        className="flex min-h-full flex-col px-5 pt-[max(env(safe-area-inset-top),16px)] pb-6"
        style={{
          background: `radial-gradient(120% 60% at 50% 100%, ${coach.orb[1]}55 0%, ${coach.orb[0]}22 45%, transparent 75%)`,
        }}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={back}
            aria-label="End session"
            className="flex size-10 items-center justify-center rounded-full border border-night-line bg-night-card"
          >
            <X size={18} />
          </button>
          <p className="flex-1 text-center text-sm font-semibold text-night-mute">
            Question {index + 1} of {coach.questions.length}
          </p>
          <p className="tabular w-10 text-right text-sm font-semibold text-night-mute">{formatTime(elapsed)}</p>
        </div>
        <div className="mt-4">
          <ProgressBar
            value={((index + (answer === "done" ? 1 : 0)) / coach.questions.length) * 100}
            color="linear-gradient(90deg, #5b47f5, #e26bf5)"
            track="var(--color-night-line)"
            height={4}
          />
        </div>

        <div className="mt-8 flex items-center gap-3">
          <CoachOrb coach={coach} size={36} />
          <p className="text-sm font-semibold text-night-mute">
            {coach.name} · {coach.focus}
          </p>
        </div>
        <h1 key={index} className="animate-screen-in mt-4 text-[26px] leading-[1.2] font-bold tracking-tight">
          {question.prompt}
        </h1>
        <p className="mt-4 inline-flex items-start gap-2 self-start rounded-2xl border border-night-line bg-night-card/80 px-3 py-2 text-[13px] font-medium text-[#cfc9ff]">
          <Lightbulb size={15} className="mt-0.5 shrink-0" />
          {question.tip}
        </p>

        <div className="mt-6 min-h-24 flex-1" aria-live="polite">
          {wordCount > 0 && (
            <p className="text-[15px] leading-relaxed text-white/90">
              <span className="font-bold text-white">You: </span>
              {words.slice(0, wordCount).join(" ")}
              {answer === "recording" && <span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 bg-white" />}
            </p>
          )}
        </div>

        <div className="mt-4 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={toggleMic}
            disabled={answer === "done"}
            aria-label={micLabel}
            className="relative flex size-20 items-center justify-center rounded-full text-white disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #5b47f5, #e26bf5)" }}
          >
            {answer === "recording" && (
              <span className="animate-pulse-ring absolute inset-0 rounded-full bg-[#e26bf5]" />
            )}
            <span className="relative">
              {answer === "recording" ? <Square size={24} fill="currentColor" /> : <Mic size={30} />}
            </span>
          </button>
          <p className="text-sm font-medium text-night-mute">{micLabel}</p>
        </div>
      </div>
    </Screen>
  );
}
