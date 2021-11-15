import { ButtonBase, Typography } from '@mui/material';
import Image from 'next/image';
import { Room } from '@mui/icons-material';
import React from 'react';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { setMarketDetailsModalR } from '../../../redux/actions/appRActions';

export type MarketPropsTypes = {
  marketId?: number;
  marketCode: string;
  marketName: string;
  address: string;
  distance: { text: string; value: number };
  location: string;
  marketImg: string;
  description: string;
};

const Market = ({
  marketId,
  marketCode,
  marketName,
  address,
  distance,
  location,
  marketImg,
  description,
}: MarketPropsTypes) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onMarketClicked = () => {
    dispatch(
      setMarketDetailsModalR({
        open: true,
        marketImg,
        marketName,
        address,
        distance,
        location,
        description,
      }),
    );
  };

  return (
    <ButtonBase className={classes.root} onClick={onMarketClicked}>
      <div className={classes.itemInfoW}>
        <div className={classes.itemImgW}>
          <Image
            alt={marketName}
            src={marketImg}
            layout={'fill'}
            objectFit={'cover'}
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
    </ButtonBase>
  );
};

export default Market;
