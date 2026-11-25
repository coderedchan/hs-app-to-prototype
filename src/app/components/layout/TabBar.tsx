import { Briefcase, FileText, House, Mic, SquareKanban, type LucideIcon } from "lucide-react";
import { useNav } from "../../navigation/NavigationProvider";
import type { TabName } from "../../navigation/routes";

const tabs: { name: TabName; label: string; icon: LucideIcon }[] = [
  { name: "home", label: "Home", icon: House },
  { name: "jobs", label: "Jobs", icon: Briefcase },
  { name: "tracker", label: "Tracker", icon: SquareKanban },
  { name: "coach", label: "Coach", icon: Mic },
  { name: "resume", label: "Resume", icon: FileText },
];

export function TabBar({ active, dark }: { active: TabName; dark?: boolean }) {
  const { goToTab } = useNav();

  return (
    <nav
      aria-label="Main"
      className={`flex shrink-0 border-t px-2 pt-1.5 pb-[max(env(safe-area-inset-bottom),10px)] ${
        dark ? "border-night-line bg-night" : "border-line bg-card"
      }`}
    >
      {tabs.map(({ name, label, icon: Icon }) => {
        const isActive = name === active;
        const color = isActive ? (dark ? "text-white" : "text-ink") : dark ? "text-night-mute" : "text-mute";
        return (
          <button
            key={name}
            type="button"
            onClick={() => goToTab(name)}
            aria-current={isActive ? "page" : undefined}
            className={`flex flex-1 flex-col items-center gap-1 rounded-2xl py-1.5 text-[11px] font-semibold ${color}`}
          >
            <span
              className={`flex h-7 w-12 items-center justify-center rounded-full transition-colors ${
                isActive ? (dark ? "bg-accent" : "bg-lime") : ""
              }`}
            >
              <Icon size={19} strokeWidth={isActive ? 2.4 : 2} />
            </span>
            {label}
          </button>
        );
      })}
    </nav>
  );
}
