import moment from 'moment';
import { sendLog } from '../services/api';
import type { Order } from './types';

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value);
}

export function formatDate(iso: string): string {
  return moment(iso).format('DD/MM/YYYY');
}

export function calcOrderTotal(order: Order): number {
  const subtotal = order.ln_items.reduce((acc, l) => acc + l.qty * l.unit_prc, 0);
  const discount = order.cust_tier === 'gold' ? 0.1 : order.cust_tier === 'silver' ? 0.05 : 0;
  return subtotal * (1 - discount) * 1.21;
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Error desconocido';
}

export function trackEvent(name: string, payload: object) {
  console.info('[analytics]', name, payload);
  sendLog({ level: 'info', name, payload, user: localStorage.getItem('userId') });
}
