import axiosBase from 'axios';

export const baseURL = 'https://keranjangbelanja.co.id/api/v1';

const axios = axiosBase.create({
  baseURL,
  headers: {
    Authorization: '',
  },
});

export default axios;
