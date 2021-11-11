import { Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useStyles from './styles';
import Market from '../Market';
import React, { Fragment } from 'react';
import { newMarkets } from '../../constants';

type MarketsProps = {
  name: string;
  data: any;
  onShowMoreBtnClicked: () => void;
  isLoading: boolean;
  isLastMarketsReached: boolean;
};

const Markets = ({
  name,
  data,
  onShowMoreBtnClicked,
  isLoading,
  isLastMarketsReached,
}: MarketsProps) => {
  const classes = useStyles();

  const serializedData = newMarkets(data);

  if (data.length === 0) {
    return <Fragment />;
  }

  return (
    <div className={classes.root}>
      <Typography variant={'h6'} className={classes.title} px={2}>
        {name}
      </Typography>
      <Grid container className={classes.itemsW} spacing={2} px={1}>
        {serializedData.map(
          (
            {
              marketId,
              marketName,
              marketCode,
              marketImg,
              distance,
              location,
              address,
            },
            key,
          ) => (
            <Grid key={key} item xs={6} sm={3} md={2} lg={2}>
              <Market
                {...{
                  marketId,
                  marketName,
                  marketCode,
                  marketImg,
                  distance,
                  location,
                  address,
                }}
              />
            </Grid>
          ),
        )}
      </Grid>
      {!isLastMarketsReached && (
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
