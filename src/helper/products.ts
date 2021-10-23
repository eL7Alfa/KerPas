import { productImgUrl } from '../config/urls';

export const newProducts = (
  data: {
    cnama_produk: string;
    cimg_top: string;
    nretail_price: number;
    discount: number;
    min_price: number;
  }[],
) =>
  data.map(
    ({
      cnama_produk = '',
      cimg_top = '',
      nretail_price = 0,
      discount = 0,
      min_price = 0,
    }) => {
      return {
        name: cnama_produk,
        imageUri: `${productImgUrl}/${cimg_top}`,
        price: nretail_price,
        discount: discount,
        fixedPrice: min_price,
        maxRequest: 'Maksimal Pesanan 1 product',
      };
    },
  );
