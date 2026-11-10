// INFRAESTRUCTURA · Traduce DTO → dominio. Si el backend renombra un campo, solo cambia este archivo.
import type { CustomerTier, Order, OrderStatus } from '../domain/order';
import type { OrderDto } from './order-dto';

const STATUSES: OrderStatus[] = ['pending', 'approved', 'shipped', 'cancelled'];
const TIERS: CustomerTier[] = ['gold', 'silver', 'standard'];

function oneOf<T extends string>(value: string, allowed: T[], field: string): T {
  if (!(allowed as string[]).includes(value)) throw new Error(`Valor inesperado en ${field}: ${value}`);
  return value as T;
}

export function toOrder(dto: OrderDto): Order {
  return {
    id: dto.ord_id,
    customerName: dto.cust_nm,
    customerTier: oneOf(dto.cust_tier, TIERS, 'cust_tier'),
    status: oneOf(dto.ord_st, STATUSES, 'ord_st'),
    ownerId: dto.owner_id,
    createdAt: dto.crt_ts,
    lines: dto.ln_items.map((line) => ({ sku: line.sku, quantity: line.qty, unitPrice: line.unit_prc })),
  };
}
