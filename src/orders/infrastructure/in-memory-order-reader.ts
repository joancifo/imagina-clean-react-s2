// INFRAESTRUCTURA · Segunda implementación del puerto: datos en memoria (tests, demos, desarrollo offline).
import type { OrderReader } from '../application/ports';
import type { Order } from '../domain/order';

export function createInMemoryOrderReader(orders: Order[]): OrderReader {
  return { findAll: async () => structuredClone(orders) };
}
