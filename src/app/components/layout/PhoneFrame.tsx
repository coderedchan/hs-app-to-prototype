import type { ReactNode } from "react";

/**
 * On a phone the app fills the screen. On larger screens it is shown inside a
 * device frame so the prototype always reads as a mobile app.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center sm:p-6">
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-ink sm:h-[844px] sm:max-h-full sm:w-[390px] sm:rounded-[48px] sm:border-[10px] sm:border-ink sm:shadow-[0_40px_80px_-30px_rgba(15,15,18,0.55)]">
        {children}
      </div>
    </div>
  );
}
