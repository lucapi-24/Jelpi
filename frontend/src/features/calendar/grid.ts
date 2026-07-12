import type { BusyBlock } from "@/types";
import type { ScheduledTask } from "@/types";

type CellKind = "free" | "busy-start" | "busy-cont" | "task-start" | "task-cont";

export interface CellData {
  kind: CellKind;
  block?: BusyBlock;
  task?: ScheduledTask;
  rowSpan: number;
}

export function buildGrid(blocks: BusyBlock[], tasks: ScheduledTask[]): Map<string, CellData> {
  const map = new Map<string, CellData>();
  for (let d = 0; d < 7; d++)
    for (let h = 7; h <= 21; h++) map.set(`${d}-${h}`, { kind: "free", rowSpan: 1 });

  for (const b of blocks)
    for (let h = b.startHour; h < Math.min(b.endHour, 22); h++) {
      if (h > 21) break;
      const start = h === b.startHour;
      map.set(`${b.day}-${h}`, {
        kind: start ? "busy-start" : "busy-cont",
        block: b,
        rowSpan: start ? b.endHour - b.startHour : 0,
      });
    }

  for (const t of tasks)
    for (let h = t.startHour; h < Math.min(t.endHour, 22); h++) {
      if (h > 21) break;
      const prev = map.get(`${t.day}-${h}`);
      if (prev?.kind === "free") {
        const start = h === t.startHour;
        map.set(`${t.day}-${h}`, {
          kind: start ? "task-start" : "task-cont",
          task: t,
          rowSpan: start ? t.endHour - t.startHour : 0,
        });
      }
    }

  return map;
}
