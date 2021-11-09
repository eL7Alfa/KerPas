import { useEffect, useState } from 'react';
import axios from '../config/axios';
import { newProducts } from '../components/constants';
import { AxiosError } from 'axios';

export const useGetProductsByCategory = ({
  marketCode,
  categoryId,
}: {
  marketCode: string;
  categoryId: number;
}) => {
  const [productsByCategory, setProductsByCategory] = useState<any[]>([]);
  useEffect(() => {
    if (marketCode) {
      axios()
        .post('/market/product', {
          limit: 12,
          type: 'category',
          subcategory: categoryId,
          marketId: marketCode,
        })
        .then(({ data }) => {
          if (
            data.response === 200 &&
            data &&
            !data.error &&
            data.result.data.length
          ) {
            setProductsByCategory(newProducts(data.result.data));
          } else {
            setProductsByCategory([]);
          }
        })
        .catch(() => {});
    } else {
      setProductsByCategory([]);
    }
  }, [marketCode]);
  return { productsByCategory, setProductsByCategory };
};

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
