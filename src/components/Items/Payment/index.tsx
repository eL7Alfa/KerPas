import React, { useEffect, useState } from 'react';
import { Box, Modal, Paper } from '@mui/material';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerI } from '../../../redux/reducers';
import { setPaymentModalR } from '../../../redux/actions/appRActions';

const Payment = () => {
  const { appState } = useSelector((state: rootReducerI) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const onClose = () => {
    dispatch(setPaymentModalR({ open: false }));
  };

  useEffect(() => {
    setOpen(appState.paymentModal.open);
  }, [appState.paymentModal.open]);

  return (
    <Modal {...{ open, onClose }}>
      <Box className={classes.box}>
        <Paper className={classes.paper}></Paper>
      </Box>
    </Modal>
  );
};

export default Payment;
