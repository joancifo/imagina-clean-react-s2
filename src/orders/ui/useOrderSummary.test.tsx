import { renderHook, waitFor } from '@testing-library/react';
import { useOrderSummary } from './useOrderSummary';
import type { OrderReader } from '../application/ports';

it('el hook se prueba con un fake del puerto, sin servidor', async () => {
  const reader: OrderReader = { findAll: async () => [] };
  const { result } = renderHook(() => useOrderSummary(reader));
  expect(result.current.status).toBe('loading');
  await waitFor(() => expect(result.current).toEqual({ status: 'ready', summary: { pendingCount: 0, pendingAmount: 0, urgentCount: 0 } }));
});

it('expone el error sin alert() ni console', async () => {
  const reader: OrderReader = { findAll: async () => { throw new Error('caído'); } };
  const { result } = renderHook(() => useOrderSummary(reader));
  await waitFor(() => expect(result.current.status).toBe('error'));
});
