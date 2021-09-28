// import '../styles/globals.css'
import type { AppProps } from 'next/app';
import theme from '../src/config/theme';
import { ThemeProvider } from '@mui/styles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider {...{ theme }}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp;
