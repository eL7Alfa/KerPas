import React, { Fragment, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerI } from '../../../redux/reducers';
import { setAddToCartModalR } from '../../../redux/actions/appRActions';
import SelectSupplier from '../SelectSupplier';
import { ProductTypes } from '../../constants';
import { useGetSuppliers } from '../../../Requests/GlobalRequests';
import { SupplierPropsTypes } from '../Supplier';
import Image from 'next/image';
import toRupiah from '../../../modules/toRupiah';
import { AddShoppingCart } from '@mui/icons-material';

const AddToCart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { appState } = useSelector((state: rootReducerI) => state);
  const [open, setOpen] = useState(false);
  const [activeSupplierCode, setActiveSupplierCode] = useState('');
  const [data, setData] = useState<ProductTypes | null>();
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedDetailVariant, setSelectedDetailVariant] = useState<any>(null);
  const [fixedPrice, setFixedPrice] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const { suppliers } = useGetSuppliers({
    marketCode: data?.market?.ckode_user,
    category: data?.classCode,
  });

  const onSelectSupplierChange = (data: SupplierPropsTypes) => () => {
    setActiveSupplierCode(data.supplierCode);
  };

  const onVariantChanged = (variant: any) => () => {
    setSelectedVariant(variant);
  };

  const onDetailVariantChanged = (variant: any) => () => {
    setSelectedDetailVariant(variant);
    setFixedPrice(variant.ndiscount_price);
    setPrice(variant.nretail_price);
    setDiscount(variant.ndiscount);
  };

  const onClose = () => {
    dispatch(
      setAddToCartModalR({
        open: false,
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
    const { open: modalOpen, ...data } = appState.addToCartModal;
    setOpen(modalOpen);
    setData(data);
    setSelectedVariant(null);
  }, [appState.addToCartModal.open]);

  useEffect(() => {
    if (
      data &&
      data.variants?.length &&
      data.variants[0].cnama_variasi.toUpperCase() === 'NONE'
    ) {
      setFixedPrice(data.variants[0].data[0].ndiscount_price);
      setPrice(data.variants[0].data[0].nretail_price);
      setDiscount(data.variants[0].data[0].ndiscount);
    } else {
      setFixedPrice(0);
      setPrice(0);
      setDiscount(0);
    }
  }, [data]);

  if (!data) {
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
                  src={data.imageUri}
                  alt={data.name}
                  placeholder={'blur'}
                  layout={'fill'}
                  blurDataURL={data?.imageUri}
                  objectFit={'cover'}
                />
              </div>
              <div className={classes.productInfoDetails}>
                <Typography variant={'body1'} className={classes.pIDName}>
                  {data.name}
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
              </div>
            </div>
            {data.variants?.length &&
            data.variants[0].cnama_variasi.toUpperCase() !== 'NONE' ? (
              <Fragment>
                <div className={classes.variantPickerW}>
                  <Typography variant={'h6'} className={classes.variantTitle}>
                    Variasi
                  </Typography>
                  <div className={classes.vPWItemsW}>
                    <Grid container>
                      {data.variants?.map((v, key) => (
                        <Grid key={key} item xs={4}>
                          <RadioGroup
                            row
                            aria-label={'variant'}
                            name={'variant'}
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
          </div>
          <div className={classes.footer}>
            <Button
              variant={'contained'}
              className={classes.addToCartBtn}
              onClick={() => {}}>
              TAMBAH KE KERANJANG
              <AddShoppingCart />
            </Button>
          </div>
        </Paper>
      </Box>
    </Modal>
  );
};

export default AddToCart;
