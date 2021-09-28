import { Grid, Paper } from '@mui/material';
import useStyles from './styles';
import { AutoFixHigh, FlightOutlined } from '@mui/icons-material';
import FeaturedItem, { FeaturedItemProps } from './FeaturedItem';
import { JSXElementConstructor, Key, ReactElement } from 'react';

type FeaturedServicesProps = {
  data: FeaturedItemProps[];
};

const FeaturedServices = ({ data }: FeaturedServicesProps) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2} my={2} px={2}>
      {data.map((d, key) => (
        <Grid
          key={key}
          item
          lg={3}
          xs={6}
          className={classes.gridItem}>
          <FeaturedItem
            icon={d.icon}
            iconBgColor={d.iconBgColor}
            subtitle={d.subtitle}
            title={d.title}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default FeaturedServices;
