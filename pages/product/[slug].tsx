import React, { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, CssBaseline } from '@mui/material';
import AppHeader from '../../src/components/Items/AppHeader';
import { newProducts, useInit } from '../../src/components/constants';
import Auth from '../../src/components/Items/Auth';
import { useRouter } from 'next/router';
import {
  useGetProduct,
  useGetProducts,
} from '../../src/Requests/GlobalRequests';
import ProductDetails from '../../src/components/ProductDetails';
import Products from '../../src/components/Items/Products';
import axios from '../../src/config/axios';
import { NearestMarketTypes } from '../../src/redux/defaultStateR/appDefStateR';
import { useSelector } from 'react-redux';
import { rootReducerI } from '../../src/redux/reducers';
import MarketDetails from '../../src/components/Items/MarketDetails';
import AddToCart from '../../src/components/Items/AddToCart';

const Index = () => {
  useInit();
  const route = useRouter();
  const { appState } = useSelector((state: rootReducerI) => state);
  const { slug } = route.query;
  const { product } = useGetProduct({ slug: slug as string });
  const [currentProductsPage, setCurrentProductsPage] = useState<number>(1);
  const [nearestMarket, setNearestMarket] = useState<NearestMarketTypes>({
    cloc: 0,
    calamat_toko: '',
    cdeskripsi: '',
    cfoto: '',
    ckode_mitra: '',
    ckota: '',
    cnama_mitra: '',
    distance: { text: '', value: 0 },
    id: 0,
  });
  const {
    products,
    setProducts,
    lastProductsPage,
    isProductsLoading,
    setIsProductsLoading,
  } = useGetProducts({
    marketCode: nearestMarket.ckode_mitra,
    productType: 'category',
    categoryId: Number(product.classCode),
  });

  const onShowMoreProductBtnClicked = () => {
    const nextProductPage = currentProductsPage + 1;
    if (!isProductsLoading && nextProductPage <= lastProductsPage) {
      setIsProductsLoading(true);
      axios()
        .post(`/market/product?page=${nextProductPage}`, {
          limit: 12,
          type: 'category',
          marketId: nearestMarket.ckode_mitra,
          subcategory: Number(product.classCode),
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
    setNearestMarket(appState.nearestMarket);
  }, [appState.nearestMarket]);

  return (
    <Fragment>
      <Head>
        <meta name={'description'} content="KERPAS - Produk" />
        <link rel="icon" href="/favicon.ico" />
        <title>KerPas</title>
      </Head>
      <CssBaseline />
      <AppHeader />
      <Container maxWidth={'lg'} sx={{ px: '0!important' }}>
        <Box py={1} mt={9} mb={8}>
          <ProductDetails {...{ product }} />
          <Products
            name={
              product.class
                ? `${product.class} Lainnya`.replace(
                    'Lainnya Lainnya',
                    'Lainnya',
                  )
                : ''
            }
            data={products}
            onShowMoreBtnClicked={onShowMoreProductBtnClicked}
            isLoading={isProductsLoading}
            isLastProductReached={currentProductsPage + 1 > lastProductsPage}
          />
        </Box>
      </Container>
      <Auth />
      <MarketDetails />
      <AddToCart />
    </Fragment>
  );
};

export default Index;
