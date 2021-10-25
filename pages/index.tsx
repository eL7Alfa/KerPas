import Head from 'next/head';
import AppHeader from '../src/components/Items/AppHeader';
import { Box, Container, CssBaseline, Divider } from '@mui/material';
import Campaign from '../src/components/Home/Campaign';
import axios from '../src/config/axios';
import { Fragment, useEffect, useState } from 'react';
import FeaturedServices from '../src/components/Home/FeaturedServices';
import Categories from '../src/components/Home/Categories';
import Stores from '../src/components/Home/Stores';
import Promo from '../src/components/Home/Promo';
import Products from '../src/components/Home/Products';
import {
  checkUserData,
  getDistanceMatrix,
  newProducts,
} from '../src/components/constants';
import Auth from '../src/components/Auth';
import {
  featuredServiceData,
  selectedCatId,
} from '../src/components/Home/constants';
import { useDispatch } from 'react-redux';
import { setAuthUserDataR } from '../src/redux/actions';
import { marketImgUrl, menuImgUrl, supplierImgUrl } from '../src/config/urls';
import ProductsByCategory from '../src/components/Home/ProductsByCategory';
import NearestMarket from '../src/components/Home/NearestMarket';

type HomeProps = {
  getCampaigns: {
    error: boolean;
    result: any[];
    response: number;
  };
  getSupplier: {
    error: boolean;
    result: any[];
    response: number;
  };
  getProducts: {
    error: boolean;
    result: { [key: string]: any };
    response: number;
  };
  getPromotedProducts: {
    error: boolean;
    result: { [key: string]: any };
    response: number;
  };
  getProductsByCategory: {
    error: boolean;
    result: { [key: string]: any };
    response: number;
  };
  getMenu: {
    error: boolean;
    result: { [key: string]: any };
    response: number;
  };
};

export default function Home({
  getCampaigns,
  getSupplier,
  getProducts,
  getPromotedProducts,
  getProductsByCategory,
  getMenu,
}: HomeProps) {
  const dispatch = useDispatch();
  const [supplier, setSupplier] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [promotedProducts, setPromotedProducts] = useState<any[]>([]);
  const [selectedCat, setSelectedCat] = useState<{ id: number; name: string }>({
    id: selectedCatId,
    name: 'Bumbu dan Bahan Dapur',
  });
  const [productsByCategory, setProductsByCategory] = useState<any[]>([]);
  const [menu, setMenu] = useState<any[]>([]);
  const [isProductLoading, setIsProductLoading] = useState<boolean>(true);
  const [currentProductPage, setCurrentProductPage] = useState<number>(1);
  const [lastProductPage, setLastProductPage] = useState<number>(0);
  const [nearestMarket, setNearestMarket] = useState<{ [key: string]: any }>(
    {},
  );

  const onShowMoreProductBtnClicked = () => {
    const nextProductPage = currentProductPage + 1;
    if (!isProductLoading && nextProductPage <= lastProductPage) {
      setIsProductLoading(true);
      axios()
        .post(`/market/product?page=${nextProductPage}`, {
          limit: 12,
          type: 'all',
        })
        .then(({ data }) => {
          setProducts(prevProducts => [
            ...prevProducts,
            ...newProducts(data.result.data),
          ]);
          setCurrentProductPage(nextProductPage);
        })
        .finally(() => setIsProductLoading(false));
    }
  };

  const getMarket = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude, accuracy } = coords;
        if (accuracy <= 50) {
          axios()
            .get('/market/get')
            .then(({ data }) => {
              const destinations = data.result.map(
                (d: { dlat: string; dlng: string }) => {
                  return {
                    lat: Number(d.dlat),
                    lng: Number(d.dlng),
                  };
                },
              );
              const origins = [{ lat: latitude, lng: longitude }];
              getDistanceMatrix({ destinations, origins }).then(r => {
                const { elements } = r[0];
                const newData = data.result
                  .map((d: any, key: number) => {
                    return {
                      ...d,
                      distance: elements[key].distance,
                    };
                  })
                  // .filter((d: { distance: { value: number } }) => {
                  //   return d.distance.value < 3000;
                  // })
                  .sort(
                    (
                      a: { distance: { value: number } },
                      b: { distance: { value: number } },
                    ) => {
                      return a.distance.value - b.distance.value;
                    },
                  );
                if (newData.length > 0) {
                  setNearestMarket(newData[0]);
                }
              });
            });
        }
      },
      e => console.log(e),
      { enableHighAccuracy: true, timeout: 5000 },
    );
  };

  useEffect(() => {
    getMarket();
    checkUserData().then(res => {
      if (res) {
        dispatch(setAuthUserDataR(res));
      }
    });
  }, []);

  useEffect(() => {
    if (getSupplier.response === 200 && getSupplier && !getSupplier.error) {
      const supplier = getSupplier.result.map(m => {
        return {
          name: m.cnama_supplier,
          imageUri: `${supplierImgUrl}/${m.cimg_supplier}`,
          marketName: m.calamat_supplier,
          block: 'A1 - B2',
          location: 'Makassar',
        };
      });
      setSupplier(supplier);
    }
  }, [getSupplier]);

  useEffect(() => {
    if (getMenu.response === 200 && getMenu && !getMenu.error) {
      const newMenu = getMenu.result.map((gM: { ckelas: any; cicon: any }) => {
        return {
          name: gM.ckelas,
          imageUri: `${menuImgUrl}/${gM.cicon}`,
          url: '',
        };
      });
      setMenu(newMenu);
    }
  }, [getMenu]);

  useEffect(() => {
    if (
      getProducts.response === 200 &&
      getProducts &&
      !getProducts.error &&
      getProducts.result.data.length
    ) {
      setProducts(newProducts(getProducts.result.data));
      setLastProductPage(getProducts.result.last_page);
      setIsProductLoading(false);
    }
  }, [getProducts]);

  useEffect(() => {
    if (
      getPromotedProducts.response === 200 &&
      getPromotedProducts &&
      !getPromotedProducts.error &&
      getPromotedProducts.result.data.length
    ) {
      setPromotedProducts(newProducts(getPromotedProducts.result.data));
    }
  }, [getPromotedProducts]);

  useEffect(() => {
    if (
      getProductsByCategory.response === 200 &&
      getProductsByCategory &&
      !getProductsByCategory.error &&
      getProductsByCategory.result.data.length
    ) {
      setProductsByCategory(newProducts(getProductsByCategory.result.data));
    }
  }, [getProductsByCategory]);

  return (
    <Fragment>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <title>KerPas</title>
      </Head>
      <CssBaseline />
      <AppHeader />
      <Container maxWidth={'lg'} sx={{ px: '0!important', overflow: 'hidden' }}>
        <Box py={1} mt={12} mb={8}>
          <Campaign data={getCampaigns.result} />
          <FeaturedServices data={featuredServiceData} />
          <Categories data={menu} />
          <Divider />
          <NearestMarket
            marketId={nearestMarket.id}
            marketCode={nearestMarket.ckode_mitra}
            marketName={nearestMarket.cnama_mitra}
            address={nearestMarket.calamat_toko}
            distance={nearestMarket.distance}
            location={nearestMarket.ckota}
            marketImg={`${marketImgUrl}/${nearestMarket.cfoto}`}
          />
          <Divider />
          <Promo data={promotedProducts} />
          <Divider />
          <ProductsByCategory
            category={selectedCat}
            data={productsByCategory}
          />
          <Divider />
          <Stores data={supplier} />
          <Divider />
          <Products
            data={products}
            onShowMoreBtnClicked={onShowMoreProductBtnClicked}
            isLoading={isProductLoading}
            isLastProductReached={currentProductPage + 1 > lastProductPage}
          />
        </Box>
      </Container>
      <Auth />
    </Fragment>
  );
}

