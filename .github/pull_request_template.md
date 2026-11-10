## Qué cambia y por qué

## Checklist de arquitectura (Sesión 2)
- [ ] **SRP:** cada archivo modificado tiene una sola razón para cambiar (un actor).
- [ ] **OCP:** añadir un caso nuevo (estado, rol, nivel) no obliga a editar ramas `if/else` dispersas.
- [ ] **LSP:** las implementaciones nuevas de un puerto superan su test de contrato.
- [ ] **ISP:** componentes y funciones reciben solo los datos que usan.
- [ ] **DIP:** dominio y aplicación dependen de puertos, no de fetch, axios, React ni `localStorage`.
- [ ] `npm run lint:arch` y `npm run test:arch` en verde.
- [ ] No hay interfaces nuevas con una sola implementación que no crucen un límite.

## Cómo lo he comprobado
