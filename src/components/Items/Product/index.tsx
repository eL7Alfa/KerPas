import useStyles from './styles';
import { Button, Fade, IconButton } from '@mui/material';
import Image from 'next/image';
import toRupiah from '../../../modules/toRupiah';
import { AddShoppingCart } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { setAuthModalOpenR } from '../../../redux/actions/authRActions';
import {
  setAddToCartModalR,
  setMyAddressesOpenR,
} from '../../../redux/actions/appRActions';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerI } from '../../../redux/reducers';
import { newProducts, ProductTypes } from '../../constants';
import axios from '../../../config/axios';

const Product = (product: ProductTypes) => {
  const { imageUri, name, price, discount, fixedPrice, slug } = product;
  const classes = useStyles();
  const { appState, authState } = useSelector((state: rootReducerI) => state);
  const dispatch = useDispatch();
  const router = useRouter();

  const onAddToCartBtnClicked = () => {
    if (!authState.userData.id) {
      dispatch(setAuthModalOpenR(true));
      return;
    }
    if (!Object.keys(appState.selectedAddress).length) {
      dispatch(setMyAddressesOpenR(true));
      return;
    }
    axios()
      .get(`/product/${product.productId}`)
      .then(({ data }) => {
        dispatch(
          setAddToCartModalR({ open: true, ...newProducts(data.result)[0] }),
        );
      });
  };

  const onItemClick = () => {
    router.push(`/product/${slug}`);
  };

  return (
    <Fade in>
      <div className={classes.root}>
        <IconButton
          className={classes.addToCartBtn}
          onClick={onAddToCartBtnClicked}>
          <AddShoppingCart />
        </IconButton>
        <Button classes={{ root: classes.body }} onClick={onItemClick}>
          <div className={classes.imgW}>
            <Image
              src={imageUri}
              layout={'fill'}
              alt={name}
              placeholder={'blur'}
              blurDataURL={imageUri}
            />
          </div>
          <div className={classes.detailW}>
            <div className={classes.name}>{name}</div>
            {discount > 0 && (
              <div className={classes.priceW}>
                <div className={classes.price}>{toRupiah(price)}</div>
                <div className={classes.discount}>{discount}%</div>
              </div>
            )}
            <div className={classes.fixedPrice}>{toRupiah(fixedPrice)}</div>
          </div>
        </Button>
      </div>
    </Fade>
  );
};

export default Product;
