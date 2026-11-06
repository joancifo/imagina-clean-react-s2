# OrderDesk · repositorio de prácticas

Curso **Clean Architecture para Frontend con React y Node — SOLID, Code Smells, Patrones y Testing** · Imagina Formación · Joan Cifo

> Proyecto de formación con **code smells y errores sembrados a propósito**. Datos e historial de commits ficticios (el historial está simulado para practicar el análisis de hotspots). No lo despliegues ni reutilices su código.

OrderDesk es un backoffice de pedidos B2B: listado, detalle, aprobación, cancelación y panel. **Funciona, y ese es el problema:** su estructura hace que cada cambio sea caro y arriesgado.

## Requisitos
- Node.js LTS y npm · Git · Visual Studio Code con la extensión de GitHub Copilot

## Arranque
```bash
npm install
npm run dev     # web: http://localhost:5173 · API: http://localhost:3001
```
Usuario activo: clave `userId` de `localStorage` (`u1` admin, `u2` manager, `u3` agente).

## Comandos
| Comando | Qué responde |
|---|---|
| `npm test` | ¿Pasan los tests actuales? |
| `npm run coverage` | ¿Qué código ejecutan los tests? |
| `npm run demo:tema1` | Regla pura y caso de uso probados sin React, navegador ni red |
| `npm run map` | Inventario: líneas, imports salientes y entrantes por módulo |
| `npm run cycles` | Dependencias circulares (madge) |
| `npm run smells` | Complejidad, tamaño y reglas de hooks (ESLint) |
| `npm run deps` | Dependencias sin usar (knip) |
| `npm run hotspots` | Archivos con más commits |

## Material de la Sesión 1
- `examples/tema1/` — ejemplos ejecutables del Tema 1
- `prompts/sesion-1.md` — prompts de GitHub Copilot en modo de solo análisis
- `docs/ejercicio-s1.md` — ejercicio de diagnóstico y matriz de deuda
- `docs/proyecto-final.md` — proyecto final evolutivo
- `.github/copilot-instructions.md` — instrucciones del repositorio para Copilot

Trabaja en una rama propia: `git checkout -b s1/<tu-nombre>`.
