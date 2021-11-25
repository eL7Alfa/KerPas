import React from 'react';
import Image from 'next/image';
import useStyles from './styles';
import { Button, Typography } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useRouter } from 'next/router';

const NoNearestMarket = () => {
  const classes = useStyles();
  const router = useRouter();

  const onShowMoreBtnClicked = () => {
    router.push('/markets');
  };
  return (
    <div className={classes.root}>
      <div className={classes.imgW}>
        <Image
          src={'/assets/images/noNearestMarketImg.jpeg'}
          alt={'Tidak Ada Pasar Terdekat'}
          placeholder={'blur'}
          blurDataURL={'/assets/images/noNearestMarketImg.jpeg'}
          layout={'fill'}
          objectFit={'scale-down'}
        />
      </div>
      <div className={classes.infoW}>
        <Typography variant={'body1'} className={classes.oops}>
          Oops!!
        </Typography>
        <Typography variant={'body1'} className={classes.info}>
          Lokasi pengantaran pesananmu di luar area yang kami jangkau
        </Typography>
        <Typography variant={'body1'} className={classes.instruction}>
          Silahkan pilih alamat lain
        </Typography>
        {router.pathname !== '/markets' && (
          <Button
            variant={'contained'}
            onClick={onShowMoreBtnClicked}
            className={classes.showMoreBtn}>
            LIHAT PASAR YANG TERSEDIA
            <KeyboardArrowDown
              fontSize={'small'}
              className={classes.showMoreArrowDown}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default NoNearestMarket;
