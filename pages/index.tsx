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
import Products from '../src/components/Items/Products';
import { newProducts, useInit } from '../src/components/constants';
import Auth from '../src/components/Auth';
import {
  featuredServiceData,
  selectedCatId,
} from '../src/components/Home/constants';
import { useSelector } from 'react-redux';
import ProductsByCategory from '../src/components/Home/ProductsByCategory';
import NearestMarket from '../src/components/Home/NearestMarket';
import { useGetCampaigns, useGetSupplier } from '../src/Requests/HomeRequests';
import { rootReducerI } from '../src/redux/reducers';
import { useGetProducts } from '../src/Requests/GlobalRequests';

export default function Home() {
  useInit();
  const selector = useSelector((state: rootReducerI) => state);
  const [nearestMarket, setNearestMarket] = useState<{ [key: string]: any }>(
    {},
  );
  const { campaigns } = useGetCampaigns(nearestMarket.ckode_mitra);
  const { supplier } = useGetSupplier(nearestMarket.ckode_mitra);
  const { products: promotedProducts } = useGetProducts({
    marketCode: nearestMarket.ckode_mitra,
    productType: 'promo',
  });
  const [selectedCat] = useState<{ id: number; name: string }>({
    id: selectedCatId,
    name: 'Bumbu dan Bahan Dapur',
  });
  const { products: productsByCategory } = useGetProducts({
    marketCode: nearestMarket.ckode_mitra,
    productType: 'category',
    categoryId: selectedCat.id,
  });
  const [currentProductPage, setCurrentProductPage] = useState<number>(1);
  const {
    products,
    setProducts,
    lastProductPage,
    isProductLoading,
    setIsProductLoading,
  } = useGetProducts({ marketCode: nearestMarket.ckode_mitra });

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

  useEffect(() => {
    setNearestMarket(selector.appState.nearestMarket);
  }, [selector.appState.nearestMarket]);

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
          <Categories />
          <Divider />
          <NearestMarket />
          <Divider />
          <Promo data={promotedProducts} />
          <Divider />
          <ProductsByCategory
            category={selectedCat}
            data={productsByCategory}
          />
          <Stores data={supplier} />
          <Products
            name={'Jelajah Pasar'}
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
