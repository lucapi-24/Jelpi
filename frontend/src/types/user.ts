import type { Energy } from "./task";

export interface UserState {
  currentEnergy: Energy;
}

export type EnergyMatch = "full" | "possible" | "heavy";
