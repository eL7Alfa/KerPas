import Head from 'next/head';
import AppHeader from '../src/components/Home/AppHeader';
import {
  Box,
  Container,
  CssBaseline,
  Divider,
  ThemeProvider,
} from '@mui/material';
import theme from '../src/config/theme';
import Campaign from '../src/components/Home/Campaign';
import axios, { baseURL } from '../src/config/axios';
import { Fragment, useEffect, useState } from 'react';
import FeaturedServices from '../src/components/Home/FeaturedServices';
import { AutoFixHigh, Category } from '@mui/icons-material';
import Categories from '../src/components/Home/Categories';
import Stores from '../src/components/Home/Stores';
import { StoreProps } from '../src/components/Home/Stores/Store';
import Promo from '../src/components/Home/Promo';
import Products from '../src/components/Home/Products';
import { newProducts } from '../src/helper/products';

type HomeProps = {
  campaigns: {
    error: boolean;
    result: any[];
  };
  getSupplier: {
    error: boolean;
    result: any[];
  };
  getProducts: {
    error: boolean;
    result: { [key: string]: any };
  };
  getMenu: {
    error: boolean;
    result: { [key: string]: any };
  };
};

export default function Home({
  campaigns,
  getSupplier,
  getProducts,
  getMenu,
}: HomeProps) {
  const [supplier, setSupplier] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [menu, setMenu] = useState<any[]>([]);
  const [isProductLoading, setIsProductLoading] = useState<boolean>(true);
  const [currentProductPage, setCurrentProductPage] = useState<number>(1);
  const [lastProductPage, setLastProductPage] = useState<number>(0);
  const featuredServiceData = [
    {
      icon: function Icon() {
        return <AutoFixHigh />;
      },
      title: 'Segar & Higenis',
      subtitle: 'Produk pilihan',
      iconBgColor:
        'linear-gradient(47deg, rgba(255,164,26,1) 0%, rgba(255,203,107,1) 100%)',
    },
    {
      icon: function Icon() {
        return <AutoFixHigh />;
      },
      title: 'Timbangan Pasti Pas',
      subtitle: 'Sesuai ukuran / berat',
      iconBgColor:
        'linear-gradient(47deg, rgba(255,26,26,1) 0%, rgba(255,99,99,1) 100%)',
    },
    {
      icon: function Icon() {
        return <AutoFixHigh />;
      },
      title: 'Diantar 2 Kali Sehari',
      subtitle: 'Jam 9 pagi dan jam 3 sore',
      iconBgColor:
        'linear-gradient(47deg, rgba(26,42,255,1) 0%, rgba(89,101,255,1) 100%)',
    },
    {
      icon: function Icon() {
        return <AutoFixHigh />;
      },
      title: 'Lengkap & Murah',
      subtitle: 'Paling Lengkap dan harga pasar tradisional',
      iconBgColor:
        'linear-gradient(47deg, rgba(49,184,51,1) 0%, rgba(126,244,129,1) 100%)',
    },
  ];

  const fakeCats = [
    {
      imageUri:
        'https://demos.creative-tim.com/material-dashboard-pro-react/static/media/card-2.3159a3bb.jpeg',
      url: '',
      name: 'Beras',
    },
    {
      imageUri:
        'https://demos.creative-tim.com/material-dashboard-pro-react/static/media/card-3.ba9e3c5e.jpeg',
      url: '',
      name: 'Daging Sapi',
    },
    {
      imageUri:
        'https://demos.creative-tim.com/material-dashboard-pro-react/static/media/card-2.3159a3bb.jpeg',
      url: '',
      name: 'Ikan & Hasil Laut',
    },
    {
      imageUri:
        'https://demos.creative-tim.com/material-dashboard-pro-react/static/media/card-3.ba9e3c5e.jpeg',
      url: '',
      name: 'Bumbu Dapur',
    },
  ];

  const onShowMoreProductBtnClicked = () => {
    const nextProductPage = currentProductPage + 1;
    if (!isProductLoading && nextProductPage <= lastProductPage) {
      setIsProductLoading(true);
      axios()
        .get(`/product?page=${nextProductPage}`)
        .then(({ data }) => {
          console.log(newProducts(data.result.data));
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
    if (getSupplier && !getSupplier.error) {
      const supplier = getSupplier.result.map(m => {
        return {
          name: m.cnama_supplier,
          imageUri: `https://cdn.kerbel.in/assets/suplier/${m.cimg_supplier}`,
          marketName: m.calamat_supplier,
          block: 'A1 - B2',
          location: 'Makassar',
        };
      });
      setSupplier(supplier);
    }
  }, [getSupplier]);

  useEffect(() => {
    if (getMenu && !getMenu.error) {
      const newMenu = getMenu.result.map((gM: { ckelas: any; cicon: any }) => {
        return {
          name: gM.ckelas,
          imageUri: `https://cdn.kerbel.in/api/icon/market/${gM.cicon}`,
          url: '',
        };
      });
      setMenu(newMenu);
    }
  }, [getMenu]);

  useEffect(() => {
    if (getProducts && !getProducts.error && getProducts.result.data.length) {
      setProducts(newProducts(getProducts.result.data));
      setLastProductPage(getProducts.result.last_page);
      setIsProductLoading(false);
    }
  }, [getProducts]);

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
        <Box my={8} py={1}>
          <Campaign data={campaigns.result} />
          <FeaturedServices data={featuredServiceData} />
          <Categories data={menu} />
          <Divider />
          <Promo data={products} />
          <Divider />
          <Stores data={supplier} />
          <Divider />
          <Products
            data={products}
            onShowMoreBtnClicked={onShowMoreProductBtnClicked}
            isLoading={isProductLoading}
          />
        </Box>
      </Container>
    </Fragment>
  );
}

export const getStaticProps = async () => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const { data: campaigns } = await axios().post('/market/ads/campaign');
  const { data: getSupplier } = await axios().get('/market/supplier');
  const { data: getProducts } = await axios().post('/market/product');
  const { data: getMenu } = await axios().get('/market/menu');

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: { campaigns, getSupplier, getProducts, getMenu },
  };
};
