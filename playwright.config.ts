import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 1, // WSLの負荷を抑えるため、まずは1つで確実に動かす
  reporter: 'html',
  
  use: {
    /* 標準の localhost に統一 */
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  
  timeout: 60 * 1000, 
  expect: { timeout: 5000 },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        /* ChromiumがWSL内の localhost を見失わないためのプロキシ迂回設定 */
        launchOptions: {
          args: ['--proxy-server="direct://"', '--proxy-bypass-list=*']
        }
      },
    },
  ],

  /* 最も標準的な `npm run dev` による自動起動 */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 60 * 1000,
  },
});