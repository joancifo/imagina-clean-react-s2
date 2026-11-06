import Badge from './Badge';
import { formatCurrency, formatDate } from '../shared/utils';
import type { Order } from '../shared/types';

type Props = {
  order: Order;
  showTotal: boolean;
  showDate: boolean;
  showOwner: boolean;
  isAdmin: boolean;
  isManager: boolean;
  isCompact: boolean;
  isHighlighted: boolean;
  canApprove: boolean;
  canCancel: boolean;
  disabled: boolean;
  ownerName?: string;
  onApprove: (order: Order) => void;
  onCancel: (order: Order) => void;
  onOpen: (id: string) => void;
};

// 15 props, 10 de ellas booleanas: cada combinación es una variante distinta del componente.
export default function OrderRow(props: Props) {
  const { order, showTotal, showDate, showOwner, isAdmin, isManager, isCompact, isHighlighted, canApprove, canCancel, disabled, ownerName, onApprove, onCancel, onOpen } = props;
  return (
    <tr className={isHighlighted ? 'order-row order-row--urgent' : 'order-row'} style={{ background: order.rowColor === 'grey' ? '#eee' : undefined }}>
      <td><button onClick={() => onOpen(order.ord_id)}>{order.ord_id}</button></td>
      <td>{isCompact ? order.cust_nm.slice(0, 12) : order.cust_nm}</td>
      {showDate && <td>{formatDate(order.crt_ts)}</td>}
      {showOwner && <td>{ownerName ?? order.owner_id}</td>}
      <td><Badge status={order.ord_st} /></td>
      {showTotal && <td className="order-row__total">{formatCurrency(order.total ?? 0)}</td>}
      <td>
        {canApprove && !disabled && (isAdmin || isManager) && <button onClick={() => onApprove(order)}>Aprobar</button>}
        {canCancel && !disabled && <button onClick={() => onCancel(order)}>Cancelar</button>}
      </td>
    </tr>
  );
}
