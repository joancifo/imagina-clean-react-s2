---
applyTo: "src/orders/infrastructure/**,src/orders/ui/**"
---
# Bordes de pedidos (infraestructura y presentación)

- Infraestructura implementa puertos de `application/ports.ts` y traduce DTO ↔ dominio en un mapper. Valida en tiempo de ejecución los valores que llegan del backend.
- Presentación no importa `infrastructure`: obtiene implementaciones desde `composition.ts`.
- Los hooks de `ui` adaptan casos de uso a React y exponen estados `loading`, `ready` y `error`; no usan `alert()`.
