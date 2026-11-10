// @vitest-environment node
// Tema 4 · El núcleo funciona sin React, sin navegador y sin red.
// Este test es un DRIVER DE ENTRADA más: llama al caso de uso igual que lo hará el hook de React.
import { loadOrderSummary } from '../../src/orders/application/load-order-summary';
import { createInMemoryOrderReader } from '../../src/orders/infrastructure/in-memory-order-reader';
import type { Order } from '../../src/orders/domain/order';

const orders: Order[] = [
  { id: 'P-1001', customerName: 'Talleres Norte', customerTier: 'gold', status: 'pending', ownerId: 'u2', createdAt: '2026-10-02T09:15:00Z', lines: [{ sku: 'A-10', quantity: 40, unitPrice: 32.5 }, { sku: 'B-20', quantity: 4, unitPrice: 210 }] },
  { id: 'P-1004', customerName: 'Clínica Dental Mar', customerTier: 'standard', status: 'shipped', ownerId: 'u3', createdAt: '2026-10-06T16:20:00Z', lines: [{ sku: 'E-50', quantity: 3, unitPrice: 140 }] },
];

it('no hay navegador en este entorno', () => {
  expect(typeof window).toBe('undefined');
  expect(typeof localStorage).toBe('undefined');
});

it('el caso de uso calcula el resumen con datos en memoria', async () => {
  const summary = await loadOrderSummary(createInMemoryOrderReader(orders));
  expect(summary.pendingCount).toBe(1);
  expect(summary.pendingAmount).toBeCloseTo(2330.46, 2); // (1300 + 840) · 0,9 · 1,21
  expect(summary.urgentCount).toBe(0);
});
