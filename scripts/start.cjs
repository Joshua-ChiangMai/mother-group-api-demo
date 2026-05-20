const path = require('path');

const root = path.resolve(__dirname, '..');
const entry = path.join(root, 'dist', 'main.js');

require(entry);
