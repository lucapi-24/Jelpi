"use client";

import { formatDuration } from "@/features/tasks/ui-rules";

const SIMULATED_HOUR = 14.3;

export function DayTimeline({
  tasks,
}: {
  tasks: { day: number; startHour: number; endHour: number; title: string; priority: string }[];
}) {
  const START = 7;
  const END = 22;
  const total = END - START;

  return (
    <div className="relative mb-6">
      <div className="flex items-end justify-between text-[10px] text-zinc-400">
        <span>{START}:00</span>
        <span>{END}:00</span>
      </div>
      <div className="relative mt-1 h-8 rounded-lg bg-zinc-100">
        {tasks.map((t) => {
          const left = ((t.startHour - START) / total) * 100;
          const width = ((t.endHour - t.startHour) / total) * 100;
          const isHigh = t.priority === "high";
          return (
            <div
              key={`${t.day}-${t.startHour}`}
              className={`absolute top-1 rounded px-1 py-0.5 text-[9px] font-medium leading-tight ${
                isHigh ? "bg-rose-200 text-rose-700" : "bg-zinc-200 text-zinc-600"
              }`}
              style={{ left: `${left}%`, width: `${width}%`, minWidth: 20 }}
            >
              <span className="truncate block">{t.title}</span>
            </div>
          );
        })}
        <div
          className="absolute top-0 h-full w-0.5 bg-rose-500 shadow-sm"
          style={{ left: `${((SIMULATED_HOUR - START) / total) * 100}%` }}
        />
      </div>
      <div className="mt-0.5 text-right text-[10px] text-rose-500">
        ahora · {Math.floor(SIMULATED_HOUR)}:{SIMULATED_HOUR % 1 === 0 ? "00" : "30"}
      </div>
    </div>
  );
}

export default function TaskTimeBar({
  startHour,
  endHour,
}: {
  startHour: number;
  endHour: number;
}) {
  const duration = endHour - startHour;
  const elapsed = SIMULATED_HOUR - startHour;
  const progress = Math.min(1, Math.max(0, elapsed / duration));
  const remaining = duration - elapsed;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[11px] text-zinc-400">
        <span>
          {startHour}:00 – {endHour}:00
        </span>
        <span>
          {progress >= 1
            ? "Completado"
            : `quedan ${formatDuration(Math.max(0, Math.round(remaining * 60)))}`}
        </span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-zinc-100">
        <div
          className="h-full rounded-full bg-emerald-400 transition-all"
          style={{ width: `${progress * 100}%` }}
        />
        <div
          className="absolute top-0 h-full w-0.5 bg-rose-500"
          style={{ left: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
