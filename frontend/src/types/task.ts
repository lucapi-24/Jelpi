export type Energy = "low" | "medium" | "high";
export type Priority = "low" | "medium" | "high";
export type Status = "todo" | "done";

export interface Subtask {
  id: string;
  title: string;
  done: boolean;
}

export interface Task {
  id: string;
  title: string;
  energy: Energy;
  duration: number;
  priority: Priority;
  status: Status;
  subtasks?: Subtask[];
}

export interface ScheduledTask extends Task {
  day: number;
  startHour: number;
  endHour: number;
}
