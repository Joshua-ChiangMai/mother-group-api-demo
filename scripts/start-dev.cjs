const { spawn } = require('child_process');
const path = require('path');

const root = path.resolve(__dirname, '..');
const tsNodePath = path.join(root, 'node_modules', 'ts-node', 'dist', 'bin.js');
const mainPath = path.join(root, 'src', 'main.ts');

const child = spawn(process.execPath, [tsNodePath, mainPath], {
  cwd: root,
  env: process.env,
  stdio: 'inherit',
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
