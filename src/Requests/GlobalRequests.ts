import { useEffect, useState } from 'react';
import axios from '../config/axios';
import { newMarkets, newProducts, newSuppliers } from '../components/constants';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { rootReducerI } from '../redux/reducers';
import { SupplierPropsTypes } from '../components/Items/Supplier';
import { MarketPropsTypes } from '../components/Items/Market';

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
        productType === 'category' && categoryId
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
            setSuppliers(newSuppliers(rSuppliers));
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

export const useGetMarkets = () => {
  const { appState } = useSelector((state: rootReducerI) => state);
  const [markets, setMarkets] = useState<any[]>([]);
  const [isMarketsLoading, setIsMarketsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsMarketsLoading(true);
    if (Object.keys(appState.selectedAddress).length > 0) {
      const { dlat: lat, dlng: lng } = appState.selectedAddress;
      // axiosBase.post('http://localhost/kbiapi/public/v1/market/get', { lat, lng })
      axios()
        .post('/market/get', { lat, lng })
        .then(({ data }) => {
          if (
            data.response === 200 &&
            data &&
            !data.error &&
            data.result.length
          ) {
            setMarkets(newMarkets(data.result));
          } else {
            setMarkets([]);
          }
        })
        .catch(() => {
          setMarkets([]);
        })
        .finally(() => {
          setIsMarketsLoading(false);
        });
    } else {
      let locationRequestCount = 0;
      const getMarketsByDeviceAddress = () => {
        locationRequestCount++;
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude: lat, longitude: lng, accuracy } = coords;
          if (accuracy <= 50) {
            // axiosBase.post('http://localhost/kbiapi/public/v1/market/get', { lat, lng })
            axios()
              .post('/market/get', { lat, lng })
              .then(({ data }) => {
                if (
                  data.response === 200 &&
                  data &&
                  !data.error &&
                  data.result.length
                ) {
                  setMarkets(newMarkets(data.result));
                } else {
                  setMarkets([]);
                }
              })
              .catch(() => {
                if (locationRequestCount <= 6) {
                  getMarketsByDeviceAddress();
                } else {
                  setMarkets([]);
                }
              })
              .finally(() => {
                setIsMarketsLoading(false);
              });
          } else {
            if (locationRequestCount <= 6) {
              getMarketsByDeviceAddress();
            } else {
              setMarkets([]);
              setIsMarketsLoading(false);
            }
          }
        });
      };
      getMarketsByDeviceAddress();
    }
  }, [appState.selectedAddress]);
  return {
    markets,
    setMarkets,
    isMarketsLoading,
    setIsMarketsLoading,
  };
};

export const useGetSpecificSupplier = (supplierId?: number) => {
  const initialSupplier: SupplierPropsTypes = {
    block: '',
    imageUri: '',
    location: '',
    marketName: '',
    name: '',
    supplierId: 0,
    categories: [],
  };

  const initialMarket: MarketPropsTypes = {
    marketId: undefined,
    address: '',
    description: '',
    distance: { text: '', value: 0 },
    location: '',
    marketCode: '',
    marketImg: '',
    marketName: '',
  };

  const [supplier, setSupplier] = useState(initialSupplier);
  const [market, setMarket] = useState(initialMarket);
  useEffect(() => {
    if (supplierId) {
      axios()
        .get(`/market/supplier/${supplierId}`)
        .then(({ data }) => {
          if (data.response === 200) {
            setSupplier(newSuppliers([data.result])[0]);
            setMarket(newMarkets([data.result.mitra])[0]);
          }
        })
        .catch(() => {
          setSupplier(initialSupplier);
          setMarket(initialMarket);
        });
    }
  }, [supplierId]);
  return { supplier, setSupplier, market, setMarket };
};
