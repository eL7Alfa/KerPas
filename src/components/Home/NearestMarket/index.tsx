import React from 'react';
import useStyles from './styles';
import Image from 'next/image';
import { Paper, Typography } from '@mui/material';
import { Room } from '@mui/icons-material';

export type NearestMarketT = {
  marketName: string;
  address: string;
  distance: number;
  location: string;
};

const NearestMarket = ({
  marketName,
  address,
  distance,
  location,
}: NearestMarketT) => {
  const classes = useStyles();
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
                alt={'Pasar Terdekat Anda'}
                src={'/assets/images/nearestMarketBg.png'}
                layout={'fill'}
                placeholder={'blur'}
                blurDataURL={'/assets/images/nearestMarketBg.png'}
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
                {`${distance} km`}
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
