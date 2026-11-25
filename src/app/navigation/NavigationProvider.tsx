import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Route, TabName } from "./routes";

interface Navigation {
  route: Route;
  canGoBack: boolean;
  /** Open a screen on top of the current one. */
  push: (route: Route) => void;
  /** Swap the current screen so Back skips it (used after submitting a form). */
  replace: (route: Route) => void;
  back: () => void;
  /** Jump to a tab and clear the stack. */
  goToTab: (tab: TabName) => void;
}

const NavigationContext = createContext<Navigation | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [stack, setStack] = useState<Route[]>([{ name: "home" }]);

  const push = useCallback((route: Route) => setStack((s) => [...s, route]), []);
  const replace = useCallback((route: Route) => setStack((s) => [...s.slice(0, -1), route]), []);
  const back = useCallback(() => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s)), []);
  const goToTab = useCallback((tab: TabName) => setStack([{ name: tab }]), []);

  const value = useMemo<Navigation>(
    () => ({
      route: stack[stack.length - 1],
      canGoBack: stack.length > 1,
      push,
      replace,
      back,
      goToTab,
    }),
    [stack, push, replace, back, goToTab],
  );

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useNav(): Navigation {
  const nav = useContext(NavigationContext);
  if (!nav) throw new Error("useNav must be used inside NavigationProvider");
  return nav;
}
