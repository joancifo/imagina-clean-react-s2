// APLICACIÓN · Caso de uso: "¿qué pedidos urgentes debo mirar primero?"
// Ejercicio S2 · Parte B: usa isUrgent y calculateTotal del dominio; ordena de mayor a menor importe.
import type { OrderReader } from './ports';

export type UrgentOrder = { id: string; customerName: string; total: number };

export async function listUrgentOrders(orders: OrderReader): Promise<UrgentOrder[]> {
  void orders;
  throw new Error('Por implementar (ejercicio S2 · Parte B)');
}
