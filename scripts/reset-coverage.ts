import fs from 'fs';

async function globalSetup() {
  if (fs.existsSync('.nyc_output')) {
    fs.rmSync('.nyc_output', { recursive: true, force: true });
  }
  fs.mkdirSync('.nyc_output');
}

export default globalSetup;
