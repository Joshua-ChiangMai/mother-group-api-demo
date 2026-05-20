const { execFileSync } = require('child_process');
const path = require('path');

const root = path.resolve(__dirname, '..');
const buildScript = path.join(root, 'scripts', 'build.cjs');
const testFile = path.join('test', 'smoke.test.js');

require(buildScript);

execFileSync(process.execPath, ['--test', testFile], {
  cwd: root,
  env: process.env,
  stdio: 'inherit',
});
