import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import OrdersPage from './OrdersPage';
import { AppStoreProvider, useAppStore } from '../store/appStore';
import * as api from '../services/api';
import { useEffect } from 'react';

vi.mock('../services/api');

const raw = {
  ord_id: 'P-1', cust_nm: 'Cliente', cust_tier: 'gold', ord_st: 'pending', owner_id: 'u2',
  crt_ts: '2026-10-02T09:15:00Z', ln_items: [{ sku: 'A', qty: 50, unit_prc: 100 }],
};

function SeedUser() {
  const { setUser } = useAppStore();
  useEffect(() => setUser({ usr_id: 'u2', usr_nm: 'Pau', usr_role: 'manager' }), []);
  return null;
}

function renderPage() {
  return render(
    <MemoryRouter>
      <AppStoreProvider>
        <SeedUser />
        <OrdersPage />
      </AppStoreProvider>
    </MemoryRouter>,
  );
}

describe('OrdersPage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.mocked(api.getOrders).mockResolvedValue([raw]);
    vi.mocked(api.sendLog).mockResolvedValue(undefined);
  });

  it('pinta la fila urgente', async () => {
    const { container } = renderPage();
    await waitFor(() => expect(container.querySelector('.order-row--urgent')).not.toBeNull());
    expect(container.querySelector('tbody tr td:nth-child(6)')?.className).toBe('order-row__total');
    expect(container.querySelectorAll('.order-row button').length).toBe(2);
  });

  it('coincide con la instantánea', async () => {
    const { container } = renderPage();
    await waitFor(() => expect(container.querySelector('.order-row')).not.toBeNull());
    expect(container.querySelector('table')?.innerHTML).toMatchSnapshot();
  });
});
