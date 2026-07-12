"use client";

import type { BusyBlock } from "@/types";
import { getEnergyColor } from "@/features/tasks";
import { getEnergyNoun } from "@/features/tasks/ui-rules";

const DAY_NAMES = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const energies = ["low", "medium", "high"] as const;
const priorities = ["low", "medium", "high"] as const;

const completed = 0;
const total = 12;

export default function Sidebar({
  busyBlocks,
  onNewTask,
}: {
  busyBlocks: BusyBlock[];
  onNewTask?: () => void;
}) {
  return (
    <aside className="flex h-full flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-zinc-800">
          jelpi
        </h1>
        <p className="mt-0.5 text-xs text-zinc-400">organización adaptativa</p>
      </div>

      <button
        onClick={onNewTask}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-700"
      >
        <svg
          className="size-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Nueva tarea
      </button>

      <section>
        <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
          Tu energía
        </h2>
        <div className="flex flex-col gap-1">
          {energies.map((e) => {
            const ec = getEnergyColor(e);
            const active = e === "medium";
            return (
              <div
                key={e}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  active ? "bg-zinc-800 text-white" : "text-zinc-500"
                }`}
              >
                <span
                  className={`inline-block size-2 rounded-full ${ec.dot} ${
                    active ? "" : "opacity-60"
                  }`}
                />
                <span>{getEnergyNoun(e)}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
            Bloques ocupados
          </h2>
          <span className="text-[11px] font-medium text-zinc-500">+ Añadir</span>
        </div>

        <div className="mb-3 space-y-2 rounded-lg border border-zinc-200 bg-zinc-50 p-3">
          <div>
            <label className="mb-0.5 block text-[10px] font-medium text-zinc-500">
              Día
            </label>
            <div className="w-full rounded-md border border-zinc-200 bg-white px-2 py-1.5 text-xs text-zinc-700">
              Lun
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-0.5 block text-[10px] font-medium text-zinc-500">
                Inicio
              </label>
              <div className="w-full rounded-md border border-zinc-200 bg-white px-2 py-1.5 text-xs text-zinc-700">
                9:00
              </div>
            </div>
            <div>
              <label className="mb-0.5 block text-[10px] font-medium text-zinc-500">
                Fin
              </label>
              <div className="w-full rounded-md border border-zinc-200 bg-white px-2 py-1.5 text-xs text-zinc-700">
                10:00
              </div>
            </div>
          </div>
          <div>
            <label className="mb-0.5 block text-[10px] font-medium text-zinc-500">
              Etiqueta
            </label>
            <div className="w-full rounded-md border border-zinc-200 bg-white px-2 py-1.5 text-xs text-zinc-300">
              Opcional
            </div>
          </div>
          <div className="w-full rounded-md bg-zinc-800 px-3 py-1.5 text-center text-xs font-medium text-white">
            Añadir bloque
          </div>
        </div>

        <div className="space-y-1">
          {busyBlocks.map((b) => (
            <div
              key={b.id}
              className="flex items-center justify-between rounded-md bg-zinc-50 px-3 py-2"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-zinc-600">
                  {b.label || "Ocupado"}
                </p>
                <p className="text-[10px] text-zinc-400">
                  {DAY_NAMES[b.day]} {b.startHour}:00 – {b.endHour}:00
                </p>
              </div>
              <svg
                className="size-3.5 shrink-0 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
          Filtros
        </h2>

        <div className="space-y-3">
          <div>
            <p className="mb-1.5 text-xs text-zinc-400">Estado</p>
            <div className="flex gap-1">
              {(["all", "todo", "done"] as const).map((s) => (
                <div
                  key={s}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium ${
                    s === "all"
                      ? "bg-zinc-800 text-white"
                      : "bg-zinc-100 text-zinc-500"
                  }`}
                >
                  {s === "all"
                    ? "Todas"
                    : s === "todo"
                      ? "Pendientes"
                      : "Hechas"}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-1.5 text-xs text-zinc-400">Prioridad</p>
            <div className="flex flex-wrap gap-1">
              {priorities.map((p) => (
                <div
                  key={p}
                  className="rounded-md bg-zinc-100 px-3 py-1.5 text-xs font-medium capitalize text-zinc-500"
                >
                  {p}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-1.5 text-xs text-zinc-400">Energía</p>
            <div className="flex flex-wrap gap-1">
              {energies.map((e) => (
                <div
                  key={e}
                  className="rounded-md bg-zinc-100 px-3 py-1.5 text-xs font-medium capitalize text-zinc-500"
                >
                  {e}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-1.5 text-xs text-zinc-400">Buscar</p>
            <div className="w-full rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-300">
              Buscar tareas…
            </div>
          </div>
        </div>
      </section>

      <section className="mt-auto border-t border-zinc-100 pt-4">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>{total - completed} pendientes</span>
          <span>
            {completed} de {total} completadas
          </span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-zinc-100">
          <div
            className="h-full rounded-full bg-emerald-400"
            style={{
              width: total > 0 ? `${(completed / total) * 100}%` : "0%",
            }}
          />
        </div>
      </section>
    </aside>
  );
}
