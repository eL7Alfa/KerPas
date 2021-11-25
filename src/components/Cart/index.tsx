import React from 'react';
import CartItem from './CartItem';
import { useGetCartProducts } from '../../Requests/GlobalRequests';
import useStyles from './styles';
import CheckOut from './Checkout';
import { Typography } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import NoItemInCart from '../Items/NoItemInCart';

const Cart = () => {
  const classes = useStyles();
  const { cartProducts, isCartProductLoading } = useGetCartProducts();
  return (
    <div className={classes.root}>
      <div className={classes.cartSection}>
        <div className={classes.cartHeader}>
          <ShoppingCart className={classes.cartHeaderIcon} />
          <Typography variant={'h5'} className={classes.cartHeaderTitle}>
            Keranjang
          </Typography>
        </div>
        {!isCartProductLoading && !cartProducts.length && (
          <NoItemInCart variant={'large'} />
        )}
        {cartProducts.map((cP, key) => (
          <CartItem key={key} {...cP} isLoading={isCartProductLoading} />
        ))}
      </div>
      <CheckOut {...{ cartProducts }} />
    </div>
  );
};

export default Cart;
