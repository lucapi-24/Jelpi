"use client";

import { useState } from "react";
import { getTaskColor, getEnergyColor, formatDuration, getPriorityLabel } from "@/features/tasks";
import { defaultBusyBlocks } from "@/mock/availability";
import { loadTasks } from "@/lib/store";
import { DayTimeline, default as TaskTimeBar } from "./TimeProgress";
import SubtaskList from "./SubtaskList";

const DAY_NAMES = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export default function DayDetail({ day }: { day: number }) {
  const [allTasks] = useState(loadTasks);
  const dayTasks = allTasks
    .filter((t) => t.day === day)
    .sort((a, b) => a.startHour - b.startHour);

  const dayBusy = defaultBusyBlocks
    .filter((b) => b.day === day)
    .sort((a, b) => a.startHour - b.startHour);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <a
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-xs text-zinc-400 transition-colors hover:text-zinc-600"
      >
        <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Volver a la semana
      </a>

      <h1 className="mb-1 text-lg font-semibold text-zinc-800">
        {DAY_NAMES[day]}
      </h1>
      <p className="mb-6 text-xs text-zinc-400">
        {dayTasks.length} tarea{dayTasks.length !== 1 ? "s" : ""} programada{dayTasks.length !== 1 ? "s" : ""}
      </p>

      <DayTimeline tasks={dayTasks} />

      <div className="space-y-4">
        {dayTasks.map((task) => {
          const color = getTaskColor(task);
          const energy = getEnergyColor(task.energy);
          return (
            <div
              key={task.id}
              className={`rounded-xl border border-l-4 ${color.border} ${color.bg} p-5`}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-semibold text-zinc-800">
                    {task.title}
                  </h2>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-zinc-500">
                    <span className="inline-flex items-center gap-1">
                      <span className={`inline-block size-1.5 rounded-full ${energy.dot}`} />
                      {formatDuration(task.duration)}
                    </span>
                    <span className="capitalize">{getPriorityLabel(task.priority)}</span>
                    <span className="capitalize">{task.energy}</span>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium ${
                    task.priority === "high"
                      ? "bg-rose-100 text-rose-600"
                      : task.priority === "medium"
                        ? "bg-amber-100 text-amber-600"
                        : "bg-sky-100 text-sky-600"
                  }`}
                >
                  <span className={`inline-block size-1.5 rounded-full ${energy.dot}`} />
                  {task.startHour}:00 – {task.endHour}:00
                </span>
              </div>

              <TaskTimeBar startHour={task.startHour} endHour={task.endHour} />

              {task.subtasks && task.subtasks.length > 0 && (
                <div className="mt-4 border-t border-zinc-200/60 pt-4">
                  <SubtaskList subtasks={task.subtasks} />
                </div>
              )}
            </div>
          );
        })}

        {dayBusy.length > 0 && (
          <section>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Bloques ocupados
            </h3>
            {dayBusy.map((b) => (
              <div
                key={b.id}
                className="mb-2 rounded-xl border border-zinc-200 bg-zinc-50 p-4"
              >
                <p className="text-sm font-medium text-zinc-600">
                  {b.label || "Ocupado"}
                </p>
                <p className="text-xs text-zinc-400">
                  {b.startHour}:00 – {b.endHour}:00
                </p>
              </div>
            ))}
          </section>
        )}

        {dayTasks.length === 0 && (
          <div className="flex flex-col items-center py-16 text-center">
            <div className="mb-3 text-3xl">🌤️</div>
            <p className="text-sm font-medium text-zinc-500">
              No hay tareas programadas para este día
            </p>
            <p className="mt-1 text-xs text-zinc-400">
              Arrastra tareas desde otro día en la vista semanal
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
