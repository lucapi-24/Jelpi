import type { Task } from "@/types";
import { getTaskColor, getEnergyColor, formatDuration } from "@/features/tasks";

export default function TaskCard({ task }: { task: Task }) {
  const color = getTaskColor(task);
  const energy = getEnergyColor(task.energy);
  const isDone = task.status === "done";

  return (
    <div
      className={`flex items-start gap-3 rounded-lg border border-l-4 border-transparent p-3
        ${color.border} ${color.bg} ${isDone ? "opacity-50" : ""}`}
    >
      <div
        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border-2
          ${
            isDone
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-zinc-300"
          }`}
      >
        {isDone && (
          <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <span
          className={`text-sm font-medium ${
            isDone ? "line-through text-zinc-400" : "text-zinc-800"
          }`}
        >
          {task.title}
        </span>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5">
          <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
            <span className={`inline-block size-1.5 rounded-full ${energy.dot}`} />
            {formatDuration(task.duration)}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
            <span className="inline-block size-1 rounded-full bg-zinc-300" />
            <span className={energy.text}>{task.energy}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