export const getStaticProps = async () => {
  let props = {};
  try {
    const { data: getCampaigns } = await axios().post('/market/ads/campaign', {
      category: 7,
    });
    props = {
      ...props,
      getCampaigns,
    };
  } catch (e) {
    props = {
      ...props,
      getCampaigns: {
        error: true,
        result: [],
      },
    };
  }
  try {
    const { data: getSupplier } = await axios().get('/market/supplier');
    props = {
      ...props,
      getSupplier,
    };
  } catch (e) {
    props = {
      ...props,
      getSupplier: {
        error: true,
        result: [],
      },
    };
  }
  try {
    const { data: getProducts } = await axios().post('/market/product', {
      limit: 12,
      type: 'all',
    });
    props = {
      ...props,
      getProducts,
    };
  } catch (e) {
    props = {
      ...props,
      getProducts: {
        error: true,
        result: {
          data: [],
        },
      },
    };
  }
  try {
    const { data: getPromotedProducts } = await axios().post(
      '/market/product',
      {
        limit: 12,
        type: 'promo',
      },
    );
    props = {
      ...props,
      getPromotedProducts,
    };
  } catch (e) {
    props = {
      ...props,
      getPromotedProducts: {
        error: true,
        result: {
          data: [],
        },
      },
    };
  }
  try {
    const { data: getMenu } = await axios().get('/market/menu');
    props = {
      ...props,
      getMenu,
    };
  } catch (e) {
    props = {
      ...props,
      getMenu: {
        error: true,
        result: {
          data: [],
        },
      },
    };
  }
  try {
    const { data: getProductsByCategory } = await axios().post(
      '/market/product',
      {
        limit: 12,
        type: 'category',
        subcategory: selectedCatId,
      },
    );
    props = {
      ...props,
      getProductsByCategory,
    };
  } catch (e) {
    props = {
      ...props,
      getProductsByCategory: {
        error: true,
        result: {
          data: [],
        },
      },
    };
  }

  return {
    props,
  };
};
