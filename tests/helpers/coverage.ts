import fs from 'fs';

export async function saveCoverage(page, testInfo) {
  const coverage = await page.evaluate(() => window.__coverage__);
  if (coverage) {
    const file = `.nyc_output/coverage-${testInfo.testId}.json`;
    fs.writeFileSync(file, JSON.stringify(coverage));
  }
}
