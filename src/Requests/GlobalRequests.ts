import { useEffect, useState } from 'react';
import axios from '../config/axios';
import { newProducts } from '../components/constants';
import { AxiosError } from 'axios';
import { supplierImgUrl } from '../config/urls';

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

export type useGetSuppliersTypes = {
  marketCode: string;
  limit?: number;
};

export const useGetSuppliers = ({
  marketCode,
  limit,
}: useGetSuppliersTypes) => {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [lastSuppliersPage, setLastSuppliersPage] = useState<number>(0);
  const [isSuppliersLoading, setIsSuppliersLoading] = useState<boolean>(true);
  useEffect(() => {
    if (marketCode) {
      axios()
        .post('/market/supplier', {
          limit: limit ?? 12,
          marketId: marketCode,
        })
        .then(({ data }) => {
          if (data.response === 200 && data && !data.error) {
            const { data: rSuppliers } = data.result;
            const suppliers = rSuppliers.map(
              (d: {
                cnama_supplier: any;
                cimg_supplier: any;
                calamat_supplier: any;
              }) => {
                return {
                  name: d.cnama_supplier,
                  imageUri: `${supplierImgUrl}/${d.cimg_supplier}`,
                  marketName: d.calamat_supplier,
                  block: 'A1 - B2',
                  location: 'Makassar',
                };
              },
            );
            setSuppliers(suppliers);
          } else {
            setLastSuppliersPage(0);
            setSuppliers([]);
          }
        })
        .catch(() => {
          setLastSuppliersPage(0);
          setSuppliers([]);
        })
        .finally(() => {
          setIsSuppliersLoading(false);
        });
    } else {
      setSuppliers([]);
      setLastSuppliersPage(0);
      setIsSuppliersLoading(false);
    }
  }, [marketCode]);
  return {
    suppliers,
    setSuppliers,
    lastSuppliersPage,
    isSuppliersLoading,
    setIsSuppliersLoading,
    setLastSuppliersPage,
  };
};
