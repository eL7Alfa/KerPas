import React, { Fragment, useEffect, useState } from 'react';
import useStyles from './styles';
import Image from 'next/image';
import { Button } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { rootReducerI } from '../../../redux/reducers';
import Market from '../Market';
import { useRouter } from 'next/router';
import { MarketsParamsTypes, newMarkets } from '../../constants';

export type NearestMarketTypes = {
  hideShowMoreBtn?: boolean;
};

const NearestMarket = ({ hideShowMoreBtn = false }: NearestMarketTypes) => {
  const classes = useStyles();
  const router = useRouter();
  const selector = useSelector((state: rootReducerI) => state);
  const [nearestMarket, setNearestMarket] = useState<MarketsParamsTypes>({
    calamat_toko: '',
    cdeskripsi: '',
    cfoto: '',
    ckode_mitra: '',
    ckota: '',
    cnama_mitra: '',
    distance: { text: '', value: 0 },
    id: undefined,
  });

  const {
    marketCode,
    marketName,
    marketId,
    marketImg,
    description,
    distance,
    location,
    address,
  } = newMarkets([nearestMarket])[0];

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
