// INFRAESTRUCTURA · Adapter conducido (de salida): implementa el puerto OrderReader con fetch.
import { OrderReadError, type OrderReader } from '../application/ports';
import type { OrderDto } from './order-dto';
import { toOrder } from './order-mapper';

export function createHttpOrderReader(fetchFn: typeof fetch = fetch, baseUrl = '/api'): OrderReader {
  return {
    async findAll() {
      const response = await fetchFn(`${baseUrl}/orders`);
      if (!response.ok) throw new OrderReadError(`No se pudieron leer los pedidos (HTTP ${response.status})`);
      const dtos: OrderDto[] = await response.json();
      return dtos.map(toOrder);
    },
  };
}
