import type { AppProps } from 'next/app';
import theme from '../src/config/theme';
import { ThemeProvider } from '@mui/styles';
import { Provider } from 'react-redux';
import store from '../src/redux/reducers';
import { useEffect } from 'react';
import { fbAppId } from '../src/config/auth';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: fbAppId,
        xfbml: true,
        status: true,
        version: 'v12.0',
      });
    };
    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      if (fjs.parentNode) {
        fjs.parentNode.insertBefore(js, fjs);
      }
    })(document, 'script', 'facebook-jssdk');
  }, []);
  return (
    <Provider {...{ store }}>
      <ThemeProvider {...{ theme }}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
