// DIP · El caso de uso define el puerto que necesita. Los detalles (fetch, axios) dependen de él.
export type OrderLine = { quantity: number; unitPrice: number };
export type Order = { id: string; status: 'pending' | 'approved' | 'shipped' | 'cancelled'; lines: OrderLine[] };

// Puerto: lo define y lo posee el caso de uso.
export interface OrderReader {
  findAll(): Promise<Order[]>;
}

// Caso de uso: depende de la abstracción, no de la red.
export async function countPendingOrders(orders: OrderReader): Promise<number> {
  const all = await orders.findAll();
  return all.filter((o) => o.status === 'pending').length;
}

// Adapter: implementa el puerto con un detalle concreto. Traduce el DTO del backend.
type OrderDto = { ord_id: string; ord_st: Order['status']; ln_items: { qty: number; unit_prc: number }[] };

export function createHttpOrderReader(fetchFn: typeof fetch, baseUrl = '/api'): OrderReader {
  return {
    async findAll() {
      const res = await fetchFn(`${baseUrl}/orders`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const dtos: OrderDto[] = await res.json();
      return dtos.map((d) => ({ id: d.ord_id, status: d.ord_st, lines: d.ln_items.map((l) => ({ quantity: l.qty, unitPrice: l.unit_prc })) }));
    },
  };
}
