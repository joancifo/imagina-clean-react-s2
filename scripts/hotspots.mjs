// Archivos de src/ que más commits han recibido: candidatos a hotspot (cambio frecuente).
import { execFileSync } from 'node:child_process';

const log = execFileSync('git', ['log', '--format=', '--name-only', '--', 'src'], { encoding: 'utf8' });
const counts = new Map();
for (const file of log.split('\n').filter(Boolean)) counts.set(file, (counts.get(file) ?? 0) + 1);
const rows = [...counts].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([archivo, commits]) => ({ archivo, commits }));
console.table(rows);
