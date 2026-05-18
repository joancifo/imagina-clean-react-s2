// Regla de negocio pura: no conoce React, HTTP ni el navegador.
export type CustomerTier = 'gold' | 'silver' | 'standard';
export type OrderLine = { quantity: number; unitPrice: number };

const DISCOUNT_BY_TIER: Record<CustomerTier, number> = { gold: 0.1, silver: 0.05, standard: 0 };
const VAT = 0.21;

export function calculateOrderTotal(lines: OrderLine[], tier: CustomerTier): number {
  const subtotal = lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);
  return subtotal * (1 - DISCOUNT_BY_TIER[tier]) * (1 + VAT);
}
