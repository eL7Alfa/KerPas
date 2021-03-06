import React, { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, CssBaseline } from '@mui/material';
import AppHeader from '../../src/components/Items/AppHeader';
import { useRouter } from 'next/router';
import { newProducts, useInit } from '../../src/components/constants';
import NearestMarket from '../../src/components/Items/NearestMarket';
import Products from '../../src/components/Items/Products';
import axios from '../../src/config/axios';
import { useSelector } from 'react-redux';
import { rootReducerI } from '../../src/redux/reducers';
import { useGetProducts } from '../../src/Requests/GlobalRequests';
import Categories from '../../src/components/Items/Categories';
import { useGetCategories } from '../../src/Requests/HomeRequests';
import Auth from '../../src/components/Items/Auth';
import AddToCart from '../../src/components/Items/AddToCart';
import MarketDetails from '../../src/components/Items/MarketDetails';

const Index = () => {
  useInit();
  const selector = useSelector((state: rootReducerI) => state);
  const router = useRouter();
  const { categoryId } = router.query;
  const [nearestMarket, setNearestMarket] = useState<{ [key: string]: any }>(
    {},
  );
  const [currentProductPage, setCurrentProductPage] = useState<number>(1);
  const {
    products,
    setProducts,
    lastProductsPage,
    isProductsLoading,
    setIsProductsLoading,
  } = useGetProducts({
    marketCode: nearestMarket.ckode_mitra,
    productType: 'category',
    categoryId: Number(categoryId),
  });
  const { categories } = useGetCategories();
  const { name } =
    categories.length &&
    categories.filter(c => Number(c.code) === Number(categoryId))[0];

  const onShowMoreProductBtnClicked = () => {
    const nextProductPage = currentProductPage + 1;
    if (!isProductsLoading && nextProductPage <= lastProductsPage) {
      setIsProductsLoading(true);
      axios()
        .post(`/market/product?page=${nextProductPage}`, {
          limit: 12,
          type: 'category',
          marketId: nearestMarket.ckode_mitra,
          subcategory: Number(categoryId),
        })
        .then(({ data }) => {
          setProducts(prevProducts => [
            ...prevProducts,
            ...newProducts(data.result.data),
          ]);
          setCurrentProductPage(nextProductPage);
        })
        .finally(() => setIsProductsLoading(false));
    }
  };

  useEffect(() => {
    setCurrentProductPage(1);
  }, [categoryId]);

  useEffect(() => {
    setNearestMarket(selector.appState.nearestMarket);
  }, [selector.appState.nearestMarket]);

  return (
    <Fragment>
      <Head>
        <meta
          name={'description'}
          content={`Kategori bahan pangan ${name ?? ''}`.trim()}
        />
        <link rel="icon" href="/favicon.ico" />
        <title>{`KerPas ${name ?? ''}`.trim()}</title>
      </Head>
      <CssBaseline />
      <AppHeader />
      <Container maxWidth={'lg'} sx={{ px: '0!important', overflow: 'hidden' }}>
        <Box py={1} mt={9} mb={8}>
          <NearestMarket />
          <Categories />
          <Products
            name={name as string}
            data={products}
            onShowMoreBtnClicked={onShowMoreProductBtnClicked}
            isLoading={isProductsLoading}
            isLastProductReached={currentProductPage + 1 > lastProductsPage}
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
