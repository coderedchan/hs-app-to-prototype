import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";
import { useNav } from "../../navigation/NavigationProvider";

interface ScreenProps {
  /** Shown in the top bar. Omit for screens that draw their own header. */
  title?: string;
  /** Show a back button in the top bar. */
  back?: boolean;
  headerRight?: ReactNode;
  /** Pinned to the bottom: a tab bar or a primary action. */
  footer?: ReactNode;
  /** Dark variant used by the interview coach screens. */
  dark?: boolean;
  children: ReactNode;
}

/** Page shell: optional top bar, scrolling body, pinned footer. */
export function Screen({ title, back, headerRight, footer, dark, children }: ScreenProps) {
  const nav = useNav();
  const hasHeader = title !== undefined || back || headerRight;

  return (
    <div className={`flex min-h-0 flex-1 flex-col ${dark ? "bg-night text-white" : "bg-paper text-ink"}`}>
      {hasHeader && (
        <header className="mt-[env(safe-area-inset-top)] flex h-14 shrink-0 items-center gap-2 px-4">
          {back && (
            <button
              type="button"
              onClick={nav.back}
              aria-label="Back"
              className={`-ml-1 flex size-10 items-center justify-center rounded-full border ${
                dark ? "border-night-line bg-night-card" : "border-line bg-card"
              }`}
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <h1 className="min-w-0 flex-1 truncate text-center text-[15px] font-bold">{title}</h1>
          {/* Keeps the title centered when there is no right-hand action. */}
          <div className="flex min-w-10 justify-end">{headerRight}</div>
        </header>
      )}
      <main className="no-scrollbar animate-screen-in min-h-0 flex-1 overflow-y-auto">{children}</main>
      {footer}
    </div>
  );
}

/** Bottom bar that holds a screen's primary action. */
export function ActionBar({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <div
      className={`shrink-0 border-t px-5 pt-3 pb-[max(env(safe-area-inset-bottom),16px)] ${
        dark ? "border-night-line bg-night" : "border-line bg-paper"
      }`}
    >
      {children}
    </div>
  );
}
