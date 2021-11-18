import React, { Fragment, useEffect, useState } from 'react';
import { newProducts, ProductTypes } from '../constants';
import useStyles from './styles';
import Image from 'next/image';
import { Button, ButtonBase, Divider, Paper, Typography } from '@mui/material';
import { AddShoppingCart, Store } from '@mui/icons-material';
import { useGetProducts } from '../../Requests/GlobalRequests';
import axios from '../../config/axios';
import { marketImgUrl } from '../../config/urls';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerI } from '../../redux/reducers';
import { NearestMarketTypes } from '../../redux/defaultStateR/appDefStateR';
import Products from '../Items/Products';
import toRupiah from '../../modules/toRupiah';
import MarketDetails from '../Items/MarketDetails';
import {
  setAddToCartModalR,
  setMarketDetailsModalR,
  setMyAddressesOpenR,
} from '../../redux/actions/appRActions';
import AddToCart from '../Items/AddToCart';
import { setAuthModalOpenR } from '../../redux/actions/authRActions';

export type ProductDetailsPropsTypes = {
  product: ProductTypes;
};

const ProductDetails = ({ product }: ProductDetailsPropsTypes) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { appState, authState } = useSelector((state: rootReducerI) => state);
  const [nearestMarket, setNearestMarket] = useState<NearestMarketTypes>({
    calamat_toko: '',
    cdeskripsi: '',
    cfoto: '',
    ckode_mitra: '',
    ckota: '',
    cnama_mitra: '',
    distance: { text: '', value: 0 },
    id: 0,
  });
  const [currentProductsPage, setCurrentProductsPage] = useState<number>(1);
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

  const onMarketClicked = () => {
    axios()
      .get(`/market/get/${product.market.ckode_user}`)
      .then(({ data }) => {
        console.log(data);
      });
    dispatch(
      setMarketDetailsModalR({
        open: true,
        marketImg: `${marketImgUrl}/${product.market.cfoto}`,
        marketName: product.market.cnama_mitra,
        address: '',
        distance: { text: '', value: 0 },
        location: product.market.ckota,
        description: product.market.description,
      }),
    );
  };

  const onAddToCartBtnClicked = () => {
    if (!authState.userData.id) {
      dispatch(setAuthModalOpenR(true));
      return;
    }
    if (!Object.keys(appState.selectedAddress).length) {
      dispatch(setMyAddressesOpenR(true));
      return;
    }
    dispatch(setAddToCartModalR({ open: true, ...product }));
    return;
  };

  useEffect(() => {
    setNearestMarket(appState.nearestMarket);
  }, [appState.nearestMarket]);

  if (!nearestMarket.id) {
    return <Fragment />;
  }

  return (
    <Fragment>
      <div className={classes.detailsW}>
        <div className={classes.sectionA}>
          {product.imagesUri?.length ? (
            <div className={classes.imgC}>
              <Image
                src={product.imagesUri[0]}
                placeholder={'blur'}
                blurDataURL={product.imageUri}
                alt={product.name}
                layout={'fill'}
                objectFit={'cover'}
              />
            </div>
          ) : (
            <Fragment />
          )}
        </div>
        <div className={classes.sectionB}>
          <Paper className={classes.sBContainer}>
            <div className={classes.sBHeader}>
              <Typography
                variant={'h5'}
                fontWeight={800}
                className={classes.sBProductName}>
                {product.name}
              </Typography>
              <ButtonBase
                className={classes.sBMarketNameW}
                onClick={onMarketClicked}>
                <Store className={classes.sBMarketIcon} />
                <Typography
                  variant={'h6'}
                  fontWeight={500}
                  className={classes.sBMarketName}>
                  {product.market.cnama_mitra}
                </Typography>
              </ButtonBase>
            </div>
            <Divider />
            <div className={classes.sBPriceW}>
              <Typography
                variant={'h5'}
                fontWeight={800}
                className={classes.sBPFixedPrice}>
                {toRupiah(product.fixedPrice)}
              </Typography>
              {product.variants?.length &&
                product.variants[0].data[0].ndiscount > 0 && (
                  <div className={classes.sBProductDiscountW}>
                    <Typography
                      variant={'h6'}
                      fontWeight={500}
                      className={classes.sBPrice}>
                      {toRupiah(product.variants[0].data[0].nretail_price)}
                    </Typography>
                    <Typography
                      variant={'h6'}
                      fontWeight={500}
                      className={classes.sBDiscount}>
                      {`${product.variants[0].data[0].ndiscount}%`}
                    </Typography>
                  </div>
                )}
            </div>
            <Divider />
            <div className={classes.sBBody}>
              <Typography variant={'body1'} className={classes.sBSubtitle}>
                Informasi Produk Pangan
              </Typography>
              <div className={classes.sBSubItem}>
                <Typography variant={'body2'}>SKU</Typography>
                <Typography variant={'body2'}>{product.sku}</Typography>
              </div>
              <div className={classes.sBSubItem}>
                <Typography variant={'body2'}>Kategori</Typography>
                <Typography variant={'body2'}>
                  {`${product.category}/${product.class}`}
                </Typography>
              </div>
              <div className={classes.sBSubItem}>
                <Typography variant={'body2'}>Merk</Typography>
                <Typography variant={'body2'}>{product.brand}</Typography>
              </div>
              <div className={classes.sBSubItem}>
                <Typography variant={'body2'}>Berat</Typography>
                <Typography
                  variant={
                    'body2'
                  }>{`${product.weight} ${product.unit}`}</Typography>
              </div>
              <Typography variant={'body1'} className={classes.sBSubtitle}>
                Deskripsi
              </Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: product.description!,
                }}
                className={classes.sBDescription}
              />
            </div>
            <div className={classes.sBFooter}>
              <Button
                variant={'outlined'}
                className={classes.sBAddToCartBtn}
                onClick={onAddToCartBtnClicked}>
                TAMBAH <AddShoppingCart />
              </Button>
              <Button variant={'contained'} className={classes.sBBuyNowBtn}>
                BELI SEKARANG
              </Button>
            </div>
          </Paper>
        </div>
      </div>
      <Products
        name={`${product.class} Lainnya`}
        data={products}
        onShowMoreBtnClicked={onShowMoreProductBtnClicked}
        isLoading={isProductsLoading}
        isLastProductReached={currentProductsPage + 1 > lastProductsPage}
      />
      <MarketDetails />
      <AddToCart />
    </Fragment>
  );
};

export default ProductDetails;
