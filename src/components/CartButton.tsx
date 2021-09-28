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
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const CartButton = () => {
  const classes = useStyles();
  const cartBtnRef = React.useRef<HTMLButtonElement>(null);
  const [cartOpen, setCartOpen] = React.useState(false);
  return (
    <Fragment>
      <IconButton
        ref={cartBtnRef}
        className={classes.cartButton}
        onMouseOver={() => !cartOpen && setCartOpen(true)}
        onMouseLeave={() => setCartOpen(false)}>
        <ShoppingCart />
      </IconButton>
      <Popper open={cartOpen} anchorEl={cartBtnRef.current} transition>
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
                  <Typography>Hello oooooooooooooo0000000000000</Typography>
                </ListItem>
              </Paper>
            </div>
          </Grow>
        )}
      </Popper>
    </Fragment>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cartButton: {
      backgroundColor: theme.palette.background.default,
      borderRadius: 8,
      '&.MuiButton-root': {
        boxShadow:
          '0px 3px 1px -2px rgba(254,204,43,0.2), 0px 2px 2px 0px rgba(254,204,43,0.1), 0px 1px 5px 0px rgba(254,204,43,0.08)',
        color: theme.palette.background.default,
        '&:hover': {
          boxShadow:
            '0px 5px 10px 5px rgba(254,204,43,0.3), 0px 5px 2px 0px rgba(254,204,43,0.1), 0px 1px 5px 0px rgba(254,204,43,0.08)',
          backgroundColor: theme.palette.secondary.main,
        },
      },
    },
    cartMenuPaperW: {
      paddingTop: 10,
    },
    paperPopCartList: {
      padding: '10px 0',
      borderRadius: 10,
      boxShadow:
        '0 13px 27px -5px rgb(50 50 93 / 25%), 0 8px 16px -8px rgb(0 0 0 / 30%), 0 -6px 16px -6px rgb(0 0 0 / 3%)',
    },
  }),
);

export default CartButton;
