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
          {settings.ajam_tersedia.map((jT: string, key: number) => (
            <Button
              key={key}
              variant={'contained'}
              className={`${classes.pickerBtn} ${
                currentShippingTime === jT ? 'active' : ''
              }`}
              onClick={onChange(jT)}>
              {jT}
            </Button>
          ))}
          {settings.cstatus_jam === '2' && (
            <Typography variant={'body2'} className={classes.noItemInfo}>
              Maaf pengantaran hari ini sudah selesai.
            </Typography>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default ShippingTimePicker;
