import { Button, Grid, IconButton, Paper, Typography } from '@mui/material';
import useStyles from './styles';
import {
  AutoFixHigh,
  FlightOutlined,
  NavigateBefore,
  NavigateNext,
} from '@mui/icons-material';
import Store, { StoreProps } from './Store';
import React, {
  createRef,
  JSXElementConstructor,
  Key,
  LegacyRef,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';

type StoresProps = {
  data: StoreProps[];
};

const Stores = ({ data }: StoresProps) => {
  const classes = useStyles();
  const listW = createRef<HTMLDivElement>();
  const [listLoaded, setListLoaded] = useState({ state: false, height: 0 });

  const onPrev = () => {
    listW.current?.scrollTo({
      left: listW.current?.scrollLeft - 1200 / 5,
      behavior: 'smooth',
    });
  };

  const onNext = () => {
    listW.current?.scrollTo({
      left: listW.current?.scrollLeft + 1200 / 5,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (listW.current && !listLoaded.state) {
      console.log(listW.current.getBoundingClientRect().height);
      setListLoaded({
        state: true,
        height: listW.current.getBoundingClientRect().height,
      });
    }
  }, [listW, listW.current]);
  return (
    <div className={classes.root}>
      <Typography variant={'h6'} className={classes.title} px={2}>
        Mitra Kerpas
      </Typography>
      <div className={classes.itemsW} ref={listW}>
        {data.map((d, key) => (
          <Store key={key} imageUri={d.imageUri} name={d.name} url={d.url} />
        ))}
      </div>
      {listLoaded && (
        <IconButton
          tabIndex={1}
          onClick={onPrev}
          className={classes.prevIconBtn}
          style={{
            bottom: listLoaded.height / 2 - 40,
          }}>
          <NavigateBefore />
        </IconButton>
      )}
      {listLoaded.state && (
        <IconButton
          tabIndex={1}
          onClick={onNext}
          className={classes.nextIconBtn}
          style={{
            bottom: listLoaded.height / 2 - 40,
          }}>
          <NavigateNext />
        </IconButton>
      )}
    </div>
  );
};

export default Stores;
