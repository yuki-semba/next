'use client';

import { useState } from 'react';
import { apiClient } from '../../lib/apiClient'; // 共有ライブラリをインポート

// 公開APIのデータ構造（今回はSAPの品目・価格データに見立てます）
interface MaterialPrice {
  id: number;
  name: string;      // 品目名
  username: string;  // 品目グループコード（見立て）
  email: string;     // 管理者メール
  phone: string;     // 参考価格（公開APIの文字列をそのまま利用）
}

export function usePriceController() {
  const [materials, setMaterials] = useState<MaterialPrice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API実行トリガー関数
  const fetchPrices = async () => {
    setLoading(true);
    setError(null);
    try {
      // ⭕ 画面（コントローラー）側でエンドポイントを指定して、共通ライブラリに実効を委ねる
      const data = await apiClient.get<MaterialPrice[]>('/users');
      setMaterials(data);
    } catch (err: any) {
      setError('SAP連携データの取得に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  return {
    materials,
    loading,
    error,
    fetchPrices,
  };
}