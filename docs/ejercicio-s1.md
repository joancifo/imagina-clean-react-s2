# Ejercicio de la Sesión 1 · Diagnóstico de OrderDesk

**Tiempo:** 30 min (15 + 15) · **Corrección en clase:** 15 min · **Rama:** `s1/<tu-nombre>` · **Entrega:** `docs/diagnostico-<tu-nombre>.md`

## Parte A · Hallazgos con evidencia (15 min)
1. Ejecuta `npm run map`, `npm run cycles`, `npm run smells`, `npm run deps`, `npm run coverage` y `npm run hotspots`.
2. Arranca la app con `npm run dev`. Como manager (`u2`), comprueba en la lista, el detalle y el panel qué ocurre con los pedidos `P-1002` y `P-1003`.
3. Registra **al menos 6 hallazgos** de categorías distintas. Puedes usar los prompts P1–P3 de `prompts/sesion-1.md`, pero cada hallazgo debe llevar evidencia comprobada por ti.

| # | Hallazgo | Categoría | Evidencia `ruta:línea` | Por qué encarece el cambio |
|---|---|---|---|---|
| H1 |  |  |  |  |

Categorías: regla de negocio · acoplamiento · componente · hook/efecto · estructura · test · dependencia.

## Parte B · Matriz de deuda (15 min)
Puntúa tus **5 hallazgos más importantes** de 1 a 5.

- **Impacto:** cuánto daña al negocio o al equipo.
- **Riesgo:** probabilidad de que cause un fallo o una regresión.
- **Facilidad:** 5 = muy fácil y seguro de mejorar; 1 = muy costoso.
- **Prioridad** = (Impacto + Riesgo) × Facilidad. Es un criterio de ordenación del curso, no un estándar: sirve para discutir, no sustituye al juicio.

| # | Impacto | Riesgo | Facilidad | Prioridad | Primer paso pequeño | Criterio automático |
|---|---|---|---|---|---|---|
| H1 |  |  |  |  |  |  |

Cierra con una frase: **«Mi primer Pull Request sería … porque …»**.

```bash
git checkout -b s1/<tu-nombre>
git add docs/diagnostico-<tu-nombre>.md
git commit -m "docs: diagnóstico de OrderDesk"
git push -u origin s1/<tu-nombre>
```
> Si no tienes permisos de escritura sobre este repositorio, haz un fork y sube ahí tu rama.
