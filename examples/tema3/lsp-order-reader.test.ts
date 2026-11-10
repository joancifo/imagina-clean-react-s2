// @vitest-environment node
import { createInMemoryOrderReader, createStrictOrderReader, describeOrder, type Order, type OrderReader } from './lsp-order-reader';

const data: Order[] = [{ id: 'P-1', status: 'pending' }];

// Test de contrato: TODA implementación de OrderReader debe superarlo.
function orderReaderContract(name: string, create: (orders: Order[]) => OrderReader) {
  describe(`contrato OrderReader · ${name}`, () => {
    it('devuelve el pedido existente', async () => {
      await expect(create(data).findById('P-1')).resolves.toEqual(data[0]);
    });
    it('devuelve null si no existe', async () => {
      await expect(create(data).findById('P-9')).resolves.toBeNull();
    });
  });
}

orderReaderContract('memoria', createInMemoryOrderReader);

// La implementación "estricta" incumple el contrato. it.fails documenta la violación:
// el test está escrito como si cumpliera y Vitest comprueba que FALLA.
describe('contrato OrderReader · estricta (viola LSP)', () => {
  it.fails('devuelve null si no existe', async () => {
    await expect(createStrictOrderReader(data).findById('P-9')).resolves.toBeNull();
  });
});

it('el consumidor funciona con la implementación sustituible', async () => {
  await expect(describeOrder('P-9', createInMemoryOrderReader(data))).resolves.toBe('No existe');
});
