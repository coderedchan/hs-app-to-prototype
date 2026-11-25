import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { resumeFixes } from "../data/resume";
import { user } from "../data/user";

export type Stage = "saved" | "applied" | "interview" | "offer";

export const stages: { id: Stage; label: string }[] = [
  { id: "saved", label: "Saved" },
  { id: "applied", label: "Applied" },
  { id: "interview", label: "Interview" },
  { id: "offer", label: "Offer" },
];

export interface Application {
  jobId: string;
  stage: Stage;
  /** Short status line shown on the tracker card. */
  note: string;
  /** True for the application created during this session. */
  isNew?: boolean;
}

interface AppState {
  applications: Application[];
  resumeScore: number;
  appliedFixes: string[];
  readiness: number;
  sessionsCompleted: number;
  stageOf: (jobId: string) => Stage | undefined;
  toggleSave: (jobId: string) => void;
  apply: (jobId: string) => void;
  advance: (jobId: string) => void;
  applyFix: (fixId: string) => void;
  completeSession: (score: number) => void;
}

const seed: Application[] = [
  { jobId: "fernway-ui", stage: "saved", note: "Saved 3 days ago" },
  { jobId: "kitebase-research", stage: "applied", note: "Applied Nov 18" },
  { jobId: "orbit-intern", stage: "interview", note: "Interview Dec 2 · 10:00 AM" },
];

const nextStage: Record<Stage, Stage | undefined> = {
  saved: "applied",
  applied: "interview",
  interview: "offer",
  offer: undefined,
};

const stageNote: Record<Stage, string> = {
  saved: "Saved just now",
  applied: "Applied just now",
  interview: "Interview to be scheduled",
  offer: "Offer received",
};

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<Application[]>(seed);
  const [appliedFixes, setAppliedFixes] = useState<string[]>([]);
  const [readiness, setReadiness] = useState(user.startingReadiness);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const resumeScore = useMemo(
    () =>
      user.startingResumeScore +
      resumeFixes.filter((f) => appliedFixes.includes(f.id)).reduce((sum, f) => sum + f.points, 0),
    [appliedFixes],
  );

  const stageOf = useCallback(
    (jobId: string) => applications.find((a) => a.jobId === jobId)?.stage,
    [applications],
  );

  const toggleSave = useCallback((jobId: string) => {
    setApplications((apps) => {
      const existing = apps.find((a) => a.jobId === jobId);
      if (!existing) return [{ jobId, stage: "saved", note: stageNote.saved }, ...apps];
      // Only a saved job can be un-saved. Applied jobs stay in the tracker.
      return existing.stage === "saved" ? apps.filter((a) => a.jobId !== jobId) : apps;
    });
  }, []);

  const apply = useCallback((jobId: string) => {
    setApplications((apps) => [
      { jobId, stage: "applied", note: stageNote.applied, isNew: true },
      ...apps.filter((a) => a.jobId !== jobId),
    ]);
  }, []);

  const advance = useCallback((jobId: string) => {
    setApplications((apps) =>
      apps.map((a) => {
        const next = nextStage[a.stage];
        return a.jobId === jobId && next ? { ...a, stage: next, note: stageNote[next] } : a;
      }),
    );
  }, []);

  const applyFix = useCallback((fixId: string) => {
    setAppliedFixes((ids) => (ids.includes(fixId) ? ids : [...ids, fixId]));
  }, []);

  const completeSession = useCallback((score: number) => {
    setReadiness((r) => Math.max(r, score));
    setSessionsCompleted((n) => n + 1);
  }, []);

  const value = useMemo<AppState>(
    () => ({
      applications,
      resumeScore,
      appliedFixes,
      readiness,
      sessionsCompleted,
      stageOf,
      toggleSave,
      apply,
      advance,
      applyFix,
      completeSession,
    }),
    [
      applications,
      resumeScore,
      appliedFixes,
      readiness,
      sessionsCompleted,
      stageOf,
      toggleSave,
      apply,
      advance,
      applyFix,
      completeSession,
    ],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppState {
  const state = useContext(AppStateContext);
  if (!state) throw new Error("useAppState must be used inside AppStateProvider");
  return state;
}
