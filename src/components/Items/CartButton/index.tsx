import React, { Fragment } from 'react';
import {
  Avatar,
  ButtonBase,
  Divider,
  Grow,
  IconButton,
  ListItem,
  ListItemAvatar,
  Paper,
  Popper,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import useStyles from './styles';
import { useGetCartProducts } from '../../../Requests/GlobalRequests';
import toRupiah from '../../../modules/toRupiah';
import theme from '../../../config/theme';

type CartButtonPropsType = {
  classes?: { iconButton: string };
};

const CartButton = ({
  classes: classesProps = { iconButton: '' },
}: CartButtonPropsType) => {
  const classes = useStyles();
  const cartBtnRef = React.useRef<HTMLButtonElement>(null);
  const [cartOpen, setCartOpen] = React.useState(false);
  const { cartProducts } = useGetCartProducts();

  return (
    <Fragment>
      <IconButton
        ref={cartBtnRef}
        className={clsx(classes.cartButton, classesProps.iconButton)}
        onMouseOver={() => !cartOpen && setCartOpen(true)}
        onMouseLeave={() => setCartOpen(false)}>
        <ShoppingCart />
      </IconButton>
      <Popper
        open={cartOpen}
        anchorEl={cartBtnRef.current}
        transition
        className={classes.popper}>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}>
            <div
              className={classes.cartMenuPaperW}
              onMouseOver={() => setCartOpen(true)}
              onMouseLeave={() => setCartOpen(false)}>
              <Paper className={classes.paperPopCartList}>
                <div className={classes.cMPHeader}>
                  <div className={classes.cMPHTitleW}>
                    <ShoppingCart className={classes.cMPHTitleIcon} />
                    <Typography variant={'h6'} className={classes.cMPHTitle}>
                      Keranjang
                    </Typography>
                  </div>
                  <ButtonBase className={classes.showAllItemBtn}>
                    Semua
                  </ButtonBase>
                </div>
                <Divider sx={{ mx: theme.spacing(1) }} />
                <div className={classes.cMPBody}>
                  {cartProducts.slice(0, 3).map((cP, key) => (
                    <ListItem key={key}>
                      <ListItemAvatar>
                        <Avatar
                          src={cP.imageUri}
                          className={classes.cMPItemImage}
                        />
                      </ListItemAvatar>
                      <div className={classes.cMPItemInfoW}>
                        <Typography
                          variant={'body2'}
                          className={classes.cMPItemName}>
                          {cP.name}
                        </Typography>
                        <Typography
                          variant={'body2'}
                          className={classes.cMPItemQty}>
                          {`${cP.qty} item ${
                            cP.weight ? `(${cP.weight}gr)` : ''
                          }`}
                        </Typography>
                        <Typography
                          variant={'body2'}
                          className={classes.cMPItemPrice}>
                          {toRupiah(cP.fixedPrice)}
                        </Typography>
                      </div>
                    </ListItem>
                  ))}
                  {cartProducts.length > 3 && (
                    <div className={classes.cMPThreeDotsW}>
                      <Typography
                        variant={'body1'}
                        className={classes.cMPThreeDots}>
                        ...
                      </Typography>
                    </div>
                  )}
                </div>
                <Divider sx={{ mx: theme.spacing(1) }} />
                <div className={classes.cMPFooter}>
                  <Typography
                    variant={'body2'}
                    className={classes.cMPItemTotal}>
                    {`Total ${cartProducts.length} item`}
                  </Typography>
                </div>
              </Paper>
            </div>
          </Grow>
        )}
      </Popper>
    </Fragment>
  );
};

export default CartButton;
