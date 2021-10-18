import React from 'react';
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import useStyles from './styles';
import { CreditCard, FactCheck, Receipt } from '@mui/icons-material';

const Information = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div className={classes.header}>
        <div className={classes.shapeA} />
        <Typography
          variant={'h5'}
          fontWeight={'bold'}
          className={classes.title}>
          Temukan Berbagai Kemudahan Di Asisten Belanjamu
        </Typography>
        <div className={classes.logoW}>
          <div className={classes.logoC}>
            <Avatar
              alt={'Keranjang Belanja'}
              src={'/assets/images/keranjang-belanja-logo.png'}
            />
          </div>
        </div>
      </div>
      <CardContent className={classes.cardContent}>
        <div className={classes.featuredServiceW}>
          <div className={classes.fSIconW}>
            <CreditCard />
          </div>
          <Typography variant={'h6'}>Checkout Pesanan Dengan Mudah</Typography>
        </div>
        <div className={classes.featuredServiceW}>
          <div className={classes.fSIconW}>
            <FactCheck />
          </div>
          <Typography variant={'h6'}>Lacak Pesanan Secara Real Time</Typography>
        </div>
        <div className={classes.featuredServiceW}>
          <div className={classes.fSIconW}>
            <Receipt />
          </div>
          <Typography variant={'h6'}>
            Seluruh Informasi Transaksi Anda Di Satu Tempat
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default Information;
