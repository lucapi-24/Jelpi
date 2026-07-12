import type { Task } from "@/types";
import { sortTasks } from "@/features/tasks";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const sorted = sortTasks(tasks);

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-3 text-3xl">✨</div>
        <p className="text-sm font-medium text-zinc-500">
          No hay tareas que mostrar
        </p>
        <p className="mt-1 text-xs text-zinc-400">
          Ajusta los filtros o crea una nueva tarea
        </p>
      </div>
    );
  }

  const todo = sorted.filter((t) => t.status === "todo");
  const done = sorted.filter((t) => t.status === "done");

  return (
    <div className="space-y-6">
      {todo.length > 0 && (
        <section>
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Pendientes
            </h2>
            <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-[10px] font-medium text-zinc-500">
              {todo.length}
            </span>
          </div>
          <div className="space-y-2">
            {todo.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </section>
      )}

      {done.length > 0 && (
        <section>
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Completadas
            </h2>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-400">
              {done.length}
            </span>
          </div>
          <div className="space-y-2">
            {done.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
