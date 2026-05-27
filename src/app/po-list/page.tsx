'use client';

import React, { useState } from 'react';
import { 
  Container, Typography, Box, AppBar, Toolbar, Paper, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Button, Chip, Stack, IconButton, Tooltip 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

// SAPのODataから取得する想定のモックデータ
const initialPOData = [
  { id: '4500001234', supplier: '1000100 (白石工業)', material: 'ベアリング一式', amount: '¥1,200,000', status: '待機中' },
  { id: '4500001235', supplier: '1000201 (山下化学)', material: '樹脂生材 500kg', amount: '¥450,000', status: '承認済' },
  { id: '4500001236', supplier: '1000300 (東西ロジ)', material: '定期保守部品', amount: '¥88,000', status: '待機中' },
];

export default function POList() {
  const [poList, setPoList] = useState(initialPOData);

  // ステータス変更処理（将来的にJavaバックエンドのAPIを叩く部分）
  const handleStatusChange = (id: string, newStatus: string) => {
    setPoList(prev => prev.map(po => po.id === id ? { ...po, status: newStatus } : po));
  };

  // Fioriのステータスカラーを模倣
  const getStatusChip = (status: string) => {
    switch (status) {
      case '承認済':
        return <Chip label="承認済" color="success" size="small" variant="outlined" />;
      case '却下済':
        return <Chip label="却下済" color="error" size="small" variant="outlined" />;
      default:
        return <Chip label="承認待ち" color="warning" size="small" />;
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* ヘッダー */}
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" href="/" sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            購買管理ポータル
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'primary.dark', fontWeight: 'bold', mb: 3 }}>
            購買発注 承認待ち一覧
          </Typography>

          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="PO Table" data-testid="po-table">
              <TableHead sx={{ bgcolor: 'action.hover' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>購買発注番号</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>仕入先</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>品目テキスト</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="right">金額</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">ステータス</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">アクション</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {poList.map((po) => (
                  <TableRow key={po.id} hover data-testid={`po-row-${po.id}`}>
                    <TableCell component="th" scope="row" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                      {po.id}
                    </TableCell>
                    <TableCell>{po.supplier}</TableCell>
                    <TableCell>{po.material}</TableCell>
                    <TableCell align="right">{po.amount}</TableCell>
                    <TableCell align="center">{getStatusChip(po.status)}</TableCell>
                    <TableCell align="center">
                      {po.status === '待機中' ? (
                        <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
                          <Tooltip title="承認">
                            <IconButton 
                              color="success" 
                              onClick={() => handleStatusChange(po.id, '承認済')}
                              data-testid={`approve-btn-${po.id}`}
                            >
                              <CheckCircleIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="却下">
                            <IconButton 
                              color="error" 
                              onClick={() => handleStatusChange(po.id, '却下済')}
                              data-testid={`reject-btn-${po.id}`}
                            >
                              <CancelIcon />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      ) : (
                        <Typography variant="body2" color="text.disabled">処理済</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
}