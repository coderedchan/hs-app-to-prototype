export interface ResumeFix {
  id: string;
  title: string;
  detail: string;
  before: string;
  after: string;
  points: number;
}

export const resumeStrengths = [
  "Clear one-page layout that parses cleanly",
  "Portfolio link and contact details up top",
  "Two internships with relevant design work",
];

/** AI suggestions Maya can apply with one tap. Each raises the resume score. */
export const resumeFixes: ResumeFix[] = [
  {
    id: "quantify",
    title: "Quantify your capstone result",
    detail: "Bullets with numbers get read first.",
    before: "Redesigned the campus dining app checkout.",
    after: "Redesigned the campus dining app checkout, cutting order time by 35% in testing with 12 students.",
    points: 5,
  },
  {
    id: "keywords",
    title: "Add missing keywords",
    detail: "8 of your 12 matches ask for these skills by name.",
    before: "Skills: Figma, Sketching, Research",
    after: "Skills: Figma, Prototyping, Design systems, Usability testing, User research",
    points: 4,
  },
  {
    id: "summary",
    title: "Sharpen your summary",
    detail: "Say the role you want in the first line.",
    before: "Passionate designer seeking opportunities.",
    after: "Interaction design graduate seeking a junior product design role focused on mobile.",
    points: 3,
  },
];
