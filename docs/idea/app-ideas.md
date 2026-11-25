# Recommended app ideas for the Figma prototype challenge

Scores are subjective assessments of prototype suitability, not official competition judging scores.

| # | App | Purpose | Target users | Difficulty | Score |
|---|-----|---------|--------------|------------|-------|
| 1 | **CareerPilot** — AI Job Search Assistant | Help job seekers find suitable jobs, manage applications and prepare for interviews. | Students, recent graduates and working professionals | Medium | 9.3 |
| 2 | **FreshLoop** — Food Waste Marketplace | Reduce food waste by connecting restaurants and supermarkets with customers looking for discounted food. | Restaurants, supermarkets and budget-conscious consumers | Medium | 9.0 |
| 3 | **StudyFlow** — AI Learning Companion | Help students study more efficiently through personalized AI-powered learning tools. | College students and independent learners | Easy to medium | 9.0 |
| 4 | **FreelanceOS** — Freelancer Management Platform | Help freelancers manage their entire business through a single application. | Freelancers, contractors and independent professionals | Medium | 8.7 |
| 5 | **DocMind** — AI Document Assistant | Help users understand, organize and extract useful information from complex documents. | Professionals, researchers and students | Easy to medium | 8.7 |
| 6 | **SpendWise** — Smart Financial Assistant | Help users manage their personal finances and improve spending habits. | Students, young professionals and households | Medium | 8.7 |
| 7 | **SkillSwap** — Peer-to-Peer Learning Marketplace | Create a community where people exchange knowledge and skills without monetary payments. | Students, professionals and lifelong learners | Medium | 8.3 |
| 8 | **CareBridge** — Personal Healthcare Organizer | Help individuals manage their healthcare information and daily medical responsibilities. | Patients, caregivers and families | Medium | 8.3 |

## Final recommendation

1. **CareerPilot** (chosen)
2. FreshLoop
3. StudyFlow

CareerPilot directly aligns with Handshake's career-focused audience, demonstrates practical AI capabilities and offers strong opportunities for professional UI/UX design.

## CareerPilot core features and where they live in the prototype

| Feature | Screen | File |
|---------|--------|------|
| Career progress dashboard | Home | `src/app/screens/HomeScreen.tsx` |
| Job compatibility scoring | Jobs, Job details | `JobsScreen.tsx`, `JobDetailScreen.tsx` |
| Skill gap analysis | Job details | `JobDetailScreen.tsx` |
| AI resume analysis and improvement suggestions | Resume | `ResumeScreen.tsx` |
| Job application tracking | Tracker | `TrackerScreen.tsx` |
| Personalized interview preparation | Coach, Session, Insights | `CoachScreen.tsx`, `SessionScreen.tsx`, `InsightsScreen.tsx` |
| Recruiter communication management | AI-drafted note in Review application | `ApplyScreen.tsx` |
