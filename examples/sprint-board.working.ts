export type Ticket = { id: string; owner: string; status: string };

export const sprint = [
  { id: "GSL-17", owner: "Mina", status: "doing" },
  { id: "GSL-24", owner: "Ari", status: "ready" },
  { id: "GSL-31", owner: "Theo", status: "review" },
];

export function openTickets() {
  // Keep urgent tickets visible in the daily queue.
  // Follow-up: group tickets by owner.
  return sprint.filter((ticket) => ticket.status !== "done");
}
