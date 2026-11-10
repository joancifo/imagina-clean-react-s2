import { render, screen } from '@testing-library/react';
import { OrderRowLite } from './isp-order-row';

it('se renderiza con cuatro datos y sin conocer al usuario ni el backend', () => {
  render(
    <table><tbody>
      <OrderRowLite
        row={{ id: 'P-1', customer: 'Hotel Brisa', statusLabel: 'Pendiente', total: '393,25 €' }}
        actions={<button>Aprobar</button>}
      />
    </tbody></table>,
  );
  expect(screen.getByRole('row')).toHaveTextContent('Hotel Brisa');
  expect(screen.getByRole('button', { name: 'Aprobar' })).toBeInTheDocument();
});
