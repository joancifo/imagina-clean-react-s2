# Prompts de la Sesión 1 — GitHub Copilot en Visual Studio Code

Abre el Chat (`Ctrl+Alt+I` en Windows/Linux, `⌃⌘I` en macOS) y selecciona **Ask**: permite entender el código sin cambiarlo.
Comprueba cada respuesta contra el código y las herramientas. La decisión de diseño es tuya.

## P1 · Mapa de responsabilidades
```
#codebase Elabora una tabla de los módulos de src/ con: ruta, responsabilidad principal,
otras responsabilidades que asume y dependencias externas (React, router, HTTP, localStorage).
Cita evidencia ruta:línea. No propongas cambios todavía.
```

## P2 · Dónde viven las reglas de negocio
```
#codebase Localiza todas las reglas de negocio de pedidos: total, descuentos, permisos y
transiciones de estado. Para cada regla, lista dónde aparece e indica si las versiones
coinciden. Cita ruta:línea y separa hechos de hipótesis.
```

## P3 · Smells de un componente
```
#OrdersPage.tsx Enumera sus responsabilidades e identifica code smells usando
el nombre del catálogo de refactoring.guru cuando exista. Para cada uno: evidencia ruta:línea,
por qué dificulta el cambio y qué pregunta debo comprobar antes de darlo por válido.
```

## P4 · Plan incremental
```
#codebase Propón un único refactor pequeño para reducir el riesgo de la regla de total de un
pedido. Incluye: archivos afectados, tests que deben existir antes, pasos en orden, cómo
revertirlo y un criterio automático que evite la regresión. No modifiques archivos.
```

## Criterio de revisión de las respuestas
1. ¿La evidencia `ruta:línea` existe y dice lo que afirma?
2. ¿La propuesta añade una abstracción que el problema no necesita?
3. ¿Se puede integrar en un Pull Request pequeño?
4. ¿Una herramienta o un test puede confirmarlo?
