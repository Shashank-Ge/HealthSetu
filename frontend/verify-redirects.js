import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const redirectsPath = path.join(__dirname, 'dist', '_redirects');

console.log('Checking if _redirects file exists in dist directory...');

if (fs.existsSync(redirectsPath)) {
  const content = fs.readFileSync(redirectsPath, 'utf8');
  console.log('✅ _redirects file found!');
  console.log('Content:', content);
  console.log('Your Render deployment should now handle SPA routing correctly.');
} else {
  console.error('❌ _redirects file not found in dist directory!');
  console.error('Make sure the postbuild script is running correctly.');
} 