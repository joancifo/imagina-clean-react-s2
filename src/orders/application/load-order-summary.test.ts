// @vitest-environment node
import { loadOrderSummary } from './load-order-summary';
import type { OrderReader } from './ports';
import type { Order } from '../domain/order';

const order = (id: string, status: Order['status'], quantity: number, unitPrice: number): Order => ({
  id, status, customerName: 'Cliente', customerTier: 'standard', ownerId: 'u2', createdAt: '2026-11-11T17:00:00Z',
  lines: [{ sku: 'A', quantity, unitPrice }],
});

function createFakeOrderReader(orders: Order[]): OrderReader {
  return { findAll: async () => orders };
}

describe('loadOrderSummary', () => {
  it('cuenta y suma solo los pedidos pendientes (con IVA)', async () => {
    const reader = createFakeOrderReader([order('P-1', 'pending', 1, 100), order('P-2', 'shipped', 1, 999)]);
    const summary = await loadOrderSummary(reader);
    expect(summary.pendingCount).toBe(1);
    expect(summary.pendingAmount).toBeCloseTo(121);
  });

  it('marca como urgentes los pendientes de más de 3000 €', async () => {
    const reader = createFakeOrderReader([order('P-1', 'pending', 1, 3000), order('P-2', 'pending', 1, 100)]);
    await expect(loadOrderSummary(reader)).resolves.toMatchObject({ urgentCount: 1 });
  });

  it('devuelve ceros si no hay pedidos', async () => {
    await expect(loadOrderSummary(createFakeOrderReader([]))).resolves.toEqual({ pendingCount: 0, pendingAmount: 0, urgentCount: 0 });
  });
});
