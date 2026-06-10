import { test, expect } from '@playwright/test';

test.describe('購買発注一覧画面のテスト', () => {
  
  test.beforeEach(async ({ page }) => {
    // ⭕ 最も標準的なアドレスに戻す（baseURLが設定されているので、相対パスでも可ですが念のためフルで）
    await page.goto('http://localhost:3000/po-list');
  });

  test('初期表示でテーブルとデータが正しくレンダリングされていること', async ({ page }, testInfo) => {

    // キャプチャの保存先を定義（テストごとにユニークなファイル名を生成することも可能）
    const screenshotPath = 'tests/screenshots/po-list/mypage-init.png';

    await expect(page.locator('text=購買発注 承認待ち一覧')).toBeVisible();
    const table = page.locator('[data-testid="po-table"]');
    await expect(table).toBeVisible();
    const poRow = page.locator('[data-testid="po-row-4500001234"]');
    await expect(poRow).toBeVisible();
    await expect(poRow).toContainText('白石工業');

    // 任意のタイミングでキャプチャを自動採取
    await page.screenshot({ path: screenshotPath });
    // レポートにキャプチャを添付
    await testInfo.attachments.push({
    name: '初期表示の画面（エビデンス）',
    path: screenshotPath,
    contentType: 'image/png'
    });
  });

  test('承認ボタンを押したとき、ステータスが「承認済」に切り替わること', async ({ page }, testInfo) => {

    const screenshotPath1 = 'tests/screenshots/po-list/mypage-approved_before.png';
    const screenshotPath2 = 'tests/screenshots/po-list/mypage-approved_after.png';

    const targetId = '4500001234';
    const row = page.locator(`[data-testid="po-row-${targetId}"]`);
    await expect(row).toContainText('承認待ち');

    await page.screenshot({ path: screenshotPath1 });
    await testInfo.attachments.push({
    name: '承認前の画面（エビデンス）',
    path: screenshotPath1,
    contentType: 'image/png'
    });


    const approveBtn = page.locator(`[data-testid="approve-btn-${targetId}"]`);
    await approveBtn.click();

    await expect(approveBtn).not.toBeVisible();

    await expect(row).toContainText('承認済');

    await page.screenshot({ path: screenshotPath2 });
    await testInfo.attachments.push({
    name: '承認後の画面（エビデンス）',
    path: screenshotPath2,
    contentType: 'image/png'
    });
  });
});