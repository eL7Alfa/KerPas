import Head from 'next/head';
import { Box, Container, CssBaseline } from '@mui/material';
import AppHeader from '../../src/components/Items/AppHeader';
import React, { Fragment } from 'react';
import { useInit } from '../../src/components/constants';
import Auth from '../../src/components/Items/Auth';
import Cart from '../../src/components/Cart';

const Index = () => {
  useInit();
  return (
    <Fragment>
      <Head>
        <meta name={'description'} content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <title>KerPas - Keranjang</title>
      </Head>
      <CssBaseline />
      <AppHeader />
      <Container
        maxWidth={'lg'}
        sx={{ px: '0!important', overflow: 'hidden', minHeight: '100vh' }}>
        <Box py={1} mt={10} mb={8}>
          <Cart />
        </Box>
      </Container>
      <Auth />
    </Fragment>
  );
};

export default Index;
