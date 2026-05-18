import type { Order } from './types';
import { calcOrderTotal } from './utils';

export function mapOrderForTable(raw: Order): Order {
  return {
    ...raw,
    total: calcOrderTotal(raw),
    isUrgent: raw.ord_st === 'pending' && calcOrderTotal(raw) > 2000,
    rowColor: raw.ord_st === 'cancelled' ? 'grey' : 'white',
  };
}
