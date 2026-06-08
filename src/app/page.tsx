'use client';

import React from 'react';
import { Typography, Grid, Card, CardContent, CardActionArea, Box } from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InventoryIcon from '@mui/icons-material/Inventory';
import Link from 'next/link';

const apps = [
  { title: '購買発注 承認待ち一覧', desc: 'SAP S/4HANAから取得したPOの一覧確認および承認・却下処理を行います。', path: '/po-list', icon: <ReceiptIcon sx={{ fontSize: 40, color: '#0a6ed1' }} /> },
  { title: 'プラント別 在庫一覧', desc: '各工場・倉庫のリアルタイム在庫数を集計・確認します。', path: '/stock-list', icon: <InventoryIcon sx={{ fontSize: 40, color: '#0a6ed1' }} /> },
];

export default function Home() {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.dark' }}>
        ようこそ、業務ポータルへ
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        利用するアプリケーションを選択してください。
      </Typography>

      <Grid container spacing={3}>
        {apps.map((app, index) => (
          <Grid xs={12} sm={6} key={index}>
            <Card elevation={2} sx={{ borderRadius: 2, '&:hover': { boxShadow: 4 } }}>
              <CardActionArea component={Link} href={app.path} sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {app.icon}
                  <Typography variant="h6" sx={{ ml: 2, fontWeight: 'bold' }}>
                    {app.title}
                  </Typography>
                </Box>
                <CardContent sx={{ p: 0, pl: 7 }}>
                  <Typography variant="body2" color="text.secondary">
                    {app.desc}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}