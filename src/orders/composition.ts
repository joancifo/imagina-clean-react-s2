// COMPOSICIÓN · Único lugar donde se eligen implementaciones concretas. (Se amplía en la Sesión 4.)
import type { OrderReader } from './application/ports';
import { createHttpOrderReader } from './infrastructure/http-order-reader';

export const orderReader: OrderReader = createHttpOrderReader((input, init) => fetch(input, init));
