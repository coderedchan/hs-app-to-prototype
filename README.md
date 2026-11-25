# CareerPilot — AI Job Search Assistant

A clickable mobile prototype for the Handshake Figma Make prototype challenge. CareerPilot helps job seekers find matching jobs, apply with an AI-tailored resume, track applications and practice interviews.

It is built with React, TypeScript and Tailwind CSS. Everything runs in the browser on mock data, with no backend and no sign-in.

## Run it

```bash
npm install
npm run dev      # start the local server and open the printed URL
npm run build    # type-check and build to dist/
npm run build:single   # rebuild submission/4-demo/CareerPilot.html (one file, opens with a double-click)
```

On a phone the app fills the screen. On a desktop it is shown inside a phone frame.

## The main task

**Maya, a recent design graduate, finds her best-matching job and applies to it.**

Home → Jobs → Job details → Review application → Application sent → Tracker

Two side flows are also connected: the interview coach (Coach → Session → Insights) and resume analysis (Resume).

## Folder structure

```
hs-prototype/
├── Prototype_Work_Guideline.md   Challenge checklist (plan, build, publish)
├── docs/
│   ├── idea/app-ideas.md         The eight app ideas and why CareerPilot was chosen
│   ├── figma-make-prompt.md      The plan: user, task, screens, final result
│   └── references/               Inspiration screenshots and notes
├── submission/                   Submission kit: prompts, screenshots, text, demo file
├── scripts/                      Build script for the single-file demo
├── index.html                    Page shell and font loading
├── public/                       Static files (favicon)
└── src/
    ├── main.tsx                  Entry point
    ├── styles/
    │   ├── index.css             Tailwind import, base rules, animations
    │   └── theme.css             Design tokens: colors and font
    └── app/
        ├── App.tsx               Maps each route to a screen
        ├── navigation/           Route list and the screen stack (push, back, tabs)
        ├── state/                Shared state: applications, resume score, readiness
        ├── data/                 Mock data: user, jobs, resume fixes, interview coaches
        ├── screens/              One file per screen
        └── components/
            ├── layout/           PhoneFrame, Screen shell, TabBar
            ├── ui/               Button, Chip, ScoreRing, ProgressBar, CoachOrb
            └── jobs/             JobCard, CompanyLogo
```

## Screens

| Screen | File | What it shows |
|--------|------|---------------|
| Home | `screens/HomeScreen.tsx` | New matches, resume score, readiness, next step, pipeline |
| Jobs | `screens/JobsScreen.tsx` | Search, filters, jobs ranked by match score |
| Job details | `screens/JobDetailScreen.tsx` | Compatibility breakdown, skill gaps, role description |
| Review application | `screens/ApplyScreen.tsx` | Tailored resume switch, AI-drafted note, submit |
| Application sent | `screens/AppliedScreen.tsx` | Confirmation and next actions |
| Tracker | `screens/TrackerScreen.tsx` | Applications by stage: Saved, Applied, Interview, Offer |
| Coach | `screens/CoachScreen.tsx` | Choose an AI interview coach |
| Session | `screens/SessionScreen.tsx` | Mock interview with a simulated spoken answer |
| Insights | `screens/InsightsScreen.tsx` | Session score and feedback |
| Resume | `screens/ResumeScreen.tsx` | Resume score and one-tap AI fixes |

## Common changes

- **Edit jobs, the persona or interview questions:** change the files in `src/app/data/`.
- **Change colors or the font:** edit `src/styles/theme.css`. Each token becomes a Tailwind class, for example `--color-ink` gives `bg-ink` and `text-ink`.
- **Add a screen:** add a route in `navigation/routes.ts`, create the file in `screens/`, and add a case in `App.tsx`.

All companies, people and listings are fictional. The "AI" responses are scripted mock data.
