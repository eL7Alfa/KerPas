import { IconButton, Typography, useTheme } from '@mui/material';
import useStyles from './styles';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import Store, { StoreProps } from './Supplier';
import React, { createRef, Fragment, useEffect, useState } from 'react';
import { onNext, onPrev } from '../../../helper/sliderNav';
import usePrevious from '../../../helper/usePrevious';

type StoresProps = {
  data: StoreProps[];
};

const Stores = ({ data }: StoresProps) => {
  const classes = useStyles();
  const theme = useTheme();
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
      setListLoaded({
        state: true,
        height: listW.current.getBoundingClientRect().height,
        hList: listW.current,
      });
    }
  }, [data]);

  if (!data.length) {
    return <Fragment />;
  }

  return (
    <div className={classes.root}>
      <Typography variant={'h6'} className={classes.title} px={2}>
        Kios Pangan Kerpas
      </Typography>
      <div className={classes.itemsW} ref={listW}>
        {data.map((d, key) => (
          <Store
            key={key}
            imageUri={d.imageUri}
            name={d.name}
            marketName={d.marketName}
            block={d.block}
            location={d.location}
            url={d.url}
          />
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
          style={{
            bottom: listLoaded.height / 2 - 10,
          }}>
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
          style={{
            bottom: listLoaded.height / 2 - 10,
          }}>
          <NavigateNext />
        </IconButton>
      )}
    </div>
  );
};

export default Stores;
