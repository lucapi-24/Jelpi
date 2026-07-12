"use client";

import { useState } from "react";
import type { Subtask } from "@/types";

export default function SubtaskList({
  subtasks: initial,
}: {
  subtasks: Subtask[];
}) {
  const [items, setItems] = useState(initial);
  const done = items.filter((s) => s.done).length;
  const pct = items.length > 0 ? Math.round((done / items.length) * 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-100">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-[11px] font-medium text-zinc-400">{pct}%</span>
      </div>

      <ul className="space-y-1">
        {items.map((s) => (
          <li key={s.id}>
            <button
              onClick={() =>
                setItems((prev) =>
                  prev.map((x) => (x.id === s.id ? { ...x, done: !x.done } : x))
                )
              }
              className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors hover:bg-zinc-50"
            >
              <span
                className={`flex size-4 shrink-0 items-center justify-center rounded border ${
                  s.done
                    ? "border-emerald-400 bg-emerald-400 text-white"
                    : "border-zinc-300"
                }`}
              >
                {s.done && (
                  <svg className="size-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </span>
              <span className={s.done ? "text-zinc-400 line-through" : "text-zinc-600"}>
                {s.title}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
