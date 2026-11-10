// OCP · Añadir un estado = añadir una entrada. El compilador señala lo que falta.
// Origen: src/components/Badge.tsx:2 (cadena de ternarios que hay que MODIFICAR para cada estado).
export type OrderStatus = 'pending' | 'approved' | 'shipped' | 'cancelled';
type StatusView = { label: string; tone: 'neutral' | 'danger' };

export const STATUS_VIEW = {
  pending: { label: 'Pendiente', tone: 'neutral' },
  approved: { label: 'Aprobado', tone: 'neutral' },
  shipped: { label: 'Enviado', tone: 'neutral' },
  cancelled: { label: 'Cancelado', tone: 'danger' },
} satisfies Record<OrderStatus, StatusView>;

export function statusView(status: OrderStatus): StatusView {
  return STATUS_VIEW[status];
}
