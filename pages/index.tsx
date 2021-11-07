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
import { checkUserData, newProducts } from '../src/components/constants';
import Auth from '../src/components/Auth';
import {
  featuredServiceData,
  selectedCatId,
} from '../src/components/Home/constants';
import { useDispatch, useSelector } from 'react-redux';
import { marketImgUrl } from '../src/config/urls';
import ProductsByCategory from '../src/components/Home/ProductsByCategory';
import NearestMarket from '../src/components/Home/NearestMarket';
import {
  getAddresses,
  useGetCampaigns,
  useGetMenu,
  useGetProducts,
  useGetPromotedProducts,
  useGetSupplier,
} from '../src/Requests/HomeRequests';
import axiosBase from 'axios';
import { setAuthUserDataR } from '../src/redux/actions/authRActions';
import { rootReducerI } from '../src/redux/reducers';
import { useGetProductsByCategory } from '../src/Requests/GlobalRequests';
import MyAddresses from '../src/components/MyAddresses';
import { setNearestMarketR } from '../src/redux/actions/appRActions';

export default function Home() {
  const selector = useSelector((state: rootReducerI) => state);
  const dispatch = useDispatch();
  const [nearestMarket, setNearestMarket] = useState<{ [key: string]: any }>(
    {},
  );
  const { campaigns } = useGetCampaigns(nearestMarket.ckode_mitra);
  const { supplier } = useGetSupplier(nearestMarket.ckode_mitra);
  const { menu } = useGetMenu();
  const { promotedProducts } = useGetPromotedProducts(
    nearestMarket.ckode_mitra,
  );
  const [selectedCat] = useState<{ id: number; name: string }>({
    id: selectedCatId,
    name: 'Bumbu dan Bahan Dapur',
  });
  const { productsByCategory } = useGetProductsByCategory({
    marketCode: nearestMarket.ckode_mitra,
    categoryId: selectedCat.id,
  });
  const [currentProductPage, setCurrentProductPage] = useState<number>(1);
  const {
    products,
    setProducts,
    lastProductPage,
    isProductLoading,
    setIsProductLoading,
  } = useGetProducts(nearestMarket.ckode_mitra);
  const [addresses, setAddresses] = useState<any>([]);

  const onShowMoreProductBtnClicked = () => {
    const nextProductPage = currentProductPage + 1;
    if (!isProductLoading && nextProductPage <= lastProductPage) {
      setIsProductLoading(true);
      axios()
        .post(`/market/product?page=${nextProductPage}`, {
          limit: 12,
          type: 'all',
          marketId: nearestMarket.ckode_mitra,
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
  const getNearestMarketByDeviceAddress = () => {
    locationRequestCount++;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude, accuracy } = coords;
        if (accuracy <= 50) {
          // axios()
          // .post('/market/nearest', { lat: latitude, lng: longitude })
          axiosBase
            .post('/api/nearestMarket', { lat: latitude, lng: longitude })
            .then(({ data: { result, response } }) => {
              if (response === 200) {
                dispatch(setNearestMarketR(result));
              }
            });
        } else {
          if (locationRequestCount <= 6) {
            getNearestMarketByDeviceAddress();
          }
        }
      },
      e => {
        console.log(e);
        if (locationRequestCount <= 6) {
          getNearestMarketByDeviceAddress();
        }
      },
      { enableHighAccuracy: true, timeout: 3000 },
    );
  };

  const getNearestMarket = ({ lat, lng }: { lat: number; lng: number }) => {
    axiosBase
      .post('/api/nearestMarket', { lat, lng })
      .then(({ data: { result, response } }) => {
        if (response === 200) {
          dispatch(setNearestMarketR(result));
        }
      });
  };

  useEffect(() => {
    setNearestMarket(selector.appState.nearestMarket);
  }, [selector.appState.nearestMarket]);

  useEffect(() => {
    if (Object.keys(selector.appState.selectedAddress).length !== 0) {
      const { dlat: lat, dlng: lng } = selector.appState.selectedAddress;
      getNearestMarket({ lat, lng });
    } else {
      getNearestMarketByDeviceAddress();
    }
  }, [selector.appState.selectedAddress]);

  useEffect(() => {
    if (!selector.authState.userData.id) {
      setAddresses([]);
    } else {
      getAddresses({
        token: selector.authState.userData.token,
        userCode: selector.authState.userData.ckode_user,
      })
        .then(addresses => setAddresses(addresses))
        .catch(e => console.log(e.response));
    }
  }, [selector.authState.userData.id]);

  useEffect(() => {
    checkUserData()
      .then(userData => {
        if (userData) {
          dispatch(setAuthUserDataR(userData));
          getAddresses({
            token: userData.token,
            userCode: userData.ckode_user,
          })
            .then(addresses => setAddresses(addresses))
            .catch(e => console.log(e.response));
        }
      })
      .catch(e => console.log(e.response));
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
      <MyAddresses data={addresses} />
    </Fragment>
  );
}
