import React, { Fragment, useEffect, useState } from 'react';
import useStyles from './styles';
import Image from 'next/image';
import { Button } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { rootReducerI } from '../../../redux/reducers';
import { marketImgUrl } from '../../../config/urls';
import Market from '../Market';
import { useRouter } from 'next/router';

export type NearestMarketTypes = {
  hideShowMoreBtn?: boolean;
};

const NearestMarket = ({ hideShowMoreBtn = false }: NearestMarketTypes) => {
  const classes = useStyles();
  const router = useRouter();
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
  const description = nearestMarket.cdeskripsi;

  const onShowMoreBtnClicked = () => {
    router.push('/markets');
  };

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
        <div className={classes.header}>
          {!hideShowMoreBtn && (
            <Button
              variant={'contained'}
              onClick={onShowMoreBtnClicked}
              className={classes.showMoreBtn}>
              Lihat Semua
              <KeyboardArrowDown
                fontSize={'small'}
                className={classes.showMoreArrowDown}
              />
            </Button>
          )}
        </div>
        <div className={classes.itemC}>
          <Market
            {...{
              marketId,
              marketName,
              marketCode,
              marketImg,
              distance,
              location,
              address,
              description,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NearestMarket;
