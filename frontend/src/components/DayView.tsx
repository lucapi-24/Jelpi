import { mockTasks } from "@/mock/tasks";
import Sidebar from "./Sidebar";
import TaskList from "./TaskList";

export default function DayView() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col md:flex-row">
      <div className="w-full border-b border-zinc-200 bg-white px-4 py-6 md:w-72 md:shrink-0 md:border-b-0 md:border-r md:px-6">
        <Sidebar busyBlocks={[]} />
      </div>

      <main className="flex-1 px-4 py-6 md:px-8">
        <div className="mx-auto max-w-2xl">
          <TaskList tasks={mockTasks} />
        </div>
      </main>
    </div>
  );
}
