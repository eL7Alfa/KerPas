import { createTheme } from '@mui/material/styles';
import { red, yellow } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: { main: string };
  }
  interface PaletteOptions {
    tertiary: { main: string };
  }
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#37bd39',
    },
    secondary: {
      main: red[600],
    },
    background: {
      default: '#fafafa',
    },
    tertiary: {
      main: yellow[700],
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
