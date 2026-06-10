/**
 * 共通API実行ライブラリ
 */
export const apiClient = {
  /**
   * 共通GETリクエスト関数
   * @param endpoint 画面側から指定されたエンドポイント (例: '/users')
   */
  get: async <T>(endpoint: string): Promise<T> => {
    // 実際のAzure×SAP開発では、ここにAzure側API ManagementのベースURLや、認証ヘッダーを仕込みます
    const baseUrl = 'https://jsonplaceholder.typicode.com'; 
    const url = `${baseUrl}${endpoint}`;

    console.log(`[API Request] GET: ${url}`); // 共通ログ

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer XXXXX', // 将来の認証拡張
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error(`[API Error] GET: ${url} failed.`, error);
      throw error; // 画面側にエラーを伝播させてハンドリングさせる
    }
  }
};