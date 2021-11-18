import React, { Fragment, useEffect, useState } from 'react';
import { newProducts, ProductTypes } from '../constants';
import useStyles from './styles';
import Image from 'next/image';
import { Button, ButtonBase, Divider, Paper, Typography } from '@mui/material';
import { AddShoppingCart, Store } from '@mui/icons-material';
import SuppliersC from '../Items/Suppliers';
import { useGetProducts, useGetSuppliers } from '../../Requests/GlobalRequests';
import axios from '../../config/axios';
import { supplierImgUrl } from '../../config/urls';
import { useSelector } from 'react-redux';
import { rootReducerI } from '../../redux/reducers';
import { NearestMarketTypes } from '../../redux/defaultStateR/appDefStateR';
import Products from '../Items/Products';
import toRupiah from '../../modules/toRupiah';

export type ProductDetailsPropsTypes = {
  product: ProductTypes;
};

const ProductDetails = ({ product }: ProductDetailsPropsTypes) => {
  const classes = useStyles();
  const { appState } = useSelector((state: rootReducerI) => state);
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
  const [currentSuppliersPage, setCurrentSuppliersPage] = useState<number>(1);
  const {
    suppliers,
    setSuppliers,
    isSuppliersLoading,
    lastSuppliersPage,
    setIsSuppliersLoading,
  } = useGetSuppliers({
    marketCode: nearestMarket.ckode_mitra,
    subCategory: product.classCode,
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

  const onShowMoreSuppliersBtnClicked = () => {
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

  if (!nearestMarket.id) {
    return <Fragment />;
  }

  return (
    <Fragment>
      <div className={classes.detailsW}>
        <div className={classes.sectionA}>
          {product.imagesUri?.length && (
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
              <ButtonBase className={classes.sBMarketNameW}>
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
                variant={'h6'}
                fontWeight={800}
                className={classes.sBPFixedPrice}>
                {toRupiah(product.fixedPrice)}
              </Typography>
              {product.discount > 0 && (
                <div className={classes.sBProductDiscountW}>
                  <Typography
                    variant={'h6'}
                    fontWeight={500}
                    className={classes.sBPrice}>
                    {toRupiah(product.price)}
                  </Typography>
                  <Typography
                    variant={'h6'}
                    fontWeight={500}
                    className={classes.sBDiscount}>
                    {`${product.discount}%`}
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
              <Button variant={'outlined'} className={classes.sBAddToCartBtn}>
                TAMBAH <AddShoppingCart />
              </Button>
              <Button variant={'contained'} className={classes.sBBuyNowBtn}>
                BELI SEKARANG
              </Button>
            </div>
          </Paper>
        </div>
      </div>
      <SuppliersC
        name={`Kios Pangan ${product.class}`}
        data={suppliers}
        onShowMoreBtnClicked={onShowMoreSuppliersBtnClicked}
        isLoading={isSuppliersLoading}
        isLastPageReached={currentSuppliersPage + 1 > lastSuppliersPage}
      />
      <Products
        name={`${product.class} Lainnya`}
        data={products}
        onShowMoreBtnClicked={onShowMoreProductBtnClicked}
        isLoading={isProductsLoading}
        isLastProductReached={currentProductsPage + 1 > lastProductsPage}
      />
    </Fragment>
  );
};

export default ProductDetails;
