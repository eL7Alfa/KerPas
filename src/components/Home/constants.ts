import { AutoFixHigh } from '@mui/icons-material';
import axios from '../../config/axios';

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

export const checkUserData = async () => {
  const _userData = localStorage.getItem('userData');
  if (_userData) {
    const userData = JSON.parse(_userData);
    return await axios(userData.token)
      .post('/user/retrieve', { ckode_user: userData.ckode_user })
      .then(({ data: { response } }) => {
        if (response === 200) {
          return userData;
        }
      })
      .catch(() => null);
  }
  return null;
};
