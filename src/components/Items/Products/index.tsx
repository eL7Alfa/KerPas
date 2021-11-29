import { Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useStyles from './styles';
import Product from '../Product';
import React, { Fragment } from 'react';
import { ProductTypes } from '../../constants';

type ProductsPropsTypes = {
  name: string;
  data: ProductTypes[];
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

  return (
    <div className={classes.root}>
      <Typography variant={'h6'} className={classes.title} px={2}>
        {name}
      </Typography>
      {data.length !== 0 && (
        <Fragment>
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
        </Fragment>
      )}
    </div>
  );
};

export default Products;
