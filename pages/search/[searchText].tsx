import Head from 'next/head';
import { Box, Container, CssBaseline } from '@mui/material';
import AppHeader from '../../src/components/Items/AppHeader';
import NearestMarket from '../../src/components/Items/NearestMarket';
import React, { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { newProducts, useInit } from '../../src/components/constants';
import Auth from '../../src/components/Items/Auth';
import Products from '../../src/components/Items/Products';
import { useGetSearchedProducts } from '../../src/Requests/GlobalRequests';
import { NearestMarketTypes } from '../../src/redux/defaultStateR/appDefStateR';
import axios from '../../src/config/axios';
import AddToCart from '../../src/components/Items/AddToCart';

const Index = () => {
  useInit();
  const router = useRouter();
  const { searchText } = router.query;
  const [nearestMarket, setNearestMarket] = useState<NearestMarketTypes>({
    calamat_toko: '',
    cdeskripsi: '',
    cfoto: '',
    ckode_mitra: '',
    ckota: '',
    cloc: 0,
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
  } = useGetSearchedProducts({ searchText: searchText as string });
  const [currentProductPage, setCurrentProductPage] = useState<number>(1);

  const onShowMoreProductBtnClicked = () => {
    const nextProductPage = currentProductPage + 1;
    if (!isProductsLoading && nextProductPage <= lastProductsPage) {
      setIsProductsLoading(true);
      axios()
        .get(`/market/product/search/${searchText}?page=${nextProductPage}`)
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

  return (
    <Fragment>
      <Head>
        <meta
          name={'description'}
          content={`Kategori bahan pangan ${searchText ?? ''}`.trim()}
        />
        <link rel="icon" href="/favicon.ico" />
        <title>{`KerPas ${searchText ?? ''}`.trim()}</title>
      </Head>
      <CssBaseline />
      <AppHeader />
      <Container maxWidth={'lg'} sx={{ px: '0!important', overflow: 'hidden' }}>
        <Box py={1} mt={9} mb={8}>
          <NearestMarket />
          <Products
            name={`Cari Produk: ${searchText}`}
            data={products}
            onShowMoreBtnClicked={onShowMoreProductBtnClicked}
            isLoading={isProductsLoading}
            isLastProductReached={currentProductPage + 1 > lastProductsPage}
          />
        </Box>
      </Container>
      <Auth />
      <AddToCart />
    </Fragment>
  );
};

export default Index;
