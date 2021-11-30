import { useEffect, useState } from 'react';
import axios from '../config/axios';
import {
  CartProductTypes,
  newCartProducts,
  newMarkets,
  newProducts,
  newSuppliers,
  ProductTypes,
  SupplierTypes,
} from '../components/constants';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { rootReducerI } from '../redux/reducers';
import { SupplierPropsTypes } from '../components/Items/Supplier';
import { MarketPropsTypes } from '../components/Items/Market';
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

export type useGetProductParamTypes = {
  slug: string;
};

export const initialProduct: ProductTypes = {
  productId: undefined,
  discount: 0,
  fixedPrice: 0,
  imageUri: '',
  imagesUri: [],
  name: '',
  price: 0,
  slug: '',
  market: {},
  sku: '',
  category: '',
  class: '',
  weight: 0,
  description: '',
  unit: '',
  brand: '',
  classCode: '',
};

export const useGetProduct = ({ slug }: useGetProductParamTypes) => {
  const [product, setProduct] = useState(initialProduct);
  const [isGetProductLoading, setIsGetProductLoading] = useState(false);

  useEffect(() => {
    if (slug) {
      axios()
        .get(`/product/${slug}`)
        .then(({ data: { response, result } }) => {
          if (response === 200 && result.length) {
            setProduct(newProducts(result)[0]);
          }
        })
        .catch(() => setProduct(initialProduct))
        .finally(() => setIsGetProductLoading(false));
    } else {
      setProduct(initialProduct);
      setIsGetProductLoading(false);
    }
  }, [slug]);

  return { product, setProduct, isGetProductLoading, setIsGetProductLoading };
};

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
  const [products, setProducts] = useState<ProductTypes[]>([]);
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

export type useGetSearchedProductsTypes = {
  searchText: string;
  marketCode: string;
};

export const useGetSearchedProducts = ({
  searchText,
  marketCode,
}: useGetSearchedProductsTypes) => {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [lastProductsPage, setLastProductsPage] = useState<number>(0);
  const [isProductsLoading, setIsProductsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsProductsLoading(true);
    if (searchText && marketCode) {
      axios()
        .get(`/market/product/search/${searchText}`)
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
  }, [searchText, marketCode]);
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
  category?: string;
};

export const useGetSuppliers = ({
  marketCode,
  limit,
  category,
}: useGetSuppliersTypes) => {
  const [suppliers, setSuppliers] = useState<SupplierTypes[]>([]);
  const [lastSuppliersPage, setLastSuppliersPage] = useState<number>(0);
  const [isSuppliersLoading, setIsSuppliersLoading] = useState<boolean>(true);
  useEffect(() => {
    if (marketCode) {
      let data: { limit?: number; marketId: string; subcategory?: string } = {
        limit: limit ?? 12,
        marketId: marketCode,
      };
      let path = '/market/supplier';
      if (category) {
        path = '/market/supplier/class';
        data = {
          ...data,
          subcategory: category,
        };
      }
      axios()
        .post(path, data)
        .then(({ data }) => {
          if (data.response === 200 && data && !data.error) {
            if (category) {
              const { result: rSuppliers } = data;
              setSuppliers(
                rSuppliers.map(
                  (rS: {
                    id: any;
                    ckode_supplier: any;
                    cimg_supplier: any;
                    calamat_supplier: any;
                    ckontak_supplier: any;
                    cnama_supplier: any;
                    ccategory_supplier: any;
                  }) => {
                    return {
                      supplierId: rS.id,
                      supplierCode: rS.ckode_supplier,
                      imageUri: `${supplierImgUrl}/${rS.cimg_supplier}`,
                      address: rS.calamat_supplier,
                      contact: rS.ckontak_supplier,
                      name: rS.cnama_supplier,
                      marketName: '',
                      block: '',
                      location: '',
                      categories: rS.ccategory_supplier,
                    };
                  },
                ),
              );
            } else {
              const { data: rSuppliers } = data.result;
              setSuppliers(newSuppliers(rSuppliers));
            }
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
  }, [marketCode, category]);
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
    supplierCode: '',
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

export const useGetCartProducts = () => {
  const { appState, authState } = useSelector((state: rootReducerI) => state);
  const [cartProducts, setCartProducts] = useState<CartProductTypes[]>([]);
  const [isCartProductLoading, setIsCartProductLoading] =
    useState<boolean>(true);
  useEffect(() => {
    setIsCartProductLoading(true);
    if (authState.userData.token) {
      axios(authState.userData.token)
        .post('/market/cart/get', {
          kode_user: authState.userData.ckode_user,
        })
        .then(({ data }) => {
          if (data.response === 200) {
            setCartProducts(newCartProducts(data.result));
          } else {
            setCartProducts([]);
          }
        })
        .catch(() => {
          setCartProducts([]);
        })
        .finally(() => setIsCartProductLoading(false));
    } else {
      setCartProducts([]);
      setIsCartProductLoading(false);
    }
  }, [appState.cartUpdateId, authState.userData.token]);

  return {
    cartProducts,
    setCartProducts,
    isCartProductLoading,
    setIsCartProductLoading,
  };
};
