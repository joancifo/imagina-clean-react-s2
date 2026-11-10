// @vitest-environment node
import { STATUS_VIEW, statusView } from './ocp-order-status';

it('cada estado tiene etiqueta y tono', () => {
  expect(statusView('shipped')).toEqual({ label: 'Enviado', tone: 'neutral' });
  expect(statusView('cancelled').tone).toBe('danger');
});

it('no hay estados sin vista', () => {
  expect(Object.keys(STATUS_VIEW).sort()).toEqual(['approved', 'cancelled', 'pending', 'shipped']);
});
