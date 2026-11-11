// APLICACIÓN · Caso de uso: "¿qué pedidos urgentes debo mirar primero?"
import { calculateTotal, isUrgent } from '../domain/order';
import type { OrderReader } from './ports';

export type UrgentOrder = { id: string; customerName: string; total: number };

export async function listUrgentOrders(orders: OrderReader): Promise<UrgentOrder[]> {
  const all = await orders.findAll();
  return all
    .filter(isUrgent)
    .map((order) => ({ id: order.id, customerName: order.customerName, total: calculateTotal(order) }))
    .sort((a, b) => b.total - a.total);
}
