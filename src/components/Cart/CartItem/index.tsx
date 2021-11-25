import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import Image from 'next/image';
import { CartProductTypes } from '../../constants';
import { IconButton, Typography } from '@mui/material';
import toRupiah from '../../../modules/toRupiah';
import { Add, Delete, Remove } from '@mui/icons-material';
import axios from '../../../config/axios';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerI } from '../../../redux/reducers';
import { triggerCartUpdateR } from '../../../redux/actions/appRActions';
import moment from 'moment';

interface CartItemPropsTypes extends CartProductTypes {
  isLoading: boolean;
}

const CartItem = ({
  cartId,
  name,
  price,
  discount,
  fixedPrice,
  imageUri,
  qty,
  marketCode,
  size,
  variantName,
  weight,
  isLoading,
}: CartItemPropsTypes) => {
  const classes = useStyles();
  const { authState } = useSelector((state: rootReducerI) => state);
  const dispatch = useDispatch();
  const [isOptionsBtnDisabled, setIsOptionsBtnDisabled] = useState(false);
  const [maxQty, setMaxQty] = useState<number>(5);

  const onQtyOptionsBtnClicked = (mode: string) => () => {
    if (mode === 'reduce' && qty! <= 1) {
      return;
    }
    if (mode === 'add' && qty! >= 5) {
      return;
    }
    if (!isOptionsBtnDisabled) {
      setIsOptionsBtnDisabled(true);
      axios(authState.userData.token)
        .post('/market/cart/update', {
          id: cartId,
          kode_user: authState.userData.ckode_user,
          ops: mode === 'add' ? 1 : 0,
        })
        .then(() => {
          dispatch(triggerCartUpdateR());
        })
        .finally(() => setIsOptionsBtnDisabled(false));
    }
  };

  const onQtyOptionsDeleteBtnClicked = () => {
    if (!isOptionsBtnDisabled) {
      setIsOptionsBtnDisabled(true);
      axios(authState.userData.token)
        .post('/market/cart/delete', {
          id: cartId,
          kode_user: authState.userData.ckode_user,
        })
        .then(() => {
          dispatch(triggerCartUpdateR());
        })
        .finally(() => setIsOptionsBtnDisabled(false));
    }
  };

  const getSettings = () => {
    if (marketCode) {
      axios()
        .post('/market/setting/specific', {
          ckode_market: marketCode,
          tz_offset: (new Date().getTimezoneOffset() / 60) * -1,
          date: moment().format('yyyy-MM-DD'),
        })
        .then(({ data }) => {
          const { result } = data;
          setMaxQty(result.nmargin_item);
        });
    }
  };

  useEffect(() => {
    getSettings();
  }, [marketCode]);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.sectionA}>
          <div className={classes.imgW}>
            <Image
              src={imageUri}
              alt={name}
              placeholder={'blur'}
              blurDataURL={imageUri}
              layout={'fill'}
              objectFit={'cover'}
            />
          </div>
          <div className={classes.infoW}>
            <Typography variant={'body1'} className={classes.productName}>
              {name}
            </Typography>
            <div className={classes.priceW}>
              <div className={classes.fixedPriceW}>
                <Typography variant={'body1'} className={classes.fixedPrice}>
                  {toRupiah(Math.round(fixedPrice))}
                </Typography>
                <Typography variant={'body1'} className={classes.fPUnit}>
                  {`/ Pcs`}
                </Typography>
              </div>
              {discount > 0 && (
                <div className={classes.productDiscountW}>
                  <Typography
                    variant={'body2'}
                    fontWeight={500}
                    className={classes.price}>
                    {toRupiah(price)}
                  </Typography>
                  <Typography
                    variant={'body2'}
                    fontWeight={500}
                    className={classes.discount}>
                    {`${discount}%`}
                  </Typography>
                </div>
              )}
            </div>
            <Typography variant={'body1'} className={classes.qty}>
              {`${qty} item (${weight}gr)`}
            </Typography>
            <Typography variant={'body1'} className={classes.variant}>
              {`Variasi: ${
                variantName?.toUpperCase() === 'NONE' ? '-' : variantName
              }`}
            </Typography>
            <Typography variant={'body1'} className={classes.variantDetail}>
              {`Detail Variasi: ${size ?? '-'}`}
            </Typography>
          </div>
        </div>
        <div className={classes.optionsW}>
          <div className={classes.qtyOptionsW}>
            <Typography variant={'body1'} className={classes.totalPrice}>
              {toRupiah(fixedPrice * qty!)}
            </Typography>
            <div className={classes.qtyOptionsC}>
              <IconButton
                className={classes.qtyOptionsBtn}
                onClick={onQtyOptionsBtnClicked('reduce')}
                disabled={isLoading || isOptionsBtnDisabled || qty! <= 1}>
                <Remove />
              </IconButton>
              <Typography variant={'body1'} className={classes.qtyOptionsText}>
                {qty}
              </Typography>
              <IconButton
                className={classes.qtyOptionsBtn}
                onClick={onQtyOptionsBtnClicked('add')}
                disabled={isLoading || isOptionsBtnDisabled || qty! >= maxQty}>
                <Add />
              </IconButton>
            </div>
          </div>
          <IconButton
            className={classes.qtyOptionsDeleteBtn}
            onClick={onQtyOptionsDeleteBtnClicked}
            disabled={isOptionsBtnDisabled}>
            <Delete />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
