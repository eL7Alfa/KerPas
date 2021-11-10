import { useEffect, useState } from 'react';
import axios from '../config/axios';
import { newProducts } from '../components/constants';
import { AxiosError } from 'axios';

type getAddressesPropsT = { token: string; userCode: string };

export const getAddresses = ({ token, userCode }: getAddressesPropsT) =>
  new Promise((resolve, reject) => {
    axios(token)
      .get(`/address/get/${userCode}`)
      .then(
        ({
          data: {
            result: { address },
            response,
          },
        }) => {
          if (response === 200) {
            resolve(address);
          }
        },
      )
      .catch(e => {
        reject(e as AxiosError);
      });
  });

export type useGetProductsTypes = {
  marketCode: string;
  productType?: string;
  limit?: number;
  categoryId?: number;
};

export const useGetProducts = ({
  marketCode,
  productType,
  limit,
  categoryId,
}: useGetProductsTypes) => {
  const [products, setProducts] = useState<any[]>([]);
  const [lastProductPage, setLastProductPage] = useState<number>(0);
  const [isProductLoading, setIsProductLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsProductLoading(true);
    if (marketCode) {
      const postData =
        productType === 'category'
          ? {
              limit: limit ?? 12,
              type: 'category',
              marketId: marketCode,
              subcategory: categoryId,
            }
          : {
              limit: limit ?? 12,
              type: productType ?? 'all',
              marketId: marketCode,
            };
      axios()
        .post('/market/product', postData)
        .then(({ data }) => {
          if (
            data.response === 200 &&
            data &&
            !data.error &&
            data.result.data.length
          ) {
            setProducts(newProducts(data.result.data));
            setLastProductPage(data.result.last_page);
          } else {
            setProducts([]);
            setLastProductPage(0);
          }
        })
        .catch(() => {
          setProducts([]);
          setLastProductPage(0);
        })
        .finally(() => {
          setIsProductLoading(false);
        });
    } else {
      setProducts([]);
      setLastProductPage(0);
      setIsProductLoading(false);
    }
  }, [marketCode, categoryId]);
  return {
    products,
    setProducts,
    lastProductPage,
    setLastProductPage,
    isProductLoading,
    setIsProductLoading,
  };
};
