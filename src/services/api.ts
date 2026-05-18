import axios from 'axios';
import type { AnyProps, Order, User } from '../shared/types';
import { getErrorMessage } from '../shared/utils';

const http = axios.create({ baseURL: '/api' });

// Servicio genérico: cualquier pantalla puede pedir cualquier cosa.
export async function doRequest(method: string, url: string, data?: AnyProps) {
  try {
    const response = await http.request({
      method,
      url,
      data,
      headers: { 'x-user-id': 'u2' },
    });
    return response.data;
  } catch (error) {
    alert('Error de red');
    throw error;
  }
}

export const getOrders = (): Promise<Order[]> => doRequest('get', '/orders');
export const getOrder = (id: string): Promise<Order> => doRequest('get', `/orders/${id}`);
export const getMe = (): Promise<User> => doRequest('get', '/me');
export const doAction = (id: string, action: string): Promise<Order> => doRequest('post', `/orders/${id}/${action}`);
export const sendLog = (data: AnyProps) => doRequest('post', '/logs', data);
