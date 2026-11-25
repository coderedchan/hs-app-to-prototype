/** Every screen in the prototype. Add a route here, then render it in App.tsx. */
export type Route =
  | { name: "home" }
  | { name: "jobs" }
  | { name: "job"; jobId: string }
  | { name: "apply"; jobId: string }
  | { name: "applied"; jobId: string }
  | { name: "tracker" }
  | { name: "resume" }
  | { name: "coach" }
  | { name: "session"; coachId: string }
  | { name: "insights"; coachId: string; answered: number };

/** Routes reachable from the bottom tab bar. */
export type TabName = "home" | "jobs" | "tracker" | "coach" | "resume";

export function routeKey(route: Route): string {
  return Object.values(route).join(":");
}
