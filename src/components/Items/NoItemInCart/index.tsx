import React from 'react';
import useStyles from './styles';
import { Typography } from '@mui/material';

const NoItemInCart = ({ variant }: { variant: 'small' | 'large' }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.infoW}>
        <Typography variant={'body1'} className={classes.oopsSmall}>
          Oops!!
        </Typography>
        <Typography variant={'body1'} className={classes.infoSmall}>
          Belum ada item di keranjang
        </Typography>
      </div>
    </div>
  );
};

export default NoItemInCart;
