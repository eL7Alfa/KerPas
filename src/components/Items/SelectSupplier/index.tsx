import { IconButton, Typography, useTheme } from '@mui/material';
import useStyles from './styles';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { SupplierPropsTypes } from '../Supplier';
import React, { createRef, Fragment, useEffect, useState } from 'react';
import { onNext, onPrev } from '../../../helper/sliderNav';
import usePrevious from '../../../helper/usePrevious';
import { useRouter } from 'next/router';
import SelectAbleSupplier from './SelectAbleSupplier';

type SuppliersProps = {
  data: SupplierPropsTypes[];
  onChange: (supplier: SupplierPropsTypes) => () => void;
  activeSupplierCode: string;
};

const SelectSupplier = ({
  data,
  onChange = () => () => {},
  activeSupplierCode,
}: SuppliersProps) => {
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
          Pilih Kios Langganan Anda
        </Typography>
      </div>
      <div className={classes.itemsW} ref={listW}>
        {data.map((d, key) => (
          <div key={key} className={classes.supplierW}>
            <SelectAbleSupplier
              imageUri={d.imageUri}
              name={d.name}
              marketName={d.marketName}
              block={d.block}
              location={d.location}
              supplierId={d.supplierId}
              categories={d.categories}
              onClick={onChange(d)}
              active={activeSupplierCode === d.supplierCode}
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
            widthOffset: -(1200 - theme.breakpoints.values.sm - 1200 / 5),
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
            widthOffset: -(1200 - theme.breakpoints.values.sm - 1200 / 5),
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

export default SelectSupplier;
