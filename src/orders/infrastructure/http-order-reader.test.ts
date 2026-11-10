// @vitest-environment node
import { createHttpOrderReader } from './http-order-reader';
import { OrderReadError } from '../application/ports';

const dto = { ord_id: 'P-1', cust_nm: 'Hotel Brisa', cust_tier: 'silver', ord_st: 'pending', owner_id: 'u2', crt_ts: '2026-10-08T10:00:00Z', ln_items: [{ sku: 'A-10', qty: 10, unit_prc: 32.5 }] };
const fetchReturning = (body: unknown, status = 200) => (async () => new Response(JSON.stringify(body), { status })) as unknown as typeof fetch;

it('traduce el DTO heredado al modelo de dominio', async () => {
  const [order] = await createHttpOrderReader(fetchReturning([dto])).findAll();
  expect(order).toEqual({ id: 'P-1', customerName: 'Hotel Brisa', customerTier: 'silver', status: 'pending', ownerId: 'u2', createdAt: '2026-10-08T10:00:00Z', lines: [{ sku: 'A-10', quantity: 10, unitPrice: 32.5 }] });
});

it('convierte un error HTTP en un error de la aplicación', async () => {
  await expect(createHttpOrderReader(fetchReturning({}, 500)).findAll()).rejects.toBeInstanceOf(OrderReadError);
});

it('rechaza estados que el dominio no conoce', async () => {
  await expect(createHttpOrderReader(fetchReturning([{ ...dto, ord_st: 'on_hold' }])).findAll()).rejects.toThrow('ord_st');
});
