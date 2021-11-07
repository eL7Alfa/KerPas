import { useEffect, useState } from 'react';
import axios from '../config/axios';
import { menuImgUrl, supplierImgUrl } from '../config/urls';
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

export const useGetCampaigns = (marketCode: string) => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  useEffect(() => {
    if (marketCode) {
      axios()
        .post('/market/ads/campaign', {
          category: 7,
          marketId: marketCode,
        })
        .then(({ data }) => {
          if (data.response === 200 && data && !data.error) {
            setCampaigns(data.result);
          }
        });
    } else {
      setCampaigns([]);
    }
  }, [marketCode]);
  return { campaigns, setCampaigns };
};

export const useGetSupplier = (marketCode: string) => {
  const [supplier, setSupplier] = useState<any[]>([]);
  useEffect(() => {
    if (marketCode) {
      axios()
        .post('/market/supplier', {
          limit: 12,
          marketId: marketCode,
        })
        .then(({ data }) => {
          if (data.response === 200 && data && !data.error) {
            const { data: rSupplier } = data.result;
            const supplier = rSupplier.map(
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
            setSupplier(supplier);
          }
        });
    } else {
      setSupplier([]);
    }
  }, [marketCode]);
  return { supplier, setSupplier, marketCode };
};

export const useGetMenu = () => {
  const [menu, setMenu] = useState<any[]>([]);
  useEffect(() => {
    axios()
      .get('/market/menu')
      .then(({ data }) => {
        if (data.response === 200 && data && !data.error) {
          const newMenu = data.result.map((d: { ckelas: any; cicon: any }) => {
            return {
              name: d.ckelas,
              imageUri: `${menuImgUrl}/${d.cicon}`,
              url: '',
            };
          });
          setMenu(newMenu);
        }
      });
  }, []);
  return { menu, setMenu };
};

export const useGetProducts = (marketCode: string) => {
  const [products, setProducts] = useState<any[]>([]);
  const [lastProductPage, setLastProductPage] = useState<number>(0);
  const [isProductLoading, setIsProductLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsProductLoading(true);
    if (marketCode) {
      axios()
        .post('/market/product', {
          limit: 12,
          type: 'all',
          marketId: marketCode,
        })
        .then(({ data }) => {
          if (
            data.response === 200 &&
            data &&
            !data.error &&
            data.result.data.length
          ) {
            setProducts(newProducts(data.result.data));
            setLastProductPage(data.result.last_page);
          }
        })
        .finally(() => setIsProductLoading(false));
    } else {
      setProducts([]);
      setLastProductPage(0);
      setIsProductLoading(false);
    }
  }, [marketCode]);
  return {
    products,
    setProducts,
    lastProductPage,
    setLastProductPage,
    isProductLoading,
    setIsProductLoading,
  };
};

export const useGetPromotedProducts = (marketCode: string) => {
  const [promotedProducts, setPromotedProducts] = useState<any[]>([]);
  useEffect(() => {
    if (marketCode) {
      axios()
        .post('/market/product', {
          limit: 12,
          type: 'promo',
          marketId: marketCode,
        })
        .then(({ data }) => {
          if (
            data.response === 200 &&
            data &&
            !data.error &&
            data.result.data.length
          ) {
            setPromotedProducts(newProducts(data.result.data));
          }
        })
        .catch(() => {});
    } else {
      setPromotedProducts([]);
    }
  }, [marketCode]);
  return { promotedProducts, setPromotedProducts };
};
