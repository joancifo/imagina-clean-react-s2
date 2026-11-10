---
applyTo: "src/orders/domain/**,src/orders/application/**"
---
# Núcleo de pedidos (dominio y aplicación)

- Código TypeScript puro: sin React, router, axios, fetch, `window` ni `localStorage`.
- El dominio usa el lenguaje del negocio (`status`, `customerName`), nunca nombres del backend.
- Un caso de uso es una función con una intención de producto, entrada y salida explícitas, y sus dependencias como parámetros tipados con puertos de `application/ports.ts`.
- Cada caso de uso nuevo llega con tests en entorno `node` que usan un doble de prueba del puerto.
