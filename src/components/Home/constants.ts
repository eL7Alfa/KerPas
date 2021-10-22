import { AutoFixHigh } from '@mui/icons-material';
import { fbAppId } from '../../config/auth';

export const featuredServiceData = [
  {
    icon: AutoFixHigh,
    title: 'Segar & Higenis',
    subtitle: 'Produk pilihan',
    iconBgColor:
      'linear-gradient(47deg, rgba(255,164,26,1) 0%, rgba(255,203,107,1) 100%)',
  },
  {
    icon: AutoFixHigh,
    title: 'Timbangan Pasti Pas',
    subtitle: 'Sesuai ukuran / berat',
    iconBgColor:
      'linear-gradient(47deg, rgba(255,26,26,1) 0%, rgba(255,99,99,1) 100%)',
  },
  {
    icon: AutoFixHigh,
    title: 'Diantar 2 Kali Sehari',
    subtitle: 'Jam 9 pagi dan jam 3 sore',
    iconBgColor:
      'linear-gradient(47deg, rgba(26,42,255,1) 0%, rgba(89,101,255,1) 100%)',
  },
  {
    icon: AutoFixHigh,
    title: 'Lengkap & Murah',
    subtitle: 'Paling Lengkap dan harga pasar tradisional',
    iconBgColor:
      'linear-gradient(47deg, rgba(49,184,51,1) 0%, rgba(126,244,129,1) 100%)',
  },
];

export const initFB = () => {
  window.fbAsyncInit = function () {
    FB.init({
      appId: fbAppId,
      xfbml: true,
      version: 'v12.0',
    });
  };

  (function (d, s, id) {
    let js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
};
