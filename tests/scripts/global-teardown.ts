import { FullConfig } from '@playwright/test';
import { execSync } from 'child_process';

// 関数宣言とエクスポートを一体化し、重複を確実に防ぎます
export default async function globalTeardown(config: FullConfig) {
  // 入力元（.nyc_output）と出力先（coverage-report）を tests/ 配下に固定してコマンド実行
  execSync(
    'npx nyc report --temp-dir=tests/.nyc_output --report-dir=tests/coverage-report --reporter=html --reporter=text-summary', 
    { stdio: 'inherit' }
  );
}