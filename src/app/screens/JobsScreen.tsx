import { Search, SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import { JobCard } from "../components/jobs/JobCard";
import { Screen } from "../components/layout/Screen";
import { TabBar } from "../components/layout/TabBar";
import { Button } from "../components/ui/Button";
import { FilterChip } from "../components/ui/Chip";
import { jobs, type Job } from "../data/jobs";
import { useAppState } from "../state/AppStateProvider";

type Filter = "All" | "Remote" | "Full-time" | "Internship" | "Saved";
const filters: Filter[] = ["All", "Remote", "Full-time", "Internship", "Saved"];

export function JobsScreen() {
  const { stageOf } = useAppState();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matchesFilter = (job: Job) => {
      if (filter === "All") return true;
      if (filter === "Saved") return stageOf(job.id) === "saved";
      if (filter === "Remote") return job.mode === "Remote";
      return job.type === filter;
    };
    return jobs.filter(
      (job) =>
        matchesFilter(job) &&
        (q === "" || `${job.title} ${job.company} ${job.location}`.toLowerCase().includes(q)),
    );
  }, [query, filter, stageOf]);

  const reset = () => {
    setQuery("");
    setFilter("All");
  };

  return (
    <Screen footer={<TabBar active="jobs" />}>
      <div className="px-5 pt-[max(env(safe-area-inset-top),20px)]">
        <h1 className="text-2xl font-extrabold tracking-tight">Find jobs</h1>
        <p className="mt-1 text-sm text-mute">Ranked by how well each role fits your resume.</p>

        <label className="mt-4 flex h-12 items-center gap-2.5 rounded-full border border-line bg-card px-4 focus-within:border-ink">
          <Search size={18} className="text-mute" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Role, company or city"
            aria-label="Search jobs"
            className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-mute"
          />
        </label>
      </div>

      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto px-5">
        {filters.map((f) => (
          <FilterChip key={f} active={filter === f} onClick={() => setFilter(f)}>
            {f}
          </FilterChip>
        ))}
      </div>

      <div className="space-y-3 px-5 pt-4 pb-6">
        {results.length > 0 ? (
          <>
            <p className="text-xs font-medium text-mute">
              {results.length} {results.length === 1 ? "job" : "jobs"} · best match first
            </p>
            {results.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center rounded-3xl border border-dashed border-line px-6 py-10 text-center">
            <SearchX size={28} className="text-mute" />
            <p className="mt-3 font-bold">No jobs match yet</p>
            <p className="mt-1 text-sm text-mute">
              {filter === "Saved" && query === ""
                ? "Tap the bookmark on a job to save it for later."
                : "Try a different search or clear your filters."}
            </p>
            <Button variant="outline" size="md" className="mt-4" onClick={reset}>
              Show all jobs
            </Button>
          </div>
        )}
      </div>
    </Screen>
  );
}
