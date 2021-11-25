import { Fragment } from 'react';
import Head from 'next/head';
import { Box, Container, CssBaseline } from '@mui/material';
import AppHeader from '../../src/components/Items/AppHeader';
import NearestMarket from '../../src/components/Items/NearestMarket';
import { useGetMarkets } from '../../src/Requests/GlobalRequests';
import { useInit } from '../../src/components/constants';
import Markets from '../../src/components/Items/Markets';
import Auth from '../../src/components/Items/Auth';
import MarketDetails from '../../src/components/Items/MarketDetails';

const Index = () => {
  useInit();
  const { markets, isMarketsLoading } = useGetMarkets();

  return (
    <Fragment>
      <Head>
        <meta name="description" content={'Pasar yang terdaftar'} />
        <link rel="icon" href="/favicon.ico" />
        <title>KerPas - Pasar</title>
      </Head>
      <CssBaseline />
      <AppHeader />
      <Container maxWidth={'lg'} sx={{ px: '0!important', overflow: 'hidden' }}>
        <Box py={1} mt={10} mb={8}>
          <NearestMarket hideShowMoreBtn />
          <Markets
            name={'Pasar Kerpas'}
            data={markets}
            isLoading={isMarketsLoading}
          />
        </Box>
      </Container>
      <Auth />
      <MarketDetails />
    </Fragment>
  );
};

export default Index;
