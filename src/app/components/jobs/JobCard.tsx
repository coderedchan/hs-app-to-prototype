import { Bookmark, Check, MapPin } from "lucide-react";
import type { Job } from "../../data/jobs";
import { useNav } from "../../navigation/NavigationProvider";
import { useAppState } from "../../state/AppStateProvider";
import { Chip } from "../ui/Chip";
import { ScoreRing } from "../ui/ScoreRing";
import { CompanyLogo } from "./CompanyLogo";

export function JobCard({ job }: { job: Job }) {
  const { push } = useNav();
  const { stageOf, toggleSave } = useAppState();
  const stage = stageOf(job.id);
  const saved = stage === "saved";
  const inPipeline = stage !== undefined && !saved;

  return (
    <article className="relative rounded-3xl border border-line bg-card p-4">
      {/* The whole card opens the job. The bookmark sits above it as its own control. */}
      <button
        type="button"
        onClick={() => push({ name: "job", jobId: job.id })}
        className="absolute inset-0 rounded-3xl"
        aria-label={`${job.title} at ${job.company}, ${job.match}% match`}
      />
      <div className="flex items-start gap-3">
        <CompanyLogo job={job} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-mute">{job.company}</p>
          <h3 className="text-[15px] leading-snug font-bold">{job.title}</h3>
        </div>
        <ScoreRing value={job.match} size={44} label="Match" />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Chip icon={<MapPin size={12} />}>{job.location}</Chip>
        <Chip>{job.type}</Chip>
        {!job.location.startsWith(job.mode) && <Chip>{job.mode}</Chip>}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="tabular text-sm font-bold">{job.salary}</p>
          <p className="text-xs text-mute">
            {job.posted} · {job.applicants} applicants
          </p>
        </div>
        {inPipeline ? (
          <Chip tone="good" icon={<Check size={12} />}>
            {stage === "applied" ? "Applied" : stage === "interview" ? "Interviewing" : "Offer"}
          </Chip>
        ) : (
          <button
            type="button"
            onClick={() => toggleSave(job.id)}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${job.title} from saved` : `Save ${job.title}`}
            className={`relative flex size-10 items-center justify-center rounded-full border transition-colors ${
              saved ? "border-ink bg-ink text-white" : "border-line bg-card text-ink"
            }`}
          >
            <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
          </button>
        )}
      </div>
    </article>
  );
}
