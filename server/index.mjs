// API ficticia en memoria. Reproduce un backend heredado con nombres de campo poco expresivos.
import express from 'express';

const app = express();
app.use(express.json());

const orders = [
  { ord_id: 'P-1001', cust_nm: 'Talleres Norte', cust_tier: 'gold', ord_st: 'pending', owner_id: 'u2', crt_ts: '2026-10-02T09:15:00Z', ln_items: [{ sku: 'A-10', qty: 40, unit_prc: 32.5 }, { sku: 'B-20', qty: 4, unit_prc: 210 }] },
  { ord_id: 'P-1002', cust_nm: 'Ferretería Sol', cust_tier: 'silver', ord_st: 'approved', owner_id: 'u2', crt_ts: '2026-10-03T11:40:00Z', ln_items: [{ sku: 'C-30', qty: 12, unit_prc: 18 }] },
  { ord_id: 'P-1003', cust_nm: 'Construcciones Vega', cust_tier: 'gold', ord_st: 'pending', owner_id: 'u3', crt_ts: '2026-10-05T08:05:00Z', ln_items: [{ sku: 'D-40', qty: 60, unit_prc: 95 }] },
  { ord_id: 'P-1004', cust_nm: 'Clínica Dental Mar', cust_tier: 'standard', ord_st: 'shipped', owner_id: 'u3', crt_ts: '2026-10-06T16:20:00Z', ln_items: [{ sku: 'E-50', qty: 3, unit_prc: 140 }] },
  { ord_id: 'P-1005', cust_nm: 'Hotel Brisa', cust_tier: 'silver', ord_st: 'pending', owner_id: 'u2', crt_ts: '2026-10-08T10:00:00Z', ln_items: [{ sku: 'A-10', qty: 10, unit_prc: 32.5 }] },
  { ord_id: 'P-1006', cust_nm: 'Logística Ebro', cust_tier: 'standard', ord_st: 'cancelled', owner_id: 'u3', crt_ts: '2026-10-09T12:30:00Z', ln_items: [{ sku: 'F-60', qty: 1, unit_prc: 900 }] },
];

const users = {
  u1: { usr_id: 'u1', usr_nm: 'Marta (admin)', usr_role: 'admin' },
  u2: { usr_id: 'u2', usr_nm: 'Pau (manager)', usr_role: 'manager' },
  u3: { usr_id: 'u3', usr_nm: 'Iris (agente)', usr_role: 'agent' },
};

const find = (id) => orders.find((o) => o.ord_id === id);

app.get('/api/me', (req, res) => res.json(users[req.header('x-user-id')] ?? users.u2));
app.get('/api/orders', (_req, res) => res.json(orders));
app.get('/api/orders/:id', (req, res) => {
  const order = find(req.params.id);
  return order ? res.json(order) : res.status(404).json({ err_msg: 'not found' });
});
// Sin comprobación de permisos ni de estado: el backend confía en lo que decide la interfaz.
app.post('/api/orders/:id/:action(approve|cancel|ship)', (req, res) => {
  const order = find(req.params.id);
  if (!order) return res.status(404).json({ err_msg: 'not found' });
  order.ord_st = { approve: 'approved', cancel: 'cancelled', ship: 'shipped' }[req.params.action];
  return res.json(order);
});
app.post('/api/logs', (_req, res) => res.status(204).end());

app.listen(3001, () => console.log('API de OrderDesk en http://localhost:3001'));
