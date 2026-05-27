import { test, expect } from '@playwright/test';

test.describe('購買発注一覧画面のテスト', () => {
  
  test.beforeEach(async ({ page }) => {
    // ⭕ 最も標準的なアドレスに戻す（baseURLが設定されているので、相対パスでも可ですが念のためフルで）
    await page.goto('http://localhost:3000/po-list');
  });

  test('初期表示でテーブルとデータが正しくレンダリングされていること', async ({ page }) => {
    await expect(page.locator('text=購買発注 承認待ち一覧')).toBeVisible();
    const table = page.locator('[data-testid="po-table"]');
    await expect(table).toBeVisible();
    const poRow = page.locator('[data-testid="po-row-4500001234"]');
    await expect(poRow).toBeVisible();
    await expect(poRow).toContainText('白石工業');
  });

  test('承認ボタンを押したとき、ステータスが「承認済」に切り替わること', async ({ page }) => {
    const targetId = '4500001234';
    const row = page.locator(`[data-testid="po-row-${targetId}"]`);
    await expect(row).toContainText('承認待ち');

    const approveBtn = page.locator(`[data-testid="approve-btn-${targetId}"]`);
    await approveBtn.click();

    await expect(approveBtn).not.toBeVisible();
    await expect(row).toContainText('承認済');
  });
});