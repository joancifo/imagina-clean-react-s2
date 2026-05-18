export default function Badge({ status }: { status: string }) {
  const label = status === 'pending' ? 'Pendiente' : status === 'approved' ? 'Aprobado' : status === 'shipped' ? 'Enviado' : 'Cancelado';
  return <span className={status === 'cancelled' ? 'badge badge--danger' : 'badge'}>{label}</span>;
}
