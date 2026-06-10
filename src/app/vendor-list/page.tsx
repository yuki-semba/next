'use client';

import React from 'react';
import { Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, MenuItem, Stack, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useVendorController } from './useVendorController'; // ⚙️ コントローラーをインポート

export default function VendorList() {
  // コントローラーを呼び出して、画面に必要なデータや関数を「解体」して受け取る
  const controller = useVendorController();

  return (
    <Box>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        
        {/* タイトルエリア */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ color: 'primary.dark', fontWeight: 'bold' }}>
            仕入先マスタ検索 (SAP同期)
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={<RefreshIcon />}
            onClick={controller.refreshVendorsFromSAP}
          >
            SAP最新化
          </Button>
        </Stack>

        {/* 検索フィルターバーエリア */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <TextField
            size="small"
            label="仕入先コード・名称"
            value={controller.searchTerm}
            onChange={(e) => controller.handleSearchChange(e.target.value)}
            sx={{ width: 300 }}
          />

          <TextField
            select
            size="small"
            label="業種タイプ"
            value={controller.selectedType}
            onChange={(e) => controller.handleTypeChange(e.target.value)}
            sx={{ width: 180 }}
          >
            <MenuItem value="すべて">すべて</MenuItem>
            <MenuItem value="原材料">原材料</MenuItem>
            <MenuItem value="化学品">化学品</MenuItem>
            <MenuItem value="サービス">サービス</MenuItem>
          </TextField>
        </Stack>

        {/* データテーブルエリア */}
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: 'action.hover' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>仕入先コード</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>仕入先名称</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>業種</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>国・地域</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">評価ランク</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {controller.vendors.map((vendor) => (
                <TableRow key={vendor.id} hover>
                  <TableCell sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{vendor.id}</TableCell>
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>{vendor.type}</TableCell>
                  <TableCell>{vendor.country}</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    {vendor.rating}
                  </TableCell>
                </TableRow>
              ))}
              {controller.vendors.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ color: 'text.secondary', py: 4 }}>
                    該当する仕入先が見つかりません。
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