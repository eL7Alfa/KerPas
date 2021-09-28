import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'rgba(210,1,39,1)',
    },
    secondary: {
      main: 'rgba(254,204,43,1)',
    },
    background: {
      default: '#fcfcfc',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: '#ccc',
      },
    },
  },
});

export type themeType = typeof theme;

export default theme;
