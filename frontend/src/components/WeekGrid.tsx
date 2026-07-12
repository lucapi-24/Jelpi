"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import type { BusyBlock, ScheduledTask } from "@/types";
import { getTaskColor, getEnergyColor, formatDuration } from "@/features/tasks";
import { DAY_NAMES_SHORT, HOURS, formatHour } from "@/features/calendar";
import { buildGrid } from "@/features/calendar/grid";

type DragType = "move" | "resize";

interface DragState {
  type: DragType;
  taskId: string;
  origDay: number;
  origStartHour: number;
  origEndHour: number;
  origPointerX: number;
  origPointerY: number;
  curDay: number;
  curStartHour: number;
  curEndHour: number;
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

interface Pending {
  type: DragType;
  taskId: string;
  task: ScheduledTask;
  pointerX: number;
  pointerY: number;
}

export default function WeekGrid({
  busyBlocks,
  scheduledTasks,
  onTaskUpdate,
  onTaskClick,
}: {
  busyBlocks: BusyBlock[];
  scheduledTasks: ScheduledTask[];
  onTaskUpdate: (id: string, upd: Partial<ScheduledTask>) => void;
  onTaskClick?: (day: number) => void;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<DragState | null>(null);
  const dragRef = useRef<DragState | null>(null);
  dragRef.current = drag;
  const pendingRef = useRef<Pending | null>(null);
  const onTaskUpdateRef = useRef(onTaskUpdate);
  onTaskUpdateRef.current = onTaskUpdate;
  const onTaskClickRef = useRef(onTaskClick);
  onTaskClickRef.current = onTaskClick;

  const getPos = useCallback(
    (cx: number, cy: number): { day: number; hour: number } | null => {
      const el = gridRef.current;
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const rx = cx - r.left;
      const ry = cy - r.top;
      if (rx < 52) return null;
      const dayW = (r.width - 52) / 7;
      const day = clamp(Math.floor((rx - 52) / dayW), 0, 6);
      const headerH = 28;
      const rowH = Math.max(1, r.height - headerH) / 15;
      const hour = clamp(Math.floor((ry - headerH) / rowH) + 7, 7, 21);
      return { day, hour };
    },
    []
  );

  function startDrag(e: React.PointerEvent, id: string, type: DragType) {
    e.preventDefault();
    const t = scheduledTasks.find((x) => x.id === id);
    if (!t) return;
    pendingRef.current = { type, taskId: id, task: t, pointerX: e.clientX, pointerY: e.clientY };
  }

  useEffect(() => {
    const THRESHOLD = 10;

    function onMove(e: PointerEvent) {
      const pending = pendingRef.current;
      if (pending) {
        const dist = Math.abs(e.clientX - pending.pointerX) + Math.abs(e.clientY - pending.pointerY);
        if (dist < THRESHOLD) return;
        const info: DragState = {
          type: pending.type,
          taskId: pending.taskId,
          origDay: pending.task.day,
          origStartHour: pending.task.startHour,
          origEndHour: pending.task.endHour,
          origPointerX: pending.pointerX,
          origPointerY: pending.pointerY,
          curDay: pending.task.day,
          curStartHour: pending.task.startHour,
          curEndHour: pending.task.endHour,
        };
        dragRef.current = info;
        setDrag(info);
        pendingRef.current = null;
        return;
      }

      const s = dragRef.current;
      if (!s) return;
      e.preventDefault();
      const p = getPos(e.clientX, e.clientY);
      if (!p) return;

      if (s.type === "move") {
        const span = s.origEndHour - s.origStartHour;
        const start = clamp(p.hour, 7, 21);
        setDrag({
          ...s,
          curDay: p.day,
          curStartHour: start,
          curEndHour: Math.min(start + span, 22),
        });
      } else {
        const el = gridRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const rowH = Math.max(1, rect.height - 28) / 15;
        const deltaPx = e.clientY - s.origPointerY;
        const deltaHours = Math.round(deltaPx / rowH);
        const newEnd = clamp(s.origEndHour + deltaHours, s.origStartHour + 1, 22);
        setDrag({ ...s, curEndHour: newEnd });
      }
    }

    function onUp(e: PointerEvent) {
      const pending = pendingRef.current;
      if (pending) {
        if (pending.type === "move") {
          const dist = Math.abs(e.clientX - pending.pointerX) + Math.abs(e.clientY - pending.pointerY);
          if (dist < 5) onTaskClickRef.current?.(pending.task.day);
        }
        pendingRef.current = null;
        return;
      }

      const s = dragRef.current;
      if (!s) return;
      if (
        s.curDay !== s.origDay ||
        s.curStartHour !== s.origStartHour ||
        s.curEndHour !== s.origEndHour
      ) {
        onTaskUpdateRef.current(s.taskId, {
          day: s.curDay,
          startHour: s.curStartHour,
          endHour: s.curEndHour,
        });
      }
      setDrag(null);
    }

    function onCancel() {
      pendingRef.current = null;
      setDrag(null);
    }

    document.addEventListener("pointermove", onMove, { passive: false });
    document.addEventListener("pointerup", onUp);
    document.addEventListener("pointercancel", onCancel);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onCancel);
    };
  }, [getPos]);

