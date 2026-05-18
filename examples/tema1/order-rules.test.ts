// @vitest-environment node
import { calculateOrderTotal } from './order-rules';

describe('calculateOrderTotal', () => {
  it('aplica un 10 % a clientes gold y después el IVA', () => {
    expect(calculateOrderTotal([{ quantity: 1, unitPrice: 100 }], 'gold')).toBeCloseTo(108.9);
  });

  it('no aplica descuento a clientes standard', () => {
    expect(calculateOrderTotal([{ quantity: 2, unitPrice: 50 }], 'standard')).toBeCloseTo(121);
  });

  it('se ejecuta sin navegador', () => {
    expect(typeof window).toBe('undefined');
  });
});
