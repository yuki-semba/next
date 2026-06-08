'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Paper, Typography, Button, Grid, Divider, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// 本来はURLのIDを元にJavaのAPIから引っ張ってくる詳細モックデータ
const stockDetailDetails: Record<string, any> = {
  'MAT-001': { name: '高張力鋼板 (10mm)', plant: '東京第1工場', qty: 450, unit: '枚', bin: 'A-12', leadTime: '5日間', vendor: '新中央鋼鉄' },
  'MAT-002': { name: 'アルミフレーム型材', plant: '大阪第2工場', qty: 1200, unit: '本', bin: 'B-04', leadTime: '3日間', vendor: '関西軽金属' },
  'MAT-003': { name: '結束バンド (耐熱型)', plant: '東京第1工場', qty: 5500, unit: '個', bin: 'C-01', leadTime: '1日間', vendor: '東洋プラスチック' },
  'MAT-004': { name: '防錆潤滑スプレー', plant: '名古屋第1倉庫', qty: 85, unit: '缶', bin: 'D-09', leadTime: '2日間', vendor: '中部化学工業' },
};

export default function StockDetail() {
  const params = useParams();
  const router = useRouter();
  
  // URLからID（MAT-001など）を取得（params.id はフォルダ名の [id] と連動しています）
  const materialId = params.id as string;
  const detail = stockDetailDetails[materialId];

  if (!detail) {
    return <Typography>該当する品目データが見つかりません。</Typography>;
  }

  return (
    <Box>
      {/* 戻るボタン */}
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => router.push('/stock-list')}
        sx={{ mb: 2 }}
      >
        在庫一覧に戻る
      </Button>

      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
              品目コード: {materialId}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
              {detail.name}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* 2カラムで詳細情報をスッキリ表示（MUI Grid v6対応） */}
        <Grid container spacing={3}>
          <Grid xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">保管プラント / 倉庫</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>{detail.plant}</Typography>

            <Typography variant="subtitle2" color="text.secondary">棚番 (Binコード)</Typography>
            <Typography variant="body1" sx={{ fontFamily: 'monospace', mb: 2 }}>{detail.bin}</Typography>
          </Grid>

          <Grid xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">現在庫数</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
              {detail.qty.toLocaleString()} <Typography component="span" variant="body1" color="text.secondary">{detail.unit}</Typography>
            </Typography>

            <Typography variant="subtitle2" color="text.secondary">主要仕入先</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{detail.vendor}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}