  const grid = buildGrid(busyBlocks, scheduledTasks);

  return (
    <div
      ref={gridRef}
      className="grid select-none touch-none"
      style={{
        gridTemplateColumns: "52px repeat(7, 1fr)",
        gridTemplateRows: `auto repeat(${HOURS.length}, minmax(36px, auto))`,
      }}
    >
      {/* corner */}
      <div style={{ gridColumn: 1, gridRow: 1 }} className="border-b border-r border-zinc-200 bg-white" />

      {/* day headers */}
        {DAY_NAMES_SHORT.map((n, d) => (
        <div key={`h-${d}`} style={{ gridColumn: d + 2, gridRow: 1 }} className="border-b border-zinc-200 px-1 pb-2 pt-1 text-center text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          {n}
        </div>
      ))}

      {/* time labels */}
      {HOURS.map((h, i) => (
        <div key={`t-${h}`} style={{ gridColumn: 1, gridRow: i + 2 }} className="border-b border-r border-zinc-100 px-1.5 text-right text-[10px] leading-[36px] text-zinc-400">
          <span className="align-middle">{formatHour(h)}</span>
        </div>
      ))}

      {/* free + busy cells */}
      {HOURS.map((hour, hi) =>
        Array.from({ length: 7 }, (_, day) => {
          const c = grid.get(`${day}-${hour}`);
          if (!c || c.kind === "free")
            return <div key={`${day}-${hour}`} style={{ gridColumn: day + 2, gridRow: hi + 2 }} className="border-b border-r border-zinc-100" />;
          if (c.kind === "busy-cont") return null;
          if (c.kind === "busy-start" && c.block) {
            const b = c.block;
            return (
              <div key={`${day}-${hour}`} style={{ gridColumn: day + 2, gridRow: `${hi + 2} / span ${c.rowSpan}` }} className="overflow-hidden border border-zinc-300/60 bg-zinc-100 px-2 py-1">
                <span className="truncate text-[11px] font-medium text-zinc-500">{b.label || "Ocupado"}</span>
                <span className="block text-[10px] text-zinc-400">{formatHour(b.startHour)} – {formatHour(b.endHour)}</span>
              </div>
            );
          }
          return null;
        })
      )}

      {/* task blocks */}
      {scheduledTasks.map((task) => {
        const isDragging = drag?.taskId === task.id;
        const span = task.endHour - task.startHour;
        const color = getTaskColor(task);
        const energy = getEnergyColor(task.energy);
        return (
          <div
            key={task.id}
            style={{ gridColumn: task.day + 2, gridRow: `${task.startHour - 5} / span ${span}` }}
            onPointerDown={(e) => {
              if ((e.target as HTMLElement).closest("[data-resize]")) return;
              startDrag(e, task.id, "move");
            }}
            className={`relative overflow-hidden border ${color.border.replace("border-l-", "border-")} border-l-[3px] ${color.bg} ${isDragging ? "opacity-20" : ""} cursor-grab active:cursor-grabbing touch-none`}
          >
            <div className="pointer-events-none px-2 py-1">
              <div className="flex items-start justify-between gap-1">
                <span className="truncate text-[11px] font-medium leading-tight text-zinc-700">{task.title}</span>
                <span className={`inline-block shrink-0 size-1.5 rounded-full ${energy.dot}`} />
              </div>
              <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                <span>{formatDuration(task.duration)}</span>
                <span className="capitalize">{task.energy}</span>
              </div>
            </div>
            <div
              data-resize
              onPointerDown={(e) => { e.stopPropagation(); startDrag(e, task.id, "resize"); }}
              className="absolute bottom-0 left-0 right-0 z-10 h-2 cursor-ns-resize hover:bg-black/10"
            />
          </div>
        );
      })}

      {/* drag ghost */}
      {drag && (() => {
        const t = scheduledTasks.find((x) => x.id === drag.taskId);
        if (!t) return null;
        const span = drag.curEndHour - drag.curStartHour;
        const color = getTaskColor(t);
        const energy = getEnergyColor(t.energy);
        return (
          <div
            style={{ gridColumn: drag.curDay + 2, gridRow: `${drag.curStartHour - 5} / span ${span}` }}
            className={`overflow-hidden border ${color.border.replace("border-l-", "border-")} border-l-[3px] ${color.bg} opacity-90 pointer-events-none ring-2 ring-zinc-400/60`}
          >
            <div className="px-2 py-1">
              <div className="flex items-start justify-between gap-1">
                <span className="truncate text-[11px] font-medium leading-tight text-zinc-700">{t.title}</span>
                <span className={`inline-block shrink-0 size-1.5 rounded-full ${energy.dot}`} />
              </div>
              <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                <span>{formatDuration(t.duration)}</span>
                <span className="capitalize">{t.energy}</span>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
