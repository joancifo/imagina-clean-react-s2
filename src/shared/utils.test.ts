import { calcOrderTotal, formatCurrency } from './utils';
import type { Order } from './types';

vi.mock('../services/api', () => ({ sendLog: vi.fn() }));

it('formatea euros', () => {
  expect(formatCurrency(10).replace(/\s/g, ' ')).toBe('10,00 €');
});

it('calcula el total', () => {
  const order = { cust_tier: 'gold', ln_items: [{ sku: 'A', qty: 1, unit_prc: 100 }] } as Order;
  expect(calcOrderTotal(order)).toBeCloseTo(108.9);
});
