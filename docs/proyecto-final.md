# Proyecto final evolutivo

**Objetivo:** transformar la feature **Pedidos** de OrderDesk, incrementalmente, en una feature mantenible, testeable y protegida por controles automáticos, sin cambiar su comportamiento salvo los errores que se decida corregir de forma explícita.

## Hitos por sesión
| Sesión | Fecha | Avance |
|---|---|---|
| 1 | 10 nov | Diagnóstico y matriz de deuda |
| 2 | 11 nov | Reglas de importación, checklist SOLID y arquitectura objetivo por capas |
| 3 | 12 nov | Decisión de estructura (capas, feature o slice) y reglas de negocio en módulos puros |
| 4 | 16 nov | Casos de uso, puertos, adapters, fakes y Composition Root |
| 5 | 18 nov | Hooks adaptadores, view models o presenters, estado y routing |
| 6 | 19 nov | Rol de Node (BFF si aporta), formularios, errores y seguridad |
| 7 | 23 nov | Medición de rendimiento, refactor incremental y estrategia de testing |
| 8 | 25 nov | Tests unitarios, de componentes y de integración |
| 9 | 26 nov | E2E crítico, mejoras de CI/CD y ADR |
| 10 | 30 nov | Entorno de IA reutilizable y presentación: decisiones, trade-offs, métricas y plan de evolución |

## Criterios de evaluación
- Evidencia: cada decisión se apoya en código, medición o test.
- Trade-offs: se justifica también lo que se decide **no** aplicar.
- Incrementalidad: Pull Requests pequeños y revisables.
- Protección: tests y controles automáticos que evitan regresiones.
- Uso responsable de IA: todo cambio asistido se revisa y se entiende.
