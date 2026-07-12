import type { BusyBlock } from "@/types";

const BASE = "/api/busy-blocks";

export async function fetchBusyBlocks(): Promise<BusyBlock[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch busy blocks");
  return res.json();
}

export async function createBusyBlock(block: BusyBlock): Promise<BusyBlock> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(block),
  });
  if (!res.ok) throw new Error("Failed to create busy block");
  return res.json();
}

export async function updateBusyBlock(
  id: string,
  upd: Partial<BusyBlock>
): Promise<BusyBlock> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(upd),
  });
  if (!res.ok) throw new Error("Failed to update busy block");
  return res.json();
}

export async function deleteBusyBlock(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete busy block");
}
