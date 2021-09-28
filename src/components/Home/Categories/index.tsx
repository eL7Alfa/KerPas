import { Grid, Paper, Typography } from '@mui/material';
import useStyles from './styles';
import { AutoFixHigh, FlightOutlined } from '@mui/icons-material';
import Category, { CategoryProps } from './Category';
import { JSXElementConstructor, Key, ReactElement } from 'react';

type CategoriesProps = {
  data: CategoryProps[];
};

const Categories = ({ data }: CategoriesProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant={'h6'} className={classes.title} px={2}>
        Kategori
      </Typography>
      <div className={classes.itemsW}>
        {data.map((d, key) => (
          <Category key={key} imageUri={d.imageUri} name={d.name} url={d.url} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
