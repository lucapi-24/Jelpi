import type { ScheduledTask } from "@/types";

const BASE = "/api/tasks";

export async function fetchTasks(): Promise<ScheduledTask[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function createTask(task: ScheduledTask): Promise<ScheduledTask> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function updateTask(
  id: string,
  upd: Partial<ScheduledTask>
): Promise<ScheduledTask> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(upd),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete task");
}
