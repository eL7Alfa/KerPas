import useStyles from './styles';
import { Button, Paper } from '@mui/material';
import Image from 'next/image';
import { CheckCircleRounded } from '@mui/icons-material';
import { Fragment } from 'react';

export type SupplierPropsTypes = {
  active: boolean;
  supplierId: number;
  imageUri: string;
  name: string;
  marketName: string;
  block: string;
  location: string;
  categories: any[];
  onClick: () => void;
};

const SelectAbleSupplier = ({
  active = false,
  supplierId,
  imageUri,
  name,
  marketName,
  block,
  location,
  onClick = () => {},
}: SupplierPropsTypes) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button onClick={onClick}>
        <Paper className={classes.body}>
          <div className={classes.imgW}>
            <Image
              src={imageUri}
              layout={'fill'}
              alt={name}
              placeholder={'blur'}
              blurDataURL={imageUri}
            />
          </div>
          <div className={classes.detailW}>
            <div className={classes.name}>{name}</div>
            <div className={classes.marketName}>{marketName}</div>
            <div className={classes.block}>{block}</div>
            {/*<div className={classes.location}>*/}
            {/*  <Room className={classes.locationIcon} />*/}
            {/*  {location}*/}
            {/*</div>*/}
          </div>
        </Paper>
      </Button>
      {active ? (
        <CheckCircleRounded className={classes.activeIcon} />
      ) : (
        <Fragment />
      )}
    </div>
  );
};

export default SelectAbleSupplier;
