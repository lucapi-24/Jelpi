"use client";

import { useState } from "react";
import type { Energy, Priority, ScheduledTask, Subtask } from "@/types";

const DAY_NAMES = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

let nextId = 100;
let nextSubId = 200;

interface Props {
  onAdd: (task: ScheduledTask) => void;
  onClose: () => void;
}

export default function TaskForm({ onAdd, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [energy, setEnergy] = useState<Energy>("medium");
  const [duration, setDuration] = useState(30);
  const [priority, setPriority] = useState<Priority>("medium");
  const [day, setDay] = useState(0);
  const [startHour, setStartHour] = useState(9);
  const [subtasks, setSubtasks] = useState<string[]>([""]);

  function addSubtask() {
    setSubtasks((prev) => [...prev, ""]);
  }

  function updateSubtask(index: number, value: string) {
    setSubtasks((prev) => prev.map((s, i) => (i === index ? value : s)));
  }

  function removeSubtask(index: number) {
    setSubtasks((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    const endHour = Math.min(startHour + Math.ceil(duration / 60), 22);
    const subs: Subtask[] = subtasks
      .filter((s) => s.trim())
      .map((s) => ({ id: String(nextSubId++), title: s.trim(), done: false }));
    const task: ScheduledTask = {
      id: String(nextId++),
      title: title.trim(),
      energy,
      duration,
      priority,
      status: "todo",
      day,
      startHour,
      endHour,
      ...(subs.length > 0 ? { subtasks: subs } : {}),
    };
    onAdd(task);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-5 shadow-lg"
      >
        <h2 className="mb-4 text-sm font-semibold text-zinc-800">Nueva tarea</h2>

        <div className="space-y-3">
          <div>
            <label className="mb-0.5 block text-[11px] font-medium text-zinc-500">Título</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-sm text-zinc-800 outline-none focus:border-zinc-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-0.5 block text-[11px] font-medium text-zinc-500">Energía</label>
              <select
                value={energy}
                onChange={(e) => setEnergy(e.target.value as Energy)}
                className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-sm text-zinc-800 outline-none focus:border-zinc-400"
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
            </div>
            <div>
              <label className="mb-0.5 block text-[11px] font-medium text-zinc-500">Prioridad</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-sm text-zinc-800 outline-none focus:border-zinc-400"
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-0.5 block text-[11px] font-medium text-zinc-500">Duración (minutos)</label>
            <input
              type="number"
              min={5}
              max={480}
              step={5}
              value={duration}
              onChange={(e) => setDuration(Math.max(5, parseInt(e.target.value) || 5))}
              className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-sm text-zinc-800 outline-none focus:border-zinc-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-0.5 block text-[11px] font-medium text-zinc-500">Día</label>
              <select
                value={day}
                onChange={(e) => setDay(parseInt(e.target.value))}
                className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-sm text-zinc-800 outline-none focus:border-zinc-400"
              >
                {DAY_NAMES.map((n, i) => (
                  <option key={i} value={i}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-0.5 block text-[11px] font-medium text-zinc-500">Inicio</label>
              <select
                value={startHour}
                onChange={(e) => setStartHour(parseInt(e.target.value))}
                className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-sm text-zinc-800 outline-none focus:border-zinc-400"
              >
                {Array.from({ length: 15 }, (_, i) => i + 7).map((h) => (
                  <option key={h} value={h}>{h}:00</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-[11px] font-medium text-zinc-500">Subtareas</label>
              <button
                type="button"
                onClick={addSubtask}
                className="text-[11px] font-medium text-zinc-400 hover:text-zinc-600"
              >
                + Añadir
              </button>
            </div>
            <div className="space-y-1.5">
              {subtasks.map((s, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <input
                    value={s}
                    onChange={(e) => updateSubtask(i, e.target.value)}
                    placeholder="Subtarea…"
                    className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-800 outline-none focus:border-zinc-400"
                  />
                  <button
                    type="button"
                    onClick={() => removeSubtask(i)}
                    className="shrink-0 text-zinc-300 hover:text-zinc-500"
                  >
                    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-3 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-md bg-zinc-800 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-700"
          >
            Crear tarea
          </button>
        </div>
      </form>
    </div>
  );
}
