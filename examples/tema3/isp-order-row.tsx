// ISP · El componente pide solo lo que usa, en el lenguaje de la pantalla.
// Origen: src/components/OrderRow.tsx:5-21 (Order completo del backend + 14 props más).
import type { ReactNode } from 'react';

export type OrderRowView = {
  id: string;
  customer: string;
  statusLabel: string;
  total: string; // ya formateado: la fila no decide el formato
};

type Props = { row: OrderRowView; actions?: ReactNode };

export function OrderRowLite({ row, actions }: Props) {
  return (
    <tr>
      <td>{row.id}</td>
      <td>{row.customer}</td>
      <td>{row.statusLabel}</td>
      <td>{row.total}</td>
      <td>{actions}</td>
    </tr>
  );
}
