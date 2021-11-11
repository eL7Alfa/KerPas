import { useEffect, useState } from 'react';
import axios from '../config/axios';
import { newMarkets, newProducts } from '../components/constants';
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
  const [lastProductsPage, setLastProductsPage] = useState<number>(0);
  const [isProductsLoading, setIsProductsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsProductsLoading(true);
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
            setLastProductsPage(data.result.last_page);
          } else {
            setProducts([]);
            setLastProductsPage(0);
          }
        })
        .catch(() => {
          setProducts([]);
          setLastProductsPage(0);
        })
        .finally(() => {
          setIsProductsLoading(false);
        });
    } else {
      setProducts([]);
      setLastProductsPage(0);
      setIsProductsLoading(false);
    }
  }, [marketCode, categoryId]);
  return {
    products,
    setProducts,
    lastProductsPage,
    setLastProductsPage,
    isProductsLoading,
    setIsProductsLoading,
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

export type useGetMarketsTypes = {
  lat: number;
  lng: number;
};

export const useGetMarkets = ({ lat, lng }: useGetMarketsTypes) => {
  const [markets, setMarkets] = useState<any[]>([]);
  // const [lastMarketsPage, setLastMarketsPage] = useState<number>(0);
  const [isMarketsLoading, setIsMarketsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsMarketsLoading(true);
    axios()
      .post('/market/get', { lat, lng })
      // axiosBase
      //   .post('http://localhost/kbiapi/public/v1/market/get', { lat, lng })
      .then(({ data }) => {
        if (
          data.response === 200 &&
          data &&
          !data.error &&
          data.result.length
        ) {
          setMarkets(newMarkets(data.result));
          // setLastMarketsPage(data.result.last_page);
        } else {
          setMarkets([]);
          // setLastMarketsPage(0);
        }
      })
      .catch(() => {
        setMarkets([]);
        // setLastMarketsPage(0);
      })
      .finally(() => {
        setIsMarketsLoading(false);
      });
  }, [lat, lng]);
  return {
    markets,
    setMarkets,
    isMarketsLoading,
    setIsMarketsLoading,
    // lastMarketsPage,
    // setLastMarketsPage,
  };
};
