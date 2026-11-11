// @vitest-environment node
import { listUrgentOrders } from './list-urgent-orders';
import type { OrderReader } from './ports';
import type { Order } from '../domain/order';

const order = (id: string, status: Order['status'], unitPrice: number): Order => ({
  id, status, customerName: `Cliente ${id}`, customerTier: 'standard', ownerId: 'u2',
  createdAt: '2026-11-11T17:00:00Z', lines: [{ sku: 'A', quantity: 1, unitPrice }],
});

// Paso 1 · Doble de prueba del puerto: datos fijos, sin red.
function createFakeOrderReader(orders: Order[]): OrderReader {
  return { findAll: async () => orders };
}

describe('listUrgentOrders', () => {
  it('devuelve solo pendientes de más de 3000 € con IVA', async () => {
    const reader = createFakeOrderReader([order('P-1', 'pending', 3000), order('P-2', 'pending', 100), order('P-3', 'approved', 9000)]);
    const result = await listUrgentOrders(reader);
    expect(result.map((o) => o.id)).toEqual(['P-1']);
    expect(result[0].total).toBeCloseTo(3630);
  });

  it('ordena de mayor a menor importe', async () => {
    const reader = createFakeOrderReader([order('P-1', 'pending', 4000), order('P-2', 'pending', 9000)]);
    expect((await listUrgentOrders(reader)).map((o) => o.id)).toEqual(['P-2', 'P-1']);
  });

  it('devuelve una lista vacía si no hay urgentes', async () => {
    await expect(listUrgentOrders(createFakeOrderReader([order('P-1', 'pending', 10)]))).resolves.toEqual([]);
  });
});
