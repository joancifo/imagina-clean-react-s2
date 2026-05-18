// @vitest-environment node
import { cancelOrder, Order, OrderGateway } from './cancel-order';

const fakeGateway = (order: Order) => {
  const cancelled: string[] = [];
  const gateway: OrderGateway = {
    find: async () => order,
    markCancelled: async (id) => { cancelled.push(id); },
  };
  return { gateway, cancelled };
};

it('cancela un pedido pendiente sin red', async () => {
  const { gateway, cancelled } = fakeGateway({ id: 'P-1', status: 'pending' });
  await expect(cancelOrder('P-1', gateway)).resolves.toBe('cancelled');
  expect(cancelled).toEqual(['P-1']);
});

it('rechaza un pedido ya enviado', async () => {
  const { gateway, cancelled } = fakeGateway({ id: 'P-2', status: 'shipped' });
  await expect(cancelOrder('P-2', gateway)).resolves.toBe('not-allowed');
  expect(cancelled).toEqual([]);
});
