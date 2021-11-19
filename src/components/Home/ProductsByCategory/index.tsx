import { Button, Grid, Typography } from '@mui/material';
import useStyles from './styles';
import Product from '../../Items/Product';
import React, { Fragment } from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { ProductTypes } from '../../constants';

type ProductsByCategoryProps = {
  category: { id: number; name: string };
  data: ProductTypes[];
};

const ProductsByCategory = ({ category, data }: ProductsByCategoryProps) => {
  const classes = useStyles();
  const router = useRouter();

  const onShowMoreBtnClicked = () => {
    router.push(`/category/${category.id}`);
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
            <Product {...d} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductsByCategory;
