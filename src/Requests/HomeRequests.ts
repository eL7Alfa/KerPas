import { useEffect, useState } from 'react';
import axios from '../config/axios';
import { menuImgUrl, supplierImgUrl } from '../config/urls';
import { newProducts } from '../components/constants';
import { selectedCatId } from '../components/Home/constants';

export const useGetCampaigns = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  useEffect(() => {
    axios()
      .post('/market/ads/campaign', {
        category: 7,
      })
      .then(({ data }) => {
        if (data.response === 200 && data && !data.error) {
          setCampaigns(data.result);
        }
      });
  }, []);
  return { campaigns, setCampaigns };
};

export const useGetSupplier = () => {
  const [supplier, setSupplier] = useState<any[]>([]);
  useEffect(() => {
    axios()
      .get('/market/supplier')
      .then(({ data }) => {
        if (data.response === 200 && data && !data.error) {
          const supplier = data.result.map(
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
  }, []);
  return { supplier, setSupplier };
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

export const useGetProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [lastProductPage, setLastProductPage] = useState<number>(0);
  const [isProductLoading, setIsProductLoading] = useState<boolean>(true);
  useEffect(() => {
    axios()
      .post('/market/product', {
        limit: 12,
        type: 'all',
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
          setIsProductLoading(false);
        }
      });
  }, []);
  return {
    products,
    setProducts,
    lastProductPage,
    setLastProductPage,
    isProductLoading,
    setIsProductLoading,
  };
};

export const useGetPromotedProducts = () => {
  const [promotedProducts, setPromotedProducts] = useState<any[]>([]);
  useEffect(() => {
    axios()
      .post('/market/product', {
        limit: 12,
        type: 'promo',
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
  }, []);
  return { promotedProducts, setPromotedProducts };
};

export const useGetProductsByCategory = () => {
  const [productsByCategory, setProductsByCategory] = useState<any[]>([]);
  useEffect(() => {
    axios()
      .post('/market/product', {
        limit: 12,
        type: 'category',
        subcategory: selectedCatId,
      })
      .then(({ data }) => {
        if (
          data.response === 200 &&
          data &&
          !data.error &&
          data.result.data.length
        ) {
          setProductsByCategory(newProducts(data.result.data));
        }
      })
      .catch(() => {});
  }, []);
  return { productsByCategory, setProductsByCategory };
};
