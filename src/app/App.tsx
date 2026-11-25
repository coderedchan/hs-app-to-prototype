import { PhoneFrame } from "./components/layout/PhoneFrame";
import { NavigationProvider, useNav } from "./navigation/NavigationProvider";
import { routeKey, type Route } from "./navigation/routes";
import { AppliedScreen } from "./screens/AppliedScreen";
import { ApplyScreen } from "./screens/ApplyScreen";
import { CoachScreen } from "./screens/CoachScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { InsightsScreen } from "./screens/InsightsScreen";
import { JobDetailScreen } from "./screens/JobDetailScreen";
import { JobsScreen } from "./screens/JobsScreen";
import { ResumeScreen } from "./screens/ResumeScreen";
import { SessionScreen } from "./screens/SessionScreen";
import { TrackerScreen } from "./screens/TrackerScreen";
import { AppStateProvider } from "./state/AppStateProvider";

function renderScreen(route: Route) {
  switch (route.name) {
    case "home":
      return <HomeScreen />;
    case "jobs":
      return <JobsScreen />;
    case "job":
      return <JobDetailScreen jobId={route.jobId} />;
    case "apply":
      return <ApplyScreen jobId={route.jobId} />;
    case "applied":
      return <AppliedScreen jobId={route.jobId} />;
    case "tracker":
      return <TrackerScreen />;
    case "resume":
      return <ResumeScreen />;
    case "coach":
      return <CoachScreen />;
    case "session":
      return <SessionScreen coachId={route.coachId} />;
    case "insights":
      return <InsightsScreen coachId={route.coachId} answered={route.answered} />;
  }
}

function CurrentScreen() {
  const { route } = useNav();
  // Keying by route remounts the screen, which resets scroll and local state.
  return (
    <div key={routeKey(route)} className="flex min-h-0 flex-1 flex-col overflow-hidden sm:rounded-[38px]">
      {renderScreen(route)}
    </div>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <NavigationProvider>
        <PhoneFrame>
          <CurrentScreen />
        </PhoneFrame>
      </NavigationProvider>
    </AppStateProvider>
  );
}
