import type { Energy, Priority } from "@/types";

const priorityLabels: Record<Priority, string> = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
};

const energyLabels: Record<Energy, string> = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
};

const energyNoun: Record<Energy, string> = {
  low: "poca energía",
  medium: "energía normal",
  high: "mucha energía",
};

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

export function getPriorityLabel(priority: Priority): string {
  return priorityLabels[priority];
}

export function getEnergyLabel(energy: Energy): string {
  return energyLabels[energy];
}

export function getEnergyNoun(energy: Energy): string {
  return energyNoun[energy];
}

export function getEnergyMatchHint(
  match: "full" | "possible" | "heavy"
): string {
  const hints = {
    full: "Coincide con tu energía actual",
    possible: "Requiere algo más de energía",
    heavy: "Mejor dejar para cuando tengas más energía",
  };
  return hints[match];
}
