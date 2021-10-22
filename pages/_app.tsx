import type { AppProps } from 'next/app';
import theme from '../src/config/theme';
import { ThemeProvider } from '@mui/styles';
import { Provider } from 'react-redux';
import store from '../src/redux/reducers';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider {...{ store }}>
      <ThemeProvider {...{ theme }}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
