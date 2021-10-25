import React, { Fragment } from 'react';
import {
  Avatar,
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

type CartButtonPropsType = {
  classes?: { iconButton: string };
};

const CartButton = ({
  classes: classesProps = { iconButton: '' },
}: CartButtonPropsType) => {
  const classes = useStyles();
  const cartBtnRef = React.useRef<HTMLButtonElement>(null);
  const [cartOpen, setCartOpen] = React.useState(false);
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
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>A</Avatar>
                  </ListItemAvatar>
                  <Typography>Hello heaven!</Typography>
                </ListItem>
              </Paper>
            </div>
          </Grow>
        )}
      </Popper>
    </Fragment>
  );
};

export default CartButton;
