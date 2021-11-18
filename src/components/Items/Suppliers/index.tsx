import { Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useStyles from './styles';
import React, { Fragment } from 'react';
import Supplier, { SupplierPropsTypes } from '../Supplier';

type SuppliersProps = {
  name: string;
  data: SupplierPropsTypes[];
  onShowMoreBtnClicked: () => void;
  isLoading: boolean;
  isLastPageReached: boolean;
};

const Suppliers = ({
  name,
  data,
  onShowMoreBtnClicked,
  isLoading,
  isLastPageReached,
}: SuppliersProps) => {
  const classes = useStyles();

  if (data.length === 0) {
    return <Fragment />;
  }

  return (
    <div className={classes.root}>
      <Typography variant={'h6'} className={classes.title} px={2}>
        {name}
      </Typography>
      <Grid container className={classes.itemsW} spacing={2} px={1}>
        {data.map((d, key) => (
          <Grid key={key} item xs={6} sm={3} md={2} lg={2}>
            <Supplier {...d} />
          </Grid>
        ))}
      </Grid>
      {!isLastPageReached && (
        <div className={classes.showMoreW}>
          <LoadingButton
            loading={isLoading}
            variant={'outlined'}
            className={classes.showMoreBtn}
            onClick={onShowMoreBtnClicked}>
            Lebih Banyak
          </LoadingButton>
        </div>
      )}
    </div>
  );
};

export default Suppliers;
