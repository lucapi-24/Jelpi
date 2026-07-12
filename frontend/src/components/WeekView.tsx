"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ScheduledTask } from "@/types";
import { defaultBusyBlocks } from "@/mock/availability";
import { loadTasks, saveTasks } from "@/lib/store";
import Sidebar from "./Sidebar";
import WeekGrid from "./WeekGrid";
import TaskForm from "./TaskForm";

export default function WeekView() {
  const router = useRouter();
  const [tasks, setTasks] = useState<ScheduledTask[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleTaskUpdate = useCallback(
    (id: string, upd: Partial<ScheduledTask>) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...upd } : t))
      );
    },
    []
  );

  const handleTaskClick = useCallback(
    (day: number) => {
      router.push(`/day/${day}`);
    },
    [router]
  );

  const handleAddTask = useCallback((task: ScheduledTask) => {
    setTasks((prev) => [...prev, task]);
  }, []);

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col md:flex-row">
      <div className="flex w-full flex-col border-b border-zinc-200 bg-white md:w-72 md:shrink-0 md:border-b-0 md:border-r">
        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-6">
          <Sidebar busyBlocks={defaultBusyBlocks} onNewTask={() => setShowForm(true)} />
        </div>
      </div>

      <main className="flex flex-1 flex-col px-4 py-6 md:px-8">
        <WeekGrid
          busyBlocks={defaultBusyBlocks}
          scheduledTasks={tasks}
          onTaskUpdate={handleTaskUpdate}
          onTaskClick={handleTaskClick}
        />
      </main>

      {showForm && (
        <TaskForm
          onAdd={handleAddTask}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
