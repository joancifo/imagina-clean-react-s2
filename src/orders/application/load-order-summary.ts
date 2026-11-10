// APLICACIÓN · Caso de uso: "¿cuánto trabajo pendiente hay?". Expresa intención de producto.
import { calculateTotal, isUrgent } from '../domain/order';
import type { OrderReader } from './ports';

export type OrderSummary = { pendingCount: number; pendingAmount: number; urgentCount: number };

export async function loadOrderSummary(orders: OrderReader): Promise<OrderSummary> {
  const all = await orders.findAll();
  const pending = all.filter((order) => order.status === 'pending');
  return {
    pendingCount: pending.length,
    pendingAmount: pending.reduce((sum, order) => sum + calculateTotal(order), 0),
    urgentCount: pending.filter(isUrgent).length,
  };
}
