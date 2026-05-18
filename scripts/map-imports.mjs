// Inventario de la base de código: líneas, imports internos (salientes) y quién depende de cada módulo (entrantes).
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const root = resolve('src');
const walk = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? walk(path) : [path];
});
const files = walk(root).filter((f) => /\.tsx?$/.test(f) && !/\.test\.|setupTests|main\.tsx/.test(f));
const toResolved = (from, spec) => {
  const base = resolve(dirname(from), spec);
  return [base, `${base}.ts`, `${base}.tsx`].find((candidate) => files.includes(candidate));
};
const modules = new Map(files.map((file) => [file, { lines: 0, out: new Set(), in: 0 }]));
for (const file of files) {
  const source = readFileSync(file, 'utf8');
  modules.get(file).lines = source.split('\n').length - 1;
  for (const [, spec] of source.matchAll(/from\s+'(\.[^']+)'/g)) {
    const target = toResolved(file, spec);
    if (target) modules.get(file).out.add(target);
  }
}
for (const info of modules.values()) for (const target of info.out) modules.get(target).in += 1;
const rows = [...modules].map(([file, info]) => ({
  modulo: relative('.', file).replaceAll('\\', '/'), lineas: info.lines, salientes: info.out.size, entrantes: info.in,
})).sort((a, b) => b.lineas - a.lineas);
console.table(rows);
