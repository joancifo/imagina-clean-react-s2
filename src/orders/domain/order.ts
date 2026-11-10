// DOMINIO · Conceptos y reglas del negocio. No conoce React, HTTP, router ni almacenamiento.
export type OrderStatus = 'pending' | 'approved' | 'shipped' | 'cancelled';
export type CustomerTier = 'gold' | 'silver' | 'standard';
export type OrderLine = { sku: string; quantity: number; unitPrice: number };

export type Order = {
  id: string;
  customerName: string;
  customerTier: CustomerTier;
  status: OrderStatus;
  ownerId: string;
  createdAt: string; // ISO 8601
  lines: OrderLine[];
};

const DISCOUNT_BY_TIER: Record<CustomerTier, number> = { gold: 0.1, silver: 0.05, standard: 0 };
const VAT = 0.21;
export const URGENT_FROM = 3000;

export function calculateTotal(order: Pick<Order, 'lines' | 'customerTier'>): number {
  const subtotal = order.lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);
  return subtotal * (1 - DISCOUNT_BY_TIER[order.customerTier]) * (1 + VAT);
}

export function isUrgent(order: Order): boolean {
  return order.status === 'pending' && calculateTotal(order) > URGENT_FROM;
}
