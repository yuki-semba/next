import fs from 'fs';
import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  // Playwright の各テストで coverage を保存している前提
  // ここでは nyc report を生成するだけ
  const { execSync } = require('child_process');
  execSync('npx nyc report --reporter=html --reporter=text-summary', {
    stdio: 'inherit'
  });
}

export default globalTeardown;
