// LSP · Un contrato no es solo la firma: también es el comportamiento que promete.
export type Order = { id: string; status: 'pending' | 'approved' | 'shipped' | 'cancelled' };

/** Contrato: devuelve el pedido o null si no existe. No lanza por "no encontrado". */
export interface OrderReader {
  findById(id: string): Promise<Order | null>;
}

export function createInMemoryOrderReader(orders: Order[]): OrderReader {
  return { findById: async (id) => orders.find((o) => o.id === id) ?? null };
}

// Misma firma, otro comportamiento: lanza si no existe. TypeScript no lo detecta.
export function createStrictOrderReader(orders: Order[]): OrderReader {
  return {
    findById: async (id) => {
      const order = orders.find((o) => o.id === id);
      if (!order) throw new Error(`Pedido ${id} no encontrado`);
      return order;
    },
  };
}

// Consumidor escrito contra el contrato.
export async function describeOrder(id: string, reader: OrderReader): Promise<string> {
  const order = await reader.findById(id);
  return order ? `${order.id} · ${order.status}` : 'No existe';
}
