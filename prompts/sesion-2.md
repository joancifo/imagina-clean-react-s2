# Prompts de la Sesión 2 — GitHub Copilot en Visual Studio Code

Chat: `Ctrl+Alt+I` (Windows/Linux) · `⌃⌘I` (macOS). Usa **Ask** para analizar y **Edit/Agent** solo cuando decidas aplicar un cambio.
Las instrucciones de `.github/copilot-instructions.md` y de `.github/instructions/*.instructions.md` se añaden como contexto; compruébalo en las referencias de la respuesta.

## P1 · Auditoría SOLID de un archivo
```
#file:src/components/OrderRow.tsx Revisa este componente con SOLID.
Para cada principio: ¿se cumple, se incumple o no aplica? Evidencia ruta:línea,
consecuencia concreta sobre el coste de cambio y la alternativa MÁS PEQUEÑA posible.
No propongas interfaces nuevas salvo que crucen un límite de capa.
```

## P2 · Clasificar dependencias
```
#codebase Lista los imports de src/pages/OrdersPage.tsx y clasifica cada uno como
aceptable, accidental o peligroso (definiciones en docs/checklist-pr.md).
Justifica con ruta:línea. Separa hechos de hipótesis.
```

## P3 · Comparar alternativas antes de decidir
```
#file:src/components/Badge.tsx Compara tres formas de que añadir el estado "on_hold"
no obligue a modificar el componente: switch exhaustivo, tabla con satisfies Record
y componente por estado. Tabla con: archivos tocados, qué detecta el compilador,
facilidad de test y riesgo de sobrediseño. Recomienda una y di qué perderíamos.
```

## P4 · Generar respetando las capas
```
#file:src/orders/application/ports.ts Genera un caso de uso listUrgentOrders en
src/orders/application que use solo el puerto OrderReader y funciones del dominio.
Incluye tests en entorno node con un fake del puerto. No toques otras capas.
```
Después: `npm run lint:arch && npm run test:arch && npm run demo:tema4`.

## Criterio de revisión de las respuestas
1. ¿La evidencia `ruta:línea` existe y dice lo que afirma?
2. ¿Introduce imports que `npm run lint:arch` rechazaría?
3. ¿Crea una abstracción con una sola implementación y sin límite que cruzar?
4. ¿Los tests prueban comportamiento o repiten la implementación?
