'use client';

import React from 'react';
import { Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress, Alert } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { usePriceController } from './usePriceController';

export default function PriceSearch() {
  const controller = usePriceController();

  return (
    <Box>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ color: 'primary.dark', fontWeight: 'bold', mb: 1 }}>
          品目別 最新価格照会（本物API接続）
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          ボタンを押すと、外部の公開テスト用APIからデータをリアルタイムで非同期取得し、共通ライブラリ経由で描画します。
        </Typography>

        {/* 取得トリガーボタン */}
        <Button
          variant="contained"
          startIcon={controller.loading ? <CircularProgress size={20} color="inherit" /> : <CloudDownloadIcon />}
          onClick={controller.fetchPrices}
          disabled={controller.loading}
          sx={{ mb: 3 }}
        >
          {controller.loading ? 'データ取得中...' : 'リアルタイム価格データ取得'}
        </Button>

        {/* エラー表示 */}
        {controller.error && (
          <Alert severity="error" sx={{ mb: 3 }}>{controller.error}</Alert>
        )}

        {/* データテーブル */}
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: 'action.hover' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>品目ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>品目名称 (Name)</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>品目グループ (Username)</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>担当者窓口 (Email)</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">参考コンタクト (Phone)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {controller.materials.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell align="right" sx={{ fontFamily: 'monospace' }}>{item.phone}</TableCell>
                </TableRow>
              ))}
              {!controller.loading && controller.materials.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ color: 'text.secondary', py: 4 }}>
                    上のボタンを押して最新データをロードしてください。
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}