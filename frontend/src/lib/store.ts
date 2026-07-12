import type { ScheduledTask } from "@/types";

const KEY = "jelpi-tasks";

export function loadTasks(): ScheduledTask[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ScheduledTask[]) : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: ScheduledTask[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(tasks));
  } catch {
    // storage full or unavailable
  }
}
