export type Ticket = { id: string; owner: string; status: string };

export const sprint = [
  { id: "GSL-17", owner: "Mina", status: "doing" },
  { id: "GSL-31", owner: "Theo", status: "review" },
];

export function openTickets() {
  return sprint.filter((ticket) => ticket.status !== "done");
}
