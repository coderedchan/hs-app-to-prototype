export type WorkMode = "Remote" | "Hybrid" | "On-site";
export type JobType = "Full-time" | "Internship" | "Contract";

export interface SkillGap {
  name: string;
  /** What CareerPilot suggests doing about it. */
  tip: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  /** Background color for the generated monogram logo. */
  logoColor: string;
  location: string;
  mode: WorkMode;
  type: JobType;
  salary: string;
  posted: string;
  applicants: number;
  /** Overall compatibility score, 0-100. */
  match: number;
  breakdown: { skills: number; experience: number; location: number };
  matchedSkills: string[];
  gaps: SkillGap[];
  about: string;
  responsibilities: string[];
}

/** Fictional companies and listings, sorted by match score. */
export const jobs: Job[] = [
  {
    id: "northwind-jpd",
    title: "Junior Product Designer",
    company: "Northwind Labs",
    logoColor: "#0F0F12",
    location: "Remote · US",
    mode: "Remote",
    type: "Full-time",
    salary: "$68K – $82K",
    posted: "2 days ago",
    applicants: 46,
    match: 94,
    breakdown: { skills: 96, experience: 90, location: 100 },
    matchedSkills: ["Figma", "Prototyping", "User research", "Design systems"],
    gaps: [
      {
        name: "Motion design",
        tip: "Add the animated onboarding from your capstone to your portfolio.",
      },
    ],
    about:
      "Northwind Labs builds scheduling tools for small clinics. You'll join a five-person design team shipping the patient mobile app.",
    responsibilities: [
      "Design and prototype mobile flows from brief to handoff",
      "Run two usability sessions per sprint and share findings",
      "Contribute components to the shared design system",
    ],
  },
  {
    id: "lumen-ux",
    title: "UX Designer",
    company: "Lumen Health",
    logoColor: "#12825A",
    location: "Austin, TX",
    mode: "Hybrid",
    type: "Full-time",
    salary: "$72K – $90K",
    posted: "4 days ago",
    applicants: 112,
    match: 88,
    breakdown: { skills: 86, experience: 84, location: 95 },
    matchedSkills: ["Figma", "User research", "Wireframing"],
    gaps: [
      {
        name: "Accessibility audits",
        tip: "Take the free WCAG basics course and audit one portfolio project.",
      },
      {
        name: "SQL basics",
        tip: "A weekend intro is enough to read product dashboards.",
      },
    ],
    about:
      "Lumen Health makes care-plan software used by home nurses. The role focuses on the tablet experience used during visits.",
    responsibilities: [
      "Map nurse workflows and turn them into clear task flows",
      "Partner with engineers on accessible, touch-first UI",
      "Measure design changes with product analytics",
    ],
  },
  {
    id: "orbit-intern",
    title: "Product Design Intern",
    company: "Orbit Pay",
    logoColor: "#5B47F5",
    location: "New York, NY",
    mode: "On-site",
    type: "Internship",
    salary: "$32 / hr",
    posted: "1 day ago",
    applicants: 203,
    match: 85,
    breakdown: { skills: 92, experience: 88, location: 70 },
    matchedSkills: ["Figma", "Prototyping", "Visual design"],
    gaps: [
      {
        name: "Fintech domain",
        tip: "Mention your budgeting-app class project in the first resume bullet.",
      },
    ],
    about:
      "Orbit Pay helps freelancers get paid faster. Interns own one feature end to end over twelve weeks with a dedicated mentor.",
    responsibilities: [
      "Own the design of one shipped feature",
      "Present work in weekly design critique",
      "Pair with a product manager on discovery",
    ],
  },
  {
    id: "fernway-ui",
    title: "UI Designer",
    company: "Fernway",
    logoColor: "#C2410C",
    location: "Remote · Americas",
    mode: "Remote",
    type: "Contract",
    salary: "$45 – $55 / hr",
    posted: "1 week ago",
    applicants: 58,
    match: 79,
    breakdown: { skills: 84, experience: 66, location: 100 },
    matchedSkills: ["Figma", "Visual design", "Design systems"],
    gaps: [
      {
        name: "2+ years experience",
        tip: "Lead with your two internships and freelance work to close the gap.",
      },
      {
        name: "Illustration",
        tip: "Optional for this role. Skip unless you enjoy it.",
      },
    ],
    about:
      "Fernway is a travel-planning app for group trips. This six-month contract refreshes the booking UI ahead of a relaunch.",
    responsibilities: [
      "Redesign booking screens using the new visual language",
      "Produce responsive specs for web and mobile",
      "Keep the component library in sync with shipped UI",
    ],
  },
  {
    id: "kitebase-research",
    title: "UX Researcher",
    company: "Kitebase",
    logoColor: "#0369A1",
    location: "Seattle, WA",
    mode: "Hybrid",
    type: "Full-time",
    salary: "$75K – $95K",
    posted: "3 days ago",
    applicants: 37,
    match: 73,
    breakdown: { skills: 70, experience: 68, location: 85 },
    matchedSkills: ["User research", "Usability testing"],
    gaps: [
      {
        name: "Survey design",
        tip: "Write up the survey you ran for your thesis as a short case study.",
      },
      {
        name: "Quantitative analysis",
        tip: "Pair your interview findings with one metric in each case study.",
      },
    ],
    about:
      "Kitebase builds developer tools for data teams. Research here is embedded with product squads.",
    responsibilities: [
      "Plan and run generative and evaluative studies",
      "Synthesize findings into clear recommendations",
      "Maintain the research repository",
    ],
  },
  {
    id: "halcyon-ixd",
    title: "Associate Interaction Designer",
    company: "Halcyon Studio",
    logoColor: "#9D174D",
    location: "Chicago, IL",
    mode: "On-site",
    type: "Full-time",
    salary: "$64K – $78K",
    posted: "5 days ago",
    applicants: 29,
    match: 68,
    breakdown: { skills: 78, experience: 72, location: 45 },
    matchedSkills: ["Prototyping", "Wireframing"],
    gaps: [
      {
        name: "Relocation",
        tip: "On-site in Chicago. Your profile prefers remote or hybrid.",
      },
      {
        name: "Agency experience",
        tip: "Highlight the three client projects from your design studio course.",
      },
    ],
    about:
      "Halcyon Studio is a design agency working with museums and cultural institutions on interactive exhibits.",
    responsibilities: [
      "Prototype touch and kiosk interactions",
      "Support senior designers on client workshops",
      "Document interaction patterns for build teams",
    ],
  },
];

export function getJob(id: string): Job {
  const job = jobs.find((j) => j.id === id);
  if (!job) throw new Error(`Unknown job: ${id}`);
  return job;
}

export type Tone = "good" | "warn" | "low";

/** One place that decides how a score is colored everywhere in the app. */
export function scoreTone(score: number): Tone {
  if (score >= 85) return "good";
  if (score >= 70) return "warn";
  return "low";
}

export function scoreLabel(score: number): string {
  if (score >= 85) return "Great match";
  if (score >= 70) return "Good match";
  return "Stretch";
}

const properNouns = ["Figma", "SQL"];

/** Lowercases a skill for use mid-sentence, keeping product names capitalized. */
export function skillInSentence(skill: string): string {
  return properNouns.some((noun) => skill.startsWith(noun)) ? skill : skill.toLowerCase();
}
