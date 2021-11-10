import { Button, Grid, Typography } from '@mui/material';
import useStyles from './styles';
import Product, { ProductProps } from '../../Items/Product';
import React, { Fragment } from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useRouter } from 'next/router';

type ProductsByCategoryProps = {
  category: { id: number; name: string };
  data: ProductProps[];
};

const ProductsByCategory = ({ category, data }: ProductsByCategoryProps) => {
  const classes = useStyles();
  const router = useRouter();

  const onShowMoreBtnClicked = () => {
    router.push(`/category/${category.id}/?name=${category.name}`);
  };

  if (data.length === 0) {
    return <Fragment />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant={'h6'} className={classes.title}>
          {category.name}
        </Typography>
        <Button
          variant={'text'}
          onClick={onShowMoreBtnClicked}
          className={classes.showMoreBtn}>
          Lihat Semua
          <KeyboardArrowDown
            fontSize={'small'}
            className={classes.showMoreArrowDown}
          />
        </Button>
      </div>
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
