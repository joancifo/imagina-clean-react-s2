// @vitest-environment node
import { decideApproval, type ApprovalInput } from './srp-approval';

const base: ApprovalInput = { role: 'manager', status: 'pending', total: 500, lines: [{ quantity: 2 }] };

it('un manager aprueba un pedido pendiente normal', () => {
  expect(decideApproval(base)).toEqual({ ok: true });
});

it('un agente no puede aprobar', () => {
  expect(decideApproval({ ...base, role: 'agent' })).toEqual({ ok: false, reason: 'forbidden' });
});

it('más de 10000 € exige administrador', () => {
  expect(decideApproval({ ...base, total: 12000 })).toEqual({ ok: false, reason: 'needs-admin' });
  expect(decideApproval({ ...base, total: 12000, role: 'admin' })).toEqual({ ok: true });
});

it('rechaza líneas con cantidad cero', () => {
  expect(decideApproval({ ...base, lines: [{ quantity: 0 }] })).toEqual({ ok: false, reason: 'invalid-lines' });
});
