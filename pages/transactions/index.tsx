import Head from 'next/head';
import { Box, Container, CssBaseline } from '@mui/material';
import AppHeader from '../../src/components/Items/AppHeader';
import React, { Fragment } from 'react';
import { useInit } from '../../src/components/constants';
import AddToCart from '../../src/components/Items/AddToCart';
import Auth from '../../src/components/Items/Auth';
import Transactions from '../../src/components/Transactions';

const Index = () => {
  useInit();
  return (
    <Fragment>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <title>KerPas</title>
      </Head>
      <CssBaseline />
      <AppHeader />
      <Container
        maxWidth={'lg'}
        sx={{ px: '0!important', overflow: 'hidden', height: '100vh' }}>
        <Box py={1} mt={10}>
          <Transactions />
        </Box>
      </Container>
      <Auth />
      <AddToCart />
    </Fragment>
  );
};

export default Index;
