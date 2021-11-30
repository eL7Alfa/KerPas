import React, { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, CssBaseline } from '@mui/material';
import AppHeader from '../../src/components/Items/AppHeader';
import NearestMarket from '../../src/components/Items/NearestMarket';
import { useGetProducts } from '../../src/Requests/GlobalRequests';
import axios from '../../src/config/axios';
import { newProducts, useInit } from '../../src/components/constants';
import { useSelector } from 'react-redux';
import { rootReducerI } from '../../src/redux/reducers';
import Products from '../../src/components/Items/Products';
import Auth from '../../src/components/Items/Auth';
import AddToCart from '../../src/components/Items/AddToCart';
import MarketDetails from '../../src/components/Items/MarketDetails';

const Index = () => {
  useInit();
  const selector = useSelector((state: rootReducerI) => state);
  const [nearestMarket, setNearestMarket] = useState<{ [key: string]: any }>(
    {},
  );
  const [currentProductsPage, setCurrentProductsPage] = useState<number>(1);
  const {
    products,
    setProducts,
    isProductsLoading,
    lastProductsPage,
    setIsProductsLoading,
  } = useGetProducts({
    marketCode: nearestMarket.ckode_mitra,
    productType: 'promo',
  });

  const onShowMoreBtnClicked = () => {
    const nextProductPage = currentProductsPage + 1;
    if (!isProductsLoading && nextProductPage <= lastProductsPage) {
      setIsProductsLoading(true);
      axios()
        .post(`/market/product?page=${nextProductPage}`, {
          limit: 12,
          type: 'promo',
          marketId: nearestMarket.ckode_mitra,
        })
        .then(({ data }) => {
          setProducts(prevProducts => [
            ...prevProducts,
            ...newProducts(data.result.data),
          ]);
          setCurrentProductsPage(nextProductPage);
        })
        .finally(() => setIsProductsLoading(false));
    }
  };

  useEffect(() => {
    setNearestMarket(selector.appState.nearestMarket);
  }, [selector.appState.nearestMarket]);

  return (
    <Fragment>
      <Head>
        <meta name={'description'} content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <title>KerPas - Kios Pangan Kerpas</title>
      </Head>
      <CssBaseline />
      <AppHeader />
      <Container maxWidth={'lg'} sx={{ px: '0!important', overflow: 'hidden' }}>
        <Box py={1} mt={9} mb={8}>
          <NearestMarket />
          <Products
            name={'Promo Kerpas'}
            data={products}
            onShowMoreBtnClicked={onShowMoreBtnClicked}
            isLoading={isProductsLoading}
            isLastProductReached={currentProductsPage + 1 > lastProductsPage}
          />
        </Box>
      </Container>
      <Auth />
      <AddToCart />
      <MarketDetails />
    </Fragment>
  );
};

export default Index;
