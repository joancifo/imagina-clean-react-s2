// @vitest-environment node
// Test de arquitectura: comprueba que las reglas de eslint.architecture.js detectan las violaciones.
import { ESLint } from 'eslint';

const eslint = new ESLint({ overrideConfigFile: 'eslint.architecture.js' });

async function errorsFor(filePath: string, code: string): Promise<string[]> {
  const [result] = await eslint.lintText(code, { filePath });
  return result.messages.map((m) => m.ruleId ?? 'parse-error');
}

describe('dominio', () => {
  it('no puede importar React', async () => {
    expect(await errorsFor('src/orders/domain/x.ts', "import { useState } from 'react';")).toContain('no-restricted-imports');
  });
  it('no puede importar infraestructura', async () => {
    expect(await errorsFor('src/orders/domain/x.ts', "import { toOrder } from '../infrastructure/order-mapper';")).toContain('no-restricted-imports');
  });
  it('no puede usar localStorage', async () => {
    expect(await errorsFor('src/orders/domain/x.ts', "export const id = localStorage.getItem('userId');")).toContain('no-restricted-globals');
  });
});

// Parte A · quita .skip cuando hayas escrito la regla de la aplicación.
describe.skip('aplicación', () => {
  it('no puede importar axios', async () => {
    expect(await errorsFor('src/orders/application/x.ts', "import axios from 'axios';")).toContain('no-restricted-imports');
  });
  it('no puede importar un adapter concreto', async () => {
    expect(await errorsFor('src/orders/application/x.ts', "import { createHttpOrderReader } from '../infrastructure/http-order-reader';")).toContain('no-restricted-imports');
  });
  it('sí puede importar el dominio', async () => {
    expect(await errorsFor('src/orders/application/x.ts', "import { calculateTotal } from '../domain/order';\nexport const f = calculateTotal;")).toEqual([]);
  });
});

// Parte A · quita .skip cuando hayas escrito la regla de la presentación.
describe.skip('presentación', () => {
  it('no puede importar infraestructura', async () => {
    expect(await errorsFor('src/orders/ui/x.ts', "import { createHttpOrderReader } from '../infrastructure/http-order-reader';")).toContain('no-restricted-imports');
  });
  it('sí puede importar casos de uso y la composición', async () => {
    expect(await errorsFor('src/orders/ui/x.ts', "import { loadOrderSummary } from '../application/load-order-summary';\nimport { orderReader } from '../composition';\nexport const g = [loadOrderSummary, orderReader];")).toEqual([]);
  });
});

it('el código real de src/orders cumple las reglas', async () => {
  const results = await eslint.lintFiles(['src/orders']);
  const errors = results.flatMap((r) => r.messages.map((m) => `${r.filePath}:${m.line} ${m.message}`));
  expect(errors).toEqual([]);
});
