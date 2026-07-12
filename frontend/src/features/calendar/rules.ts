export const DAY_NAMES_SHORT = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"] as const;
export const DAY_NAMES_FULL = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"] as const;
export const HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21] as const;
export const DAY_START = 7;
export const DAY_END = 22;

export function formatHour(hour: number): string {
  return `${hour.toString().padStart(2, "0")}:00`;
}
