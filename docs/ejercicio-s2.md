# Ejercicio Sesión 2 · Proteger el núcleo de Pedidos

**Duración:** 30 minutos (19:00 – 19:30) · **Corrección:** 15 minutos (19:30 – 19:45)
**Avance del proyecto final:** reglas de importación, checklist SOLID y primer caso de uso en la arquitectura por capas.

```bash
git checkout -b s2/<tu-nombre>
npm install
npm run test:arch   # 4 tests en verde y 5 omitidos (skipped): los activarás tú
```

## Parte A · Reglas de importación (15 min)
Archivo: `eslint.architecture.js`. La regla del **dominio** está hecha como modelo.

1. Completa los tres bloques marcados con `TODO`:
   - **Aplicación:** puede importar `domain`. No puede importar frameworks (`FRAMEWORKS`), `infrastructure`, `ui` ni `composition`, ni usar globales del navegador (`BROWSER_GLOBALS`).
   - **Infraestructura:** no puede importar `ui` ni `composition`.
   - **Presentación:** no puede importar `infrastructure` ni `axios`.
2. En `src/orders/architecture.test.ts`, quita `.skip` de los bloques `aplicación` y `presentación`.
3. `npm run test:arch` → todo en verde.
4. Prueba de fuego: añade `import axios from 'axios';` a `src/orders/application/ports.ts`, ejecuta `npm run lint:arch`, lee el mensaje y deshaz el cambio.

## Parte B · Un caso de uso con su doble de prueba (15 min)
Archivos: `src/orders/application/list-urgent-orders.ts` y su `.test.ts`.

1. Implementa `createFakeOrderReader` en el test: devuelve un `OrderReader` cuyo `findAll` resuelve los pedidos recibidos.
2. Quita `.skip` del `describe`. Los tests fallan: es lo esperado.
3. Implementa `listUrgentOrders`: solo pedidos urgentes del dominio (`isUrgent`), con `id`, `customerName` y `total` (`calculateTotal`), ordenados de mayor a menor importe.
4. `npm test && npm run lint:arch` → verde.

## Entrega
```bash
git add -A
git commit -m "feat(orders): reglas de arquitectura y caso de uso listUrgentOrders"
git push -u origin s2/<tu-nombre>
```
Abre el Pull Request y completa la checklist de la plantilla. Si no tienes permisos de escritura, haz un fork.

## Ampliación (si terminas antes)
- Pide a Copilot el prompt P1 de `prompts/sesion-2.md` sobre `OrderRow.tsx` y anota qué respuesta rechazarías y por qué.
- Copia `docs/arquitectura-objetivo.md` como `docs/arquitectura-<tu-nombre>.md` y clasifica 6 responsabilidades del código heredado (tarea para la Sesión 3).
