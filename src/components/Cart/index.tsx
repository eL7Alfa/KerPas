import React, { useEffect } from 'react';
import CartItem from './CartItem';
import { useGetCartProducts } from '../../Requests/GlobalRequests';
import useStyles from './styles';
import CheckOut from './Checkout';
import { Typography } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerI } from '../../redux/reducers';
import { setAuthModalOpenR } from '../../redux/actions/authRActions';

const Cart = () => {
  const classes = useStyles();
  const { authState } = useSelector((state: rootReducerI) => state);
  const dispatch = useDispatch();
  const { cartProducts, isCartProductLoading } = useGetCartProducts();
  useEffect(() => {
    if (!authState.userData.id) {
      dispatch(setAuthModalOpenR(true));
    }
  }, [authState.userData]);
  return (
    <div className={classes.root}>
      <div className={classes.cartSection}>
        <div className={classes.cartHeader}>
          <ShoppingCart className={classes.cartHeaderIcon} />
          <Typography variant={'h5'} className={classes.cartHeaderTitle}>
            Keranjang
          </Typography>
        </div>
        {cartProducts.map((cP, key) => (
          <CartItem key={key} {...cP} isLoading={isCartProductLoading} />
        ))}
      </div>
      <CheckOut {...{ cartProducts }} />
    </div>
  );
};

export default Cart;
