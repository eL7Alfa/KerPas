import { Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useStyles from './styles';
import Product, { ProductProps } from '../Product';
import React, { Fragment } from 'react';

type ProductsPropsTypes = {
  name: string;
  data: ProductProps[];
  onShowMoreBtnClicked: () => void;
  isLoading: boolean;
  isLastProductReached: boolean;
};

const Products = ({
  name,
  data,
  onShowMoreBtnClicked,
  isLoading,
  isLastProductReached,
}: ProductsPropsTypes) => {
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
            <Product {...d} />
          </Grid>
        ))}
      </Grid>
      {!isLastProductReached && (
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

export default Products;
