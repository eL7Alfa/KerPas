import { createTheme } from '@mui/material/styles';
import { green, yellow } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#37bd39',
    },
    secondary: {
      main: yellow[700],
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
