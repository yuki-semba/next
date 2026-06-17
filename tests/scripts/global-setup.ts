import fs from 'fs';
import path from 'path';

async function globalSetup() {
  const nycOutputDir = path.resolve(__dirname, '../.nyc_output');
  
  if (fs.existsSync(nycOutputDir)) {
    fs.rmSync(nycOutputDir, { recursive: true, force: true });
  }
  fs.mkdirSync(nycOutputDir, { recursive: true });
}

export default globalSetup;