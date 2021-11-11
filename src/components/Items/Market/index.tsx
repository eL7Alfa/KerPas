import { Paper, Typography } from '@mui/material';
import Image from 'next/image';
import { Room } from '@mui/icons-material';
import React from 'react';
import useStyles from './styles';

export type MarketPropsTypes = {
  marketId: number;
  marketCode: string;
  marketName: string;
  address: string;
  distance: { text: string; value: number };
  location: string;
  marketImg: string;
};

const Market = ({
  marketId,
  marketCode,
  marketName,
  address,
  distance,
  location,
  marketImg,
}: MarketPropsTypes) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
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
            <Typography variant={'body1'} className={classes.detailLocation}>
              {location}
            </Typography>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default Market;
