import { Grid, Typography } from '@mui/material';
import useStyles from './styles';
import Product, { ProductProps } from '../../Items/Product';
import React, { Fragment } from 'react';

type ProductsByCategoryProps = {
  category: { id: number; name: string };
  data: ProductProps[];
};

const ProductsByCategory = ({ category, data }: ProductsByCategoryProps) => {
  const classes = useStyles();

  if (data.length === 0) {
    return <Fragment />;
  }

  return (
    <div className={classes.root}>
      <Typography variant={'h6'} className={classes.title} px={2}>
        {category.name}
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
              url={d.url}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductsByCategory;
