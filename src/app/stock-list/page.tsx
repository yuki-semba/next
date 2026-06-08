'use client';

import React from 'react';
import { Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation'; // ⭕ ルーターをインポート

const stockData = [
  { materialId: 'MAT-001', name: '高張力鋼板 (10mm)', plant: '東京第1工場', qty: 450, unit: '枚' },
  { materialId: 'MAT-002', name: 'アルミフレーム型材', plant: '大阪第2工場', qty: 1200, unit: '本' },
  { materialId: 'MAT-003', name: '結束バンド (耐熱型)', plant: '東京第1工場', qty: 5500, unit: '個' },
  { materialId: 'MAT-004', name: '防錆潤滑スプレー', plant: '名古屋第1倉庫', qty: 85, unit: '缶' },
];

export default function StockList() {
  const router = useRouter(); // ⭕ ルーターの初期化

  return (
    <Box>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ color: 'primary.dark', fontWeight: 'bold', mb: 3 }}>
          プラント別 在庫一覧
        </Typography>

        <TextField
          size="small"
          placeholder="品目番号、品目名で検索..."
          sx={{ mb: 3, width: 300 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: 'action.hover' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>品目コード</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>品目名</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>保管場所（プラント）</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">現在庫数</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>単位</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockData.map((row) => (
                <TableRow 
                  key={row.materialId} 
                  hover 
                  onClick={() => router.push(`/stock-list/${row.materialId}`)} // ⭕ クリックで詳細へ
                  sx={{ cursor: 'pointer' }} // ⭕ マウスカーソルを指マークにする
                  data-testid={`stock-row-${row.materialId}`}
                >
                  <TableCell sx={{ fontFamily: 'monospace', fontWeight: 'bold', color: 'primary.main' }}>
                    {row.materialId}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.plant}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', color: row.qty < 100 ? 'error.main' : 'text.primary' }}>
                    {row.qty.toLocaleString()}
                  </TableCell>
                  <TableCell color="text.secondary">{row.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}