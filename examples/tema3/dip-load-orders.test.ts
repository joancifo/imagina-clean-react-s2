// @vitest-environment node
import { countPendingOrders, createHttpOrderReader, type OrderReader } from './dip-load-orders';

it('el caso de uso se prueba con un fake: sin red, sin React', async () => {
  const fake: OrderReader = {
    findAll: async () => [
      { id: 'P-1', status: 'pending', lines: [] },
      { id: 'P-2', status: 'shipped', lines: [] },
    ],
  };
  await expect(countPendingOrders(fake)).resolves.toBe(1);
});

it('el adapter HTTP traduce el DTO del backend al modelo interno', async () => {
  const fakeFetch = (async () => new Response(JSON.stringify([
    { ord_id: 'P-7', ord_st: 'pending', ln_items: [{ qty: 2, unit_prc: 10 }] },
  ]))) as unknown as typeof fetch;
  const orders = await createHttpOrderReader(fakeFetch).findAll();
  expect(orders).toEqual([{ id: 'P-7', status: 'pending', lines: [{ quantity: 2, unitPrice: 10 }] }]);
});
