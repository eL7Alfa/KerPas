import { IconButton, Typography, useTheme } from '@mui/material';
import useStyles from './styles';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import React, { createRef, useEffect, useState } from 'react';
import Product, { ProductProps } from '../../Items/Product';
import { onNext, onPrev } from '../../../helper/sliderNav';
import usePrevious from '../../../helper/usePrevious';

type PromoProps = {
  data: ProductProps[];
};

const Promo = ({ data }: PromoProps) => {
  const theme = useTheme();
  const classes = useStyles();
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

  useEffect(() => {
    if (
      prevData !== data &&
      data.length &&
      listW.current &&
      !listLoaded.state
    ) {
      console.log(listW.current.getBoundingClientRect().height);
      setListLoaded({
        state: true,
        height: listW.current.getBoundingClientRect().height,
        hList: listW.current,
      });
    }
  }, [data, listW, listW.current]);
  return (
    <div className={classes.root}>
      <Typography variant={'h6'} className={classes.title} px={2}>
        Promo Pasar
      </Typography>
      <div className={classes.hListW}>
        <div className={classes.itemsW} ref={listW}>
          {data.map((d, key) => (
            <div key={key} className={classes.productW}>
              <Product
                imageUri={d.imageUri}
                name={d.name}
                price={d.price}
                discount={d.discount}
                fixedPrice={d.fixedPrice}
                url={d.url}
              />
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
