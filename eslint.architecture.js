// REGLAS DE ARQUITECTURA · Protegen la regla de dependencia en src/orders (código nuevo).
// El código heredado (src/pages, src/services…) se migra poco a poco; estas reglas no lo bloquean.
// Documentación: https://eslint.org/docs/latest/rules/no-restricted-imports
import tseslint from 'typescript-eslint';

const FRAMEWORKS = {
  group: ['react', 'react-dom', 'react-dom/*', 'react-router', 'react-router-dom', 'axios'],
  message: 'El núcleo (dominio y aplicación) no depende de frameworks ni de clientes HTTP.',
};
const BROWSER_GLOBALS = ['window', 'document', 'localStorage', 'sessionStorage', 'fetch', 'alert'].map((name) => ({
  name,
  message: `"${name}" es un detalle del entorno: accede a él desde infraestructura, detrás de un puerto.`,
}));
const layer = (name) => ({ group: [`**/${name}`, `**/${name}/**`], message: `Esta capa no puede importar de "${name}".` });
const composition = { group: ['**/composition'], message: 'Solo la presentación usa la composición.' };

export default tseslint.config(
  { files: ['src/orders/**/*.{ts,tsx}'], languageOptions: { parser: tseslint.parser } },

  // DOMINIO: no importa nada de otras capas ni de frameworks, ni usa globales del navegador.
  {
    files: ['src/orders/domain/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [FRAMEWORKS, layer('application'), layer('infrastructure'), layer('ui'), composition] }],
      'no-restricted-globals': ['error', ...BROWSER_GLOBALS],
    },
  },

  // APLICACIÓN: solo dominio y sus propios puertos.
  // TODO (Parte A): files 'src/orders/application/**/*.{ts,tsx}'
  //   no-restricted-imports → FRAMEWORKS, layer('infrastructure'), layer('ui'), composition
  //   no-restricted-globals → ...BROWSER_GLOBALS

  // INFRAESTRUCTURA: implementa puertos; nunca conoce la presentación.
  // TODO (Parte A): files 'src/orders/infrastructure/**/*.{ts,tsx}'
  //   no-restricted-imports → layer('ui'), composition

  // PRESENTACIÓN: usa casos de uso y la composición; nunca un adapter concreto.
  // TODO (Parte A): files 'src/orders/ui/**/*.{ts,tsx}'
  //   no-restricted-imports → layer('infrastructure') y axios (mensaje: 'La presentación no habla HTTP: usa un caso de uso.')
);
