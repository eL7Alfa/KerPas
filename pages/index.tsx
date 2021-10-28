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
import { marketImgUrl } from '../src/config/urls';
import ProductsByCategory from '../src/components/Home/ProductsByCategory';
import NearestMarket from '../src/components/Home/NearestMarket';
import {
  getAddress,
  useGetCampaigns,
  useGetMenu,
  useGetProducts,
  useGetProductsByCategory,
  useGetPromotedProducts,
  useGetSupplier,
} from '../src/Requests/HomeRequests';

export default function Home() {
  const dispatch = useDispatch();
  const { campaigns } = useGetCampaigns();
  const { supplier } = useGetSupplier();
  const { menu } = useGetMenu();
  const { promotedProducts } = useGetPromotedProducts();
  const [selectedCat] = useState<{ id: number; name: string }>({
    id: selectedCatId,
    name: 'Bumbu dan Bahan Dapur',
  });
  const { productsByCategory } = useGetProductsByCategory();
  const [currentProductPage, setCurrentProductPage] = useState<number>(1);
  const {
    products,
    setProducts,
    lastProductPage,
    isProductLoading,
    setIsProductLoading,
  } = useGetProducts();
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

  let locationRequestCount = 0;

  const getMarket = () => {
    locationRequestCount++;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude, accuracy } = coords;
        if (accuracy <= 50) {
          axios()
            .get('/market/get')
            .then(({ data }) => {
              if (data.response === 200) {
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
                  locationRequestCount = 0;
                  const { elements } = r[0];
                  const newData = data.result
                    .map((d: any, key: number) => {
                      return {
                        ...d,
                        distance: elements[key].distance,
                      };
                    })
                    // .filter((d: { distance: { value: number } }) => {
                    //   return d.distance.value <= 3000;
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
                    console.log(newData);
                    setNearestMarket(newData[0]);
                  }
                });
              }
            });
        } else {
          if (locationRequestCount <= 6) {
            getMarket();
          }
        }
      },
      e => {
        console.log(e);
        if (locationRequestCount <= 6) {
          getMarket();
        }
      },
      { enableHighAccuracy: true, timeout: 3000 },
    );
  };

  useEffect(() => {
    getMarket();
    checkUserData().then(res => {
      if (res) {
        dispatch(setAuthUserDataR(res));
        const userData = { token: res.token, userCode: res.ckode_user };
        getAddress(userData).then(res => console.log(res));
      }
    });
  }, []);

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
        <Box py={1} mt={10} mb={8}>
          <Campaign data={campaigns} />
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
          <Stores data={supplier} />
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
