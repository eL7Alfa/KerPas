import React, { Fragment } from 'react';
import useStyles from './styles';
import Image from 'next/image';
import { Paper, Typography } from '@mui/material';
import { Room } from '@mui/icons-material';

export type NearestMarketT = {
  marketId: string;
  marketCode: string;
  marketName: string;
  address: string;
  distance: { text: string; value: number };
  location: string;
  marketImg: string;
};

const NearestMarket = ({
  marketId,
  marketCode,
  marketName,
  address,
  distance,
  location,
  marketImg,
}: NearestMarketT) => {
  const classes = useStyles();
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
