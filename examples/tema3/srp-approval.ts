// SRP · La DECISIÓN de si se puede aprobar, separada de la red, del estado y de los avisos.
// Origen: src/pages/OrdersPage.tsx:75-95 (handleApprove mezclaba siete responsabilidades).
export type Role = 'admin' | 'manager' | 'agent';
export type ApprovalInput = {
  role: Role | null; // null = sin sesión
  status: 'pending' | 'approved' | 'shipped' | 'cancelled';
  total: number;
  lines: { quantity: number }[];
};

export type ApprovalDecision =
  | { ok: true }
  | { ok: false; reason: 'no-session' | 'forbidden' | 'not-pending' | 'invalid-lines' | 'needs-admin' };

export const ADMIN_ONLY_FROM = 10000;

export function decideApproval(input: ApprovalInput): ApprovalDecision {
  if (input.role === null) return { ok: false, reason: 'no-session' };
  if (input.role === 'agent') return { ok: false, reason: 'forbidden' };
  if (input.status !== 'pending') return { ok: false, reason: 'not-pending' };
  if (input.lines.length === 0 || input.lines.some((l) => l.quantity <= 0)) return { ok: false, reason: 'invalid-lines' };
  if (input.total > ADMIN_ONLY_FROM && input.role !== 'admin') return { ok: false, reason: 'needs-admin' };
  return { ok: true };
}
