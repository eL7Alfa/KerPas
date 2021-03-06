import { Button, IconButton, Typography, useTheme } from '@mui/material';
import useStyles from './styles';
import {
  KeyboardArrowDown,
  NavigateBefore,
  NavigateNext,
} from '@mui/icons-material';
import React, { createRef, Fragment, useEffect, useState } from 'react';
import Product from '../../Items/Product';
import { onNext, onPrev } from '../../../helper/sliderNav';
import usePrevious from '../../../helper/usePrevious';
import { useRouter } from 'next/router';
import { ProductTypes } from '../../constants';

type PromoPropsTypes = {
  data: ProductTypes[];
};

const Promo = ({ data }: PromoPropsTypes) => {
  const theme = useTheme();
  const classes = useStyles();
  const router = useRouter();
  const listW = createRef<HTMLDivElement>();
  const prevData = usePrevious(data);
  const [listLoaded, setListLoaded] = useState<{
    state: boolean;
    height: number;
    hList?: HTMLDivElement;
  }>({
    state: false,
    height: 0,
  });

  const onShowMoreBtnClicked = () => {
    router.push('/promos');
  };

  useEffect(() => {
    if (
      prevData !== data &&
      data.length &&
      listW.current &&
      !listLoaded.state
    ) {
      setListLoaded({
        state: true,
        height: listW.current.getBoundingClientRect().height,
        hList: listW.current,
      });
    }
  }, [data, listW, listW.current]);

  if (data.length === 0) {
    return <Fragment />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant={'h6'} className={classes.title}>
          Promo Pasar
        </Typography>
        <Button
          variant={'text'}
          onClick={onShowMoreBtnClicked}
          className={classes.showMoreBtn}>
          Lihat Semua
          <KeyboardArrowDown
            fontSize={'small'}
            className={classes.showMoreArrowDown}
          />
        </Button>
      </div>
      <div className={classes.hListW}>
        <div className={classes.itemsW} ref={listW}>
          {data.map((d, key) => (
            <div key={key} className={classes.productW}>
              <Product {...d} />
            </div>
          ))}
        </div>
        {listLoaded.state && (
          <IconButton
            tabIndex={1}
            onClick={onPrev({
              hList: listLoaded.hList,
              breakpoint: theme.breakpoints.values.lg,
            })}
            className={classes.prevIconBtn}
            style={{ marginBottom: 16 }}>
            <NavigateBefore />
          </IconButton>
        )}
        {listLoaded.state && (
          <IconButton
            tabIndex={1}
            onClick={onNext({
              hList: listLoaded.hList,
              breakpoint: theme.breakpoints.values.lg,
            })}
            className={classes.nextIconBtn}
            style={{ marginBottom: 16 }}>
            <NavigateNext />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default Promo;
