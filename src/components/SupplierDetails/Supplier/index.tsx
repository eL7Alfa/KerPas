import React, { Fragment } from 'react';
import { MarketPropsTypes } from '../../Items/Market';
import { SupplierPropsTypes } from '../../Items/Supplier';
import Image from 'next/image';
import useStyles from './styles';
import { Typography } from '@mui/material';
import { Room } from '@mui/icons-material';

export type HeaderPropsTypes = {
  market: MarketPropsTypes;
  supplier: SupplierPropsTypes;
};

const Supplier = ({ market, supplier }: HeaderPropsTypes) => {
  const classes = useStyles();
  if (!market.marketId || !supplier.supplierId) {
    return <Fragment />;
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.supplierImg}>
        <Image
          src={supplier.imageUri}
          layout={'fill'}
          placeholder={'blur'}
          blurDataURL={supplier.imageUri}
          alt={supplier.name}
        />
      </div>
      <div className={classes.supplierDetails}>
        <Typography variant={'h6'}>{supplier.name}</Typography>
        <Typography variant={'body1'}>{market.marketName}</Typography>
        <div className={classes.location}>
          <Room className={classes.locationIcon} />
          <Typography variant={'body1'}>{market.location}</Typography>
        </div>
      </div>
    </div>
  );
};

export default Supplier;
