import fs from 'fs';
import path from 'path';

export async function saveCoverage(page, testInfo) {
  const coverage = await page.evaluate(() => window.__coverage__);
  if (coverage) {
    // 確実に tests/.nyc_output に保存されるよう相対パスを調整
    const file = path.resolve(__dirname, `../.nyc_output/coverage-${testInfo.testId}.json`);
    fs.writeFileSync(file, JSON.stringify(coverage));
  }
}