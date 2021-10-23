import axiosBase from 'axios';

export const baseURL = 'https://keranjangbelanja.co.id/api/v1';

const axios = (token: string | null = null) => {
  if (token) {
    return axiosBase.create({
      baseURL,
      headers: {
        Authorization: `kbi ${token}`,
      },
    });
  }
  return axiosBase.create({
    baseURL,
  });
};

export default axios;
