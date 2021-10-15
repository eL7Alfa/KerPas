import { Grid, Typography, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useStyles from './styles';
import Product, { ProductProps } from '../../Items/Product';
import React, { useState } from 'react';

type ProductsProps = {
  data: ProductProps[];
  onShowMoreBtnClicked: () => void;
  isLoading: boolean;
  isLastProductReached: boolean;
};

const Products = ({
  data,
  onShowMoreBtnClicked,
  isLoading,
  isLastProductReached,
}: ProductsProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const [listLoaded, setListLoaded] = useState({ state: false, height: 0 });

  return (
    <div className={classes.root}>
      <Typography variant={'h6'} className={classes.title} px={2}>
        Jelajah Pasar
      </Typography>
      <Grid container className={classes.itemsW} spacing={2} px={1}>
        {data.map((d, key) => (
          <Grid key={key} item xs={6} sm={3} md={2} lg={2}>
            <Product
              imageUri={d.imageUri}
              name={d.name}
              price={d.price}
              discount={d.discount}
              fixedPrice={d.fixedPrice}
              maxRequest={d.maxRequest}
              url={d.url}
            />
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
