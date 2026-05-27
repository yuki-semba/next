import { createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      main: '#0a6ed1', // SAP Fioriの標準的なブルー
    },
    secondary: {
      main: '#556a7b', // シックなグレー
    },
    background: {
      default: '#f4f6f7', // Fiori風の薄い背景色
    },
  },
  typography: {
    fontFamily: '"72", "72-Web", Arial, sans-serif', // SAPの標準フォント指定
  },
});
export default theme;