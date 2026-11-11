# Solución del ejercicio de la Sesión 2 (versión del profesor)

Repositorio de referencia: este mismo. Diferencias con el de prácticas:

| Archivo | Prácticas | Solución |
|---|---|---|
| `eslint.architecture.js` | Solo la regla del dominio | Reglas de aplicación, infraestructura y presentación |
| `src/orders/architecture.test.ts` | `aplicación` y `presentación` con `.skip` | Todo activo (9 tests) |
| `src/orders/application/list-urgent-orders.ts` | Lanza «Por implementar» | Implementado |
| `src/orders/application/list-urgent-orders.test.ts` | Fake por implementar y `describe.skip` | Fake y 3 tests activos |

## Parte A · paso a paso
1. Copiar el bloque del dominio y cambiar `files` a `src/orders/application/**/*.{ts,tsx}`. Quitar `layer('application')` de los patrones (la capa puede importarse a sí misma).
2. Infraestructura: solo `layer('ui')` y `composition`. Sin `no-restricted-globals`: aquí `fetch` es legítimo.
3. Presentación: `layer('infrastructure')` y `{ group: ['axios'], message: … }`. No se prohíbe React: es su capa.
4. Quitar los dos `.skip` → `npm run test:arch`: 9 passed.
5. Prueba de fuego: `import axios from 'axios'` en `ports.ts` → `npm run lint:arch` muestra *'axios' import is restricted from being used by a pattern. El núcleo (dominio y aplicación) no depende de frameworks ni de clientes HTTP.*

Errores frecuentes:
- Escribir los patrones como rutas absolutas (`src/orders/infrastructure`): `no-restricted-imports` compara con el texto del import (`../infrastructure/…`), por eso se usa `**/infrastructure/**`.
- Repetir `files` de la capa en dos objetos: en la configuración plana, el último objeto que define la regla para un archivo sustituye a los anteriores.

## Parte B · paso a paso
```ts
function createFakeOrderReader(orders: Order[]): OrderReader {
  return { findAll: async () => orders };
}

export async function listUrgentOrders(orders: OrderReader): Promise<UrgentOrder[]> {
  const all = await orders.findAll();
  return all
    .filter(isUrgent)
    .map((order) => ({ id: order.id, customerName: order.customerName, total: calculateTotal(order) }))
    .sort((a, b) => b.total - a.total);
}
```
Puntos a comentar en la corrección:
- El fake es la prueba de DIP: el caso de uso se ejecuta sin red porque depende de `OrderReader`, no de `fetch`.
- `isUrgent` ya filtra `pending`: repetir `status === 'pending'` en el caso de uso sería duplicar la regla.
- El test del total (3000 × 1,21 = 3630) fija el comportamiento con IVA; un error típico es comparar el subtotal.
- `npm run lint:arch` en verde demuestra que el caso de uso no importa nada prohibido.
