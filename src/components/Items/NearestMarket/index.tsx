import React, { Fragment, useEffect, useState } from 'react';
import useStyles from './styles';
import Image from 'next/image';
import { Paper, Typography } from '@mui/material';
import { Room } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { rootReducerI } from '../../../redux/reducers';
import { marketImgUrl } from '../../../config/urls';

const NearestMarket = () => {
  const classes = useStyles();
  const selector = useSelector((state: rootReducerI) => state);
  const [nearestMarket, setNearestMarket] = useState<{ [key: string]: any }>(
    {},
  );
  const marketId = nearestMarket.id;
  const marketCode = nearestMarket.ckode_mitra;
  const marketName = nearestMarket.cnama_mitra;
  const address = nearestMarket.calamat_toko;
  const distance = nearestMarket.distance;
  const location = nearestMarket.ckota;
  const marketImg = `${marketImgUrl}/${nearestMarket.cfoto}`;

  useEffect(() => {
    setNearestMarket(selector.appState.nearestMarket);
  }, [selector.appState.nearestMarket]);

  if (!marketId) {
    return <Fragment />;
  }
  return (
    <div className={classes.root}>
      <div className={classes.imgBgW}>
        <div className={classes.imgBgC}>
          <Image
            alt={'Pasar Terdekat Anda'}
            src={'/assets/images/nearestMarketBg.png'}
            layout={'fill'}
            placeholder={'blur'}
            blurDataURL={'/assets/images/nearestMarketBg.png'}
          />
        </div>
      </div>
      <div className={classes.itemW}>
        <Paper className={classes.itemC}>
          <div className={classes.itemInfoW}>
            <div className={classes.itemImgW}>
              <Image
                alt={marketName}
                src={marketImg}
                layout={'fill'}
                placeholder={'blur'}
                blurDataURL={marketImg}
              />
            </div>
            <div className={classes.itemInfoDetail}>
              <Typography variant={'h4'} className={classes.detailMarketName}>
                {marketName}
              </Typography>
              <Typography variant={'h6'} className={classes.detailAddress}>
                {address}
              </Typography>
              <Typography variant={'body1'} className={classes.detailDistance}>
                {distance.text}
              </Typography>
              <div className={classes.detailLocationW}>
                <Room className={classes.locationIcon} />
                <Typography
                  variant={'body1'}
                  className={classes.detailLocation}>
                  {location}
                </Typography>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default NearestMarket;
