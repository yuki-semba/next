'use client';

import { useState, useMemo } from 'react';

// SAPから取得する想定の仕入先マスタ（モックデータ）
const mockVendors = [
  { id: 'VND-1000100', name: '白石工業株式会社', type: '原材料', country: '日本', rating: 'A' },
  { id: 'VND-1000201', name: '山下化学工業', type: '化学品', country: '日本', rating: 'B' },
  { id: 'VND-1000300', name: '東西ロジスティクス', type: 'サービス', country: 'シンガポール', rating: 'A' },
  { id: 'VND-2000100', name: 'Global Steel Corp', type: '原材料', country: 'アメリカ', rating: 'S' },
];

export function useVendorController() {
  // 1. 状態（State）の管理
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('すべて');

  // 2. ビジネスロジック（フィルター処理）
  // useMemoを使うことで、入力のたびに無駄な再計算が走るのを防ぎます（パフォーマンス最適化）
  const filteredVendors = useMemo(() => {
    return mockVendors.filter((vendor) => {
      const matchesSearch = 
        vendor.name.includes(searchTerm) || 
        vendor.id.includes(searchTerm);
      
      const matchesType = 
        selectedType === 'すべて' || 
        vendor.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [searchTerm, selectedType]);

  // 3. イベントハンドラー（アクション）
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  // 4. 将来JavaのAPIを叩くための関数枠（スタブ）
  const refreshVendorsFromSAP = async () => {
    console.log('Javaバックエンド経由でSAP S/4HANAの最新マスタを同期します...');
    // ここに fetch('/api/vendors') などを書く
  };

  // ビューに公開するデータと関数（コントローラーのインターフェース）
  return {
    searchTerm,
    selectedType,
    vendors: filteredVendors,
    handleSearchChange,
    handleTypeChange,
    refreshVendorsFromSAP,
  };
}