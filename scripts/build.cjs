const { execFileSync } = require('child_process');
const path = require('path');

const root = path.resolve(__dirname, '..');
const tscPath = path.join(root, 'node_modules', 'typescript', 'bin', 'tsc');
const tsconfigPath = path.join(root, 'tsconfig.json');

execFileSync(process.execPath, [tscPath, '-p', tsconfigPath], {
  cwd: root,
  env: process.env,
  stdio: 'inherit',
});
