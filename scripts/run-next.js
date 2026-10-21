const { spawn } = require('child_process');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const envPath = path.join(rootDir, '.env');
const dotenv = require('dotenv');

dotenv.config({ path: envPath });

const mode = process.argv[2] || 'dev';
const port = process.env.PORT;

if (!port) {
  console.error('PORT is not defined in frontend/.env');
  process.exit(1);
}

const nextBin = path.join(rootDir, 'node_modules', 'next', 'dist', 'bin', 'next');
const args = mode === 'build'
  ? ['build']
  : mode === 'start'
    ? ['start', '-p', port]
    : ['dev', '-p', port];

const child = spawn(process.execPath, [nextBin, ...args], {
  cwd: rootDir,
  stdio: 'inherit',
  env: { ...process.env, PORT: port },
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});

child.on('error', (error) => {
  console.error(error);
  process.exit(1);
});
