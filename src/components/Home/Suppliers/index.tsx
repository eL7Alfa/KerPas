import { Button, IconButton, Typography, useTheme } from '@mui/material';
import useStyles from './styles';
import {
  KeyboardArrowDown,
  NavigateBefore,
  NavigateNext,
} from '@mui/icons-material';
import Supplier, { SupplierProps } from '../../Items/Supplier';
import React, { createRef, Fragment, useEffect, useState } from 'react';
import { onNext, onPrev } from '../../../helper/sliderNav';
import usePrevious from '../../../helper/usePrevious';
import { useRouter } from 'next/router';

type SuppliersProps = {
  data: SupplierProps[];
};

const Suppliers = ({ data }: SuppliersProps) => {
  const classes = useStyles();
  const theme = useTheme();
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
    router.push('/suppliers');
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
  }, [data]);

  if (!data.length) {
    return <Fragment />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant={'h6'} className={classes.title}>
          Kios Pangan Kerpas
        </Typography>
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
      </div>
      <div className={classes.itemsW} ref={listW}>
        {data.map((d, key) => (
          <div key={key} className={classes.supplierW}>
            <Supplier
              imageUri={d.imageUri}
              name={d.name}
              marketName={d.marketName}
              block={d.block}
              location={d.location}
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

export default Suppliers;
