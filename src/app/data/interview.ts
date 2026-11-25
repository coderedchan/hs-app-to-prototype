export interface InterviewQuestion {
  prompt: string;
  tip: string;
  /** Simulated transcript revealed while the mic is "recording". */
  sampleAnswer: string;
}

export interface Coach {
  id: string;
  name: string;
  focus: string;
  level: "Easy" | "Medium" | "Hard";
  minutes: number;
  description: string;
  /** Two gradient stops for the coach orb. */
  orb: [string, string];
  questions: InterviewQuestion[];
  /** Score when every question is answered. */
  baseScore: number;
}

export const coaches: Coach[] = [
  {
    id: "behavioral",
    name: "Nora",
    focus: "Behavioral",
    level: "Medium",
    minutes: 6,
    description: "Teamwork, conflict and ownership stories using the STAR method.",
    orb: ["#8B7BFF", "#E26BF5"],
    baseScore: 78,
    questions: [
      {
        prompt: "Tell me about a time you received tough feedback on your work.",
        tip: "Use STAR: situation, task, action, result.",
        sampleAnswer:
          "During my internship, a senior designer said my checkout flow had too many steps. I mapped each step against the user goal, removed two screens and retested with five users. Completion time dropped by a third.",
      },
      {
        prompt: "Describe a project where you disagreed with a teammate.",
        tip: "Focus on how you resolved it, not who was right.",
        sampleAnswer:
          "On my capstone, an engineer and I disagreed about onboarding length. We agreed to test both versions with eight students. The shorter flow won, and we kept one of his ideas as an optional tour.",
      },
      {
        prompt: "Why do you want to work in product design?",
        tip: "Tie your answer to the company's users.",
        sampleAnswer:
          "I like turning messy problems into something people can use without thinking. Watching a nurse finish a task faster in a usability test is what made me choose this path.",
      },
    ],
  },
  {
    id: "portfolio",
    name: "Theo",
    focus: "Portfolio review",
    level: "Hard",
    minutes: 8,
    description: "Walk through a case study and defend your design decisions.",
    orb: ["#5BC8F5", "#5B47F5"],
    baseScore: 72,
    questions: [
      {
        prompt: "Walk me through the project you're most proud of.",
        tip: "Spend half your time on the problem, not the screens.",
        sampleAnswer:
          "My capstone redesigned the campus dining app. Students abandoned orders at checkout, so I interviewed twelve of them, found the payment step was the blocker and cut order time by 35 percent.",
      },
      {
        prompt: "What would you change if you had two more weeks?",
        tip: "Show you can critique your own work.",
        sampleAnswer:
          "I'd test with students who use screen readers. My contrast passed, but I never validated the flow with assistive technology, and that's a real gap.",
      },
      {
        prompt: "How did you decide what not to build?",
        tip: "Name the trade-off and the evidence behind it.",
        sampleAnswer:
          "We dropped group ordering. Only two of twelve students asked for it, and it would have doubled the build. I documented it as a follow-up with the research attached.",
      },
    ],
  },
  {
    id: "design-challenge",
    name: "Iris",
    focus: "Design challenge",
    level: "Hard",
    minutes: 10,
    description: "Think out loud through a live product design problem.",
    orb: ["#F5A85B", "#F55B8E"],
    baseScore: 70,
    questions: [
      {
        prompt: "Design a way for clinic patients to reschedule an appointment.",
        tip: "Start with who the user is and what could go wrong.",
        sampleAnswer:
          "First I'd ask who reschedules most and why. If it's parents juggling work, the flow should offer the three nearest open slots right away instead of a full calendar.",
      },
      {
        prompt: "How would you know your design is working?",
        tip: "Pick one primary metric and one guardrail.",
        sampleAnswer:
          "Primary metric is reschedules completed without calling the clinic. The guardrail is no-show rate, so we don't make rescheduling easy at the cost of empty slots.",
      },
      {
        prompt: "What's the riskiest assumption in your solution?",
        tip: "Say how you'd test it cheaply.",
        sampleAnswer:
          "That patients trust a suggested slot. I'd test it with a clickable prototype and five patients before any engineering work starts.",
      },
    ],
  },
];

export function getCoach(id: string): Coach {
  const coach = coaches.find((c) => c.id === id);
  if (!coach) throw new Error(`Unknown coach: ${id}`);
  return coach;
}

/** Points lost for each skipped question. */
const SKIP_PENALTY = 8;

/** Session score out of 100, based on how many questions were answered. */
export function sessionScore(coach: Coach, answered: number): number {
  const skipped = coach.questions.length - answered;
  return Math.max(20, coach.baseScore - skipped * SKIP_PENALTY);
}

/** Feedback shown on the insights screen. Offsets are applied to the session score. */
export const insightParams: { label: string; offset: number; summary: string }[] = [
  {
    label: "Clarity",
    offset: 8,
    summary: "Your answers were easy to follow and free of jargon.",
  },
  {
    label: "Structure",
    offset: 2,
    summary: "Good use of STAR. State the result earlier so it lands.",
  },
  {
    label: "Relevance",
    offset: 4,
    summary: "You tied examples to the role. Mention the company's users once more.",
  },
  {
    label: "Confidence",
    offset: -12,
    summary: "A few filler words. Pause instead of saying \"um\" or \"like\".",
  },
];
