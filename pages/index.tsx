import Head from 'next/head';
import AppHeader from '../src/components/Items/AppHeader';
import { Box, Container, CssBaseline, Divider } from '@mui/material';
import Campaign from '../src/components/Home/Campaign';
import axios from '../src/config/axios';
import { Fragment, useCallback, useEffect, useState } from 'react';
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
  useGetProductsByCategory,
  useGetPromotedProducts,
  useGetSupplier,
} from '../src/Requests/HomeRequests';
import axiosBase from 'axios';
import { setAuthUserDataR } from '../src/redux/actions/authRActions';
import { setSelectedAddressR } from '../src/redux/actions/appRActions';
import { rootReducerI } from '../src/redux/reducers';

export default function Home() {
  const selector = useSelector((state: rootReducerI) => state);
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
  const [addresses, setAddresses] = useState<any>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>({});

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
  const getNearestMarketByDeviceAddress = () => {
    locationRequestCount++;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude, accuracy } = coords;
        if (accuracy <= 50) {
          axiosBase
            .post('/api/nearestMarket', { lat: latitude, lng: longitude })
            .then(({ data: { result, response } }) => {
              if (response === 200) {
                setNearestMarket(result);
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
          setNearestMarket(result);
        }
      });
  };

  const getSelectedAddress = useCallback(() => {
    const _selectedAddress = localStorage.getItem('selectedAddress');
    if (_selectedAddress) {
      const selectedAddress = JSON.parse(_selectedAddress);
      dispatch(setSelectedAddressR(selectedAddress));
    }
  }, [addresses]);

  useEffect(() => {
    if (Object.keys(selectedAddress).length !== 0) {
      const { dlat: lat, dlng: lng } = selectedAddress;
      getNearestMarket({ lat, lng });
    } else {
      getNearestMarketByDeviceAddress();
    }
  }, [selector.appState.selectedAddress]);

  useEffect(() => {
    checkUserData()
      .then(userData => {
        if (userData) {
          getSelectedAddress();
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
    </Fragment>
  );
}
