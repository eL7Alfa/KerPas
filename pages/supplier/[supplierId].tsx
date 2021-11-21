import { Fragment } from 'react';
import Head from 'next/head';
import { Box, Container, CssBaseline } from '@mui/material';
import AppHeader from '../../src/components/Items/AppHeader';
import { useInit } from '../../src/components/constants';
import Auth from '../../src/components/Items/Auth';
import { useRouter } from 'next/router';
import SupplierDetails from '../../src/components/SupplierDetails';

const Index = () => {
  useInit();
  const route = useRouter();
  const { supplierId } = route.query;

  return (
    <Fragment>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>KerPas</title>
      </Head>
      <CssBaseline />
      <AppHeader />
      <Container maxWidth={'lg'} sx={{ px: '0!important' }}>
        <Box py={1} mt={12} mb={8}>
          <SupplierDetails supplierId={Number(supplierId)} />
        </Box>
      </Container>
      <Auth />
    </Fragment>
  );
};

export default Index;
