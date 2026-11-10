// PRESENTACIÓN · Hook adaptador: conecta React con el caso de uso. No sabe que existe HTTP.
import { useEffect, useState } from 'react';
import { loadOrderSummary, type OrderSummary } from '../application/load-order-summary';
import type { OrderReader } from '../application/ports';
import { orderReader } from '../composition';

export type OrderSummaryState =
  | { status: 'loading' }
  | { status: 'ready'; summary: OrderSummary }
  | { status: 'error' };

export function useOrderSummary(reader: OrderReader = orderReader): OrderSummaryState {
  const [state, setState] = useState<OrderSummaryState>({ status: 'loading' });
  useEffect(() => {
    let active = true;
    loadOrderSummary(reader)
      .then((summary) => active && setState({ status: 'ready', summary }))
      .catch(() => active && setState({ status: 'error' }));
    return () => { active = false; };
  }, [reader]);
  return state;
}
