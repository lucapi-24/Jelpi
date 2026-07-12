import type { Energy, Priority } from "./task";

export interface TaskFilters {
  priorities: Priority[];
  energies: Energy[];
  status: "all" | "todo" | "done";
  search: string;
}
