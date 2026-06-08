'use client';

import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/styles'; // もしエラーが出る場合は '@mui/material/styles' にしてください
import { ThemeProvider as MuiThemeProvider, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, AppBar, CssBaseline } from '@mui/material';
import theme from './theme';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InventoryIcon from '@mui/icons-material/Inventory';
import Link from 'next/link';

const drawerWidth = 240;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <AppRouterCacheProvider>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex' }}>
              {/* 共通ヘッダー */}
              <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} elevation={1}>
                <Toolbar variant="dense">
                  <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
                    SAP Azure Side-by-Side Portal
                  </Typography>
                </Toolbar>
              </AppBar>

              {/* 共通左メニュー（サイドバー） */}
              <Drawer
                variant="permanent"
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
              >
                <Toolbar variant="dense" /> {/* ヘッダーの下に隙間を作るための空のツールバー */}
                <Box sx={{ overflow: 'auto', mt: 2 }}>
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton component={Link} href="/">
                        <ListItemIcon><DashboardIcon color="primary" /></ListItemIcon>
                        <ListItemText primary="ポータルTOP" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton component={Link} href="/po-list">
                        <ListItemIcon><ReceiptIcon color="primary" /></ListItemIcon>
                        <ListItemText primary="購買発注承認" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton component={Link} href="/stock-list">
                        <ListItemIcon><InventoryIcon color="primary" /></ListItemIcon>
                        <ListItemText primary="在庫一覧" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
              </Drawer>

              {/* 各画面の中身がここに入り込む */}
              <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
                <Toolbar variant="dense" /> {/* ヘッダーの裏に隠れないための隙間 */}
                {children}
              </Box>
            </Box>
          </MuiThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}