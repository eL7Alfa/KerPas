import React, { Fragment, useEffect, useState } from 'react';
import {
  Box,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerI } from '../../../redux/reducers';
import {
  setAddToCartModalR,
  setMyAddressesOpenR,
  triggerCartUpdateR,
} from '../../../redux/actions/appRActions';
import SelectSupplier from '../SelectSupplier';
import { ProductTypes, useSnackbarConst } from '../../constants';
import { useGetSuppliers } from '../../../Requests/GlobalRequests';
import { SupplierPropsTypes } from '../Supplier';
import Image from 'next/image';
import toRupiah from '../../../modules/toRupiah';
import { Add, AddShoppingCart, Close, Remove } from '@mui/icons-material';
import { setAuthModalOpenR } from '../../../redux/actions/authRActions';
import axios from '../../../config/axios';
import Snackbar from '../../../smallComponents/Snackbar';
import { LoadingButton } from '@mui/lab';
import moment from 'moment';
import { useRouter } from 'next/router';

const AddToCart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const { appState, authState } = useSelector((state: rootReducerI) => state);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<ProductTypes | null>();
  const [selectedVariant, setSelectedVariant] = useState<any>({
    id_variasi: null,
    data: [],
  });
  const [selectedDetailVariant, setSelectedDetailVariant] = useState<any>({
    id_ukuran: null,
    cnama_ukuran: '',
  });
  const [fixedPrice, setFixedPrice] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [qty, setQty] = useState<number>(1);
  const [maxQty, setMaxQty] = useState<number>(5);
  const { suppliers } = useGetSuppliers({
    marketCode: product?.market?.ckode_user,
    category: product?.classCode,
  });
  const [activeSupplierCode, setActiveSupplierCode] = useState('');
  const { snackbarState, setSnackPack, onSnackbarClose } = useSnackbarConst();
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [callback, setCallback] = useState<'default' | 'openCart' | undefined>(
    'default',
  );

  const getSettings = () => {
    if (appState.nearestMarket.id) {
      axios()
        .post('/market/setting/specific', {
          ckode_market: appState.nearestMarket.ckode_mitra,
          tz_offset: (new Date().getTimezoneOffset() / 60) * -1,
          date: moment().format('yyyy-MM-DD'),
        })
        .then(({ data }) => {
          const { result } = data;
          setMaxQty(result.nmargin_item);
        });
    }
  };

  const onSelectSupplierChange = (supplier: SupplierPropsTypes) => () => {
    setActiveSupplierCode(supplier.supplierCode);
  };

  const onVariantChanged = (variant: any) => () => {
    setSelectedVariant(variant);
    setPrice(0);
    setFixedPrice(0);
    setDiscount(0);
    setSelectedDetailVariant({ id_ukuran: null });
  };

  const onDetailVariantChanged = (variant: any) => () => {
    setSelectedDetailVariant(variant);
    setFixedPrice(
      Math.floor(
        variant.nretail_price -
          variant.nretail_price * (variant.ndiscount / 100),
      ),
    );
    setPrice(variant.nretail_price);
    setDiscount(variant.ndiscount);
  };

  const onQtyOptionsBtnClick = (mode: string) => () => {
    switch (mode) {
      case 'reduce': {
        qty > 1 && setQty(prevQty => prevQty - 1);
        break;
      }
      default:
        qty < maxQty && setQty(prevQty => prevQty + 1);
    }
  };

  const onAddToCartBtnClicked = () => {
    if (!authState.userData.token) {
      dispatch(setAuthModalOpenR(true));
      return;
    }
    if (!Object.keys(appState.selectedAddress).length) {
      dispatch(setMyAddressesOpenR(true));
      return;
    }
    if (!activeSupplierCode) {
      setSnackPack(prev => [
        ...prev,
        {
          ...snackbarState,
          open: true,
          severity: 'error',
          msg: 'Silahkan pilih kios pangan terlebih dahulu.',
          key: new Date().getTime(),
        },
      ]);
      return;
    }
    if (!selectedVariant.id_variasi || !selectedDetailVariant.id_ukuran) {
      setSnackPack(prev => [
        ...prev,
        {
          ...snackbarState,
          open: true,
          severity: 'error',
          msg: 'Silahkan pilih variasi terlebih dahulu.',
          key: new Date().getTime(),
        },
      ]);
      return;
    }
    setIsAddingToCart(true);
    axios(authState.userData.token)
      .post('/market/cart/check', { kode_user: authState.userData.ckode_user })
      .then(({ data }) => {
        if (data.response === 200) {
          if (product?.market?.ckode_user !== data.result[0]) {
            setSnackPack(prev => [
              ...prev,
              {
                ...snackbarState,
                open: true,
                severity: 'error',
                msg: 'Pasar berbeda.',
                key: new Date().getTime(),
              },
            ]);
            return;
          }
        }
        const formData = {
          kode_user: authState.userData.ckode_user,
          id_produk: product?.productId?.toString(),
          sku_produk: product?.productCode,
          nama_produk: product?.name,
          qty,
          hrg_produk: price,
          berat_produk: product?.weight,
          cstore: product?.market.ckode_user,
          cloc: product?.market.cloc,
          disc_member: 0,
          disc_produk: selectedDetailVariant.ndiscount,
          img: product?.imageTop,
          csupplier: activeSupplierCode,
          id_variasi: selectedVariant.id_variasi,
          variasi: selectedVariant.cnama_variasi,
          id_ukuran: selectedDetailVariant.id_ukuran,
          ukuran: selectedDetailVariant.cnama_ukuran,
        };
        axios(authState.userData.token)
          .post('/market/cart/add', formData)
          .then(({ data }) => {
            setSnackPack(prev => [
              ...prev,
              {
                ...snackbarState,
                open: true,
                severity: data.error ? 'error' : 'success',
                msg: data.result,
                key: new Date().getTime(),
              },
            ]);
            if (!data.error) {
              dispatch(triggerCartUpdateR());
              setTimeout(() => {
                onSnackbarClose();
                switch (appState.addToCartModal.callback) {
                  case 'openCart': {
                    router.push('/cart');
                    break;
                  }
                  default: {
                    break;
                  }
                }
                dispatch(
                  setAddToCartModalR({
                    discount: 0,
                    variants: [],
                    fixedPrice: 0,
                    imageUri: '',
                    name: '',
                    price: 0,
                    slug: '',
                    open: false,
                    callback: 'default',
                  }),
                );
              }, 1000);
            }
          })
          .finally(() => setIsAddingToCart(false));
      })
      .catch(() => setIsAddingToCart(false));
  };

  const onClose = () => {
    onSnackbarClose();
    dispatch(
      setAddToCartModalR({
        variants: [],
        open: false,
        callback: 'default',
        discount: 0,
        fixedPrice: 0,
        imageUri: '',
        name: '',
        price: 0,
        slug: '',
      }),
    );
  };

  useEffect(() => {
    const { open: modalOpen, ...product } = appState.addToCartModal;
    setOpen(modalOpen);
    setProduct(product);
    setSelectedVariant({
      id_variasi: null,
      data: [],
    });
    setSelectedDetailVariant({
      id_ukuran: null,
      cnama_ukuran: '',
    });
    if (suppliers.length) {
      setActiveSupplierCode(suppliers[0].supplierCode);
    }
    setQty(1);
    setCallback(appState.addToCartModal.callback);
  }, [appState.addToCartModal.open, suppliers]);

  useEffect(() => {
    if (
      product &&
      product.variants?.length &&
      product.variants[0].cnama_variasi.toUpperCase() === 'NONE'
    ) {
      setFixedPrice(
        Math.floor(
          product.variants[0].data[0].nretail_price -
            product.variants[0].data[0].nretail_price *
              (product.variants[0].data[0].ndiscount / 100),
        ),
      );
      setPrice(product.variants[0].data[0].nretail_price);
      setDiscount(product.variants[0].data[0].ndiscount);
      setSelectedVariant(product.variants[0]);
      setSelectedDetailVariant(product.variants[0].data[0]);
    } else {
      setFixedPrice(0);
      setPrice(0);
      setDiscount(0);
    }
  }, [product]);

  useEffect(() => {
    if (suppliers.length) {
      setActiveSupplierCode(suppliers[0].supplierCode);
    }
  }, [suppliers]);

  useEffect(() => {
    getSettings();
  }, [appState.nearestMarket.id]);

  if (!product) {
    return <Fragment />;
  }

  return (
    <Modal {...{ open, onClose }}>
      <Box className={classes.box}>
        <Paper className={classes.paper}>
          <div className={classes.header}>
            <AddShoppingCart className={classes.titleIcon} />
            <Typography variant={'h5'} className={classes.title}>
              Tambah Ke Keranjang
            </Typography>
          </div>
          <Divider />
          <div className={classes.body}>
            <SelectSupplier
              data={suppliers}
              activeSupplierCode={activeSupplierCode}
              onChange={onSelectSupplierChange}
            />
            <div className={classes.productInfoW}>
              <div className={classes.productImgW}>
                <Image
                  src={product.imageUri}
                  alt={product.name}
                  placeholder={'blur'}
                  layout={'fill'}
                  blurDataURL={product?.imageUri}
                  objectFit={'cover'}
                />
              </div>
              <div className={classes.productInfoDetails}>
                <Typography variant={'body1'} className={classes.pIDName}>
                  {product.name}
                </Typography>
                <div className={classes.pIDPriceW}>
                  <Typography variant={'h6'} className={classes.pIDFixedPrice}>
                    {toRupiah(fixedPrice)}
                  </Typography>
                  {discount > 0 && (
                    <div className={classes.pIDProductDiscountW}>
                      <Typography
                        variant={'h6'}
                        fontWeight={500}
                        className={classes.pIDPrice}>
                        {toRupiah(price)}
                      </Typography>
                      <Typography
                        variant={'h6'}
                        fontWeight={500}
                        className={classes.sBDiscount}>
                        {`${discount}%`}
                      </Typography>
                    </div>
                  )}
                </div>
                <Typography variant={'body1'} className={classes.pIDMaxQty}>
                  {`Maximum jumlah pesanan ${maxQty}`}
                </Typography>
              </div>
            </div>
            {product.variants?.length &&
            product.variants[0].cnama_variasi.toUpperCase() !== 'NONE' ? (
              <Fragment>
                <div className={classes.variantPickerW}>
                  <Typography variant={'h6'} className={classes.variantTitle}>
                    Variasi
                  </Typography>
                  <div className={classes.vPWItemsW}>
                    <Grid container>
                      {product.variants?.map((v, key) => (
                        <Grid key={key} item xs={4}>
                          <RadioGroup
                            row
                            aria-label={'variant'}
                            name={'variant'}
                            value={selectedVariant?.id_variasi}
                            onChange={onVariantChanged(v)}>
                            <FormControlLabel
                              value={v.id_variasi}
                              control={<Radio className={classes.radioIcon} />}
                              label={v.cnama_variasi}
                            />
                          </RadioGroup>
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </div>
                <div className={classes.detailVariantPickerW}>
                  <Typography variant={'h6'} className={classes.variantTitle}>
                    Detail Variasi
                  </Typography>
                  <div className={classes.dVPWItemsW}>
                    <Grid container>
                      {selectedVariant &&
                        selectedVariant.data.map((v: any, key: number) => (
                          <Grid key={key} item xs={4}>
                            <RadioGroup
                              row
                              aria-label={'detailVariant'}
                              name={'detailVariant'}
                              value={selectedDetailVariant?.id_ukuran}
                              onChange={onDetailVariantChanged(v)}>
                              <FormControlLabel
                                value={v.id_ukuran}
                                control={
                                  <Radio className={classes.radioIcon} />
                                }
                                label={v.cnama_ukuran}
                              />
                            </RadioGroup>
                          </Grid>
                        ))}
                    </Grid>
                  </div>
                </div>
              </Fragment>
            ) : (
              <Fragment />
            )}
            <div className={classes.qtyOptionsW}>
              <Typography variant={'body1'} className={classes.totalPrice}>
                {toRupiah(fixedPrice * qty)}
              </Typography>
              <div className={classes.qtyOptionsC}>
                <IconButton
                  className={classes.qtyOptionsBtn}
                  onClick={onQtyOptionsBtnClick('reduce')}>
                  <Remove />
                </IconButton>
                <Typography
                  variant={'body1'}
                  className={classes.qtyOptionsText}>
                  {qty}
                </Typography>
                <IconButton
                  className={classes.qtyOptionsBtn}
                  onClick={onQtyOptionsBtnClick('add')}>
                  <Add />
                </IconButton>
              </div>
            </div>
          </div>
          <div className={classes.footer}>
            {callback === 'default' ? (
              <LoadingButton
                loading={isAddingToCart}
                variant={'contained'}
                className={classes.addToCartBtn}
                onClick={onAddToCartBtnClicked}>
                TAMBAH KE KERANJANG
                <AddShoppingCart />
              </LoadingButton>
            ) : (
              callback === 'openCart' && (
                <LoadingButton
                  loading={isAddingToCart}
                  variant={'contained'}
                  className={classes.addToCartBtn}
                  onClick={onAddToCartBtnClicked}>
                  BELI SEKARANG
                </LoadingButton>
              )
            )}
          </div>
          <Snackbar
            key={snackbarState.key}
            open={snackbarState.open}
            msg={snackbarState.msg}
            severity={snackbarState.severity}
            onClose={onSnackbarClose}
            anchorOrigin={snackbarState.anchorOrigin}
            className={classes.snackbar}
            autoHideDuration={snackbarState.timeout}
          />
          <IconButton className={classes.closeBtn} onClick={onClose}>
            <Close />
          </IconButton>
        </Paper>
      </Box>
    </Modal>
  );
};

export default AddToCart;
