import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, CssBaseline } from '@mui/material';
import AppHeader from '../../src/components/Items/AppHeader';
import NearestMarket from '../../src/components/Items/NearestMarket';
import SuppliersC from '../../src/components/Items/Suppliers';
import { useGetSuppliers } from '../../src/Requests/GlobalRequests';
import axios from '../../src/config/axios';
import { useInit } from '../../src/components/constants';
import { supplierImgUrl } from '../../src/config/urls';
import { useSelector } from 'react-redux';
import { rootReducerI } from '../../src/redux/reducers';

const Index = () => {
  useInit();
  const selector = useSelector((state: rootReducerI) => state);
  const [nearestMarket, setNearestMarket] = useState<{ [key: string]: any }>(
    {},
  );
  const [currentSuppliersPage, setCurrentSuppliersPage] = useState<number>(1);
  const {
    suppliers,
    setSuppliers,
    isSuppliersLoading,
    lastSuppliersPage,
    setIsSuppliersLoading,
  } = useGetSuppliers({ marketCode: nearestMarket.ckode_mitra });

  const onShowMoreBtnClicked = () => {
    const nextSuppliersPage = currentSuppliersPage + 1;
    if (!isSuppliersLoading && nextSuppliersPage <= lastSuppliersPage) {
      setIsSuppliersLoading(true);
      axios()
        .post(`/market/supplier?page=${nextSuppliersPage}`, {
          limit: 12,
          marketId: nearestMarket.ckode_mitra,
        })
        .then(({ data }) => {
          const suppliers = data.map(
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
          setSuppliers(prevSuppliers => [...prevSuppliers, ...suppliers]);
          setCurrentSuppliersPage(nextSuppliersPage);
        })
        .finally(() => setIsSuppliersLoading(false));
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
        <title>KerPas - Kios Pangan Kerpas</title>
      </Head>
      <CssBaseline />
      <AppHeader />
      <Container maxWidth={'lg'} sx={{ px: '0!important', overflow: 'hidden' }}>
        <Box py={1} mt={7} mb={8}>
          <NearestMarket />
          <SuppliersC
            name={'Kios Pangan Kerpas'}
            data={suppliers}
            onShowMoreBtnClicked={onShowMoreBtnClicked}
            isLoading={isSuppliersLoading}
            isLastPageReached={currentSuppliersPage + 1 > lastSuppliersPage}
          />
        </Box>
      </Container>
    </Fragment>
  );
};

export default Index;
