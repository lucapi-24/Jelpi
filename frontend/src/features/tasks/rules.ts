import type { Energy, Priority, Task, ScheduledTask, UserState, EnergyMatch } from "@/types";
import type { TaskFilters } from "@/types";

export type { Energy, Priority, Task, ScheduledTask, UserState, EnergyMatch, TaskFilters };

export function getTaskColor(task: {
  priority: Priority;
}): {
  border: string;
  bg: string;
  label: string;
} {
  const map: Record<
    Priority,
    { border: string; bg: string; label: string }
  > = {
    low: {
      border: "border-l-sky-400",
      bg: "bg-sky-50",
      label: "Prioridad baja",
    },
    medium: {
      border: "border-l-amber-400",
      bg: "bg-amber-50",
      label: "Prioridad media",
    },
    high: {
      border: "border-l-rose-400",
      bg: "bg-rose-50",
      label: "Prioridad alta",
    },
  };
  return map[task.priority];
}

export function getEnergyColor(energy: Energy): {
  dot: string;
  text: string;
} {
  const map: Record<Energy, { dot: string; text: string }> = {
    low: { dot: "bg-green-400", text: "text-green-600" },
    medium: { dot: "bg-amber-400", text: "text-amber-600" },
    high: { dot: "bg-orange-400", text: "text-orange-600" },
  };
  return map[energy];
}

const priorityRank: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

const energyRank: Record<Energy, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    if (a.status !== b.status) {
      return a.status === "todo" ? -1 : 1;
    }
    const p = priorityRank[a.priority] - priorityRank[b.priority];
    if (p !== 0) return p;
    return energyRank[a.energy] - energyRank[b.energy];
  });
}

export function filterTasks(tasks: Task[], filters: TaskFilters): Task[] {
  return tasks.filter((task) => {
    if (filters.status === "todo" && task.status !== "todo") return false;
    if (filters.status === "done" && task.status !== "done") return false;
    if (
      filters.priorities.length > 0 &&
      !filters.priorities.includes(task.priority)
    )
      return false;
    if (
      filters.energies.length > 0 &&
      !filters.energies.includes(task.energy)
    )
      return false;
    if (
      filters.search.trim() &&
      !task.title.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    return true;
  });
}

export function getEnergyMatch(
  task: Task,
  userState: UserState
): EnergyMatch {
  const level: Record<Energy, number> = { low: 0, medium: 1, high: 2 };
  const diff = level[task.energy] - level[userState.currentEnergy];
  if (diff <= 0) return "full";
  if (diff === 1) return "possible";
  return "heavy";
}
