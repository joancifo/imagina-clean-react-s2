// Caso de uso: depende de un puerto (OrderGateway), no de fetch ni de axios.
export type Order = { id: string; status: 'pending' | 'approved' | 'shipped' | 'cancelled' };

export interface OrderGateway {
  find(id: string): Promise<Order>;
  markCancelled(id: string): Promise<void>;
}

export async function cancelOrder(id: string, orders: OrderGateway): Promise<'cancelled' | 'not-allowed'> {
  const order = await orders.find(id);
  if (order.status === 'shipped' || order.status === 'cancelled') return 'not-allowed';
  await orders.markCancelled(id);
  return 'cancelled';
}
