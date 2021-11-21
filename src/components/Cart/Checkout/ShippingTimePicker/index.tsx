import React, { Fragment } from 'react';
import useStyles from './styles';
import { Button, Paper, Typography } from '@mui/material';

const ShippingTimePicker = ({
  open,
  onClose,
  settings,
  currentShippingTime,
  onChange,
}: {
  open: boolean;
  onClose: () => void;
  settings: any;
  currentShippingTime: string;
  onChange: (shippingTime: string) => () => void;
}) => {
  const classes = useStyles();

  if (!open || !settings.id) {
    return <Fragment />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.backdrop} onClick={onClose} />
      <Paper className={classes.container}>
        <div className={classes.header}>
          <Typography variant={'subtitle1'} className={classes.hTitle}>
            Waktu Pengantaran
          </Typography>
        </div>
        <div className={classes.body}>
          <Button
            variant={'contained'}
            className={`${classes.pickerBtn} ${
              currentShippingTime === settings.ctrip_reguler_1 ? 'active' : ''
            }`}
            onClick={onChange(settings.ctrip_reguler_1)}>
            {settings.ctrip_reguler_1}
          </Button>
          <Button
            variant={'contained'}
            className={`${classes.pickerBtn} ${
              currentShippingTime === settings.ctrip_reguler_2 ? 'active' : ''
            }`}
            onClick={onChange(settings.ctrip_reguler_2)}>
            {settings.ctrip_reguler_2}
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default ShippingTimePicker;
