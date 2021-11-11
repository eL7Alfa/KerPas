import { Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useStyles from './styles';
import Market, { MarketPropsTypes } from '../Market';
import React, { Fragment } from 'react';

type MarketsPropsTypes = {
  name: string;
  data: MarketPropsTypes[];
  onShowMoreBtnClicked?: () => void;
  isLoading: boolean;
  isLastMarketsReached?: boolean;
};

const Markets = ({
  name,
  data,
  onShowMoreBtnClicked,
  isLoading,
  isLastMarketsReached,
}: MarketsPropsTypes) => {
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
          <Grid key={key} item xs={12} sm={12} md={6} lg={6}>
            <Market {...d} />
          </Grid>
        ))}
      </Grid>
      {!!onShowMoreBtnClicked && !isLastMarketsReached && (
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

export default Markets;
