// APLICACIÓN · Puertos: contratos que el núcleo necesita y que la infraestructura implementa.
import type { Order } from '../domain/order';

export interface OrderReader {
  /** Devuelve todos los pedidos visibles. Lanza OrderReadError si no puede leerlos. */
  findAll(): Promise<Order[]>;
}

export class OrderReadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OrderReadError';
  }
}
