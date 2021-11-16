import React from 'react';
import { ProductTypes } from '../constants';
import useStyles from './styles';

export type ProductDetailsPropsTypes = {
  product: ProductTypes;
};

const ProductDetails = ({ product }: ProductDetailsPropsTypes) => {
  const classes = useStyles();
  return <div className={classes.root} />;
};

export default ProductDetails;
