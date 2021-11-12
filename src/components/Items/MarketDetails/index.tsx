import React, { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setMarketDetailsModalR } from '../../../redux/actions/appRActions';
import useStyles from './styles';
import { rootReducerI } from '../../../redux/reducers';

const MarketDetails = () => {
  const dispatch = useDispatch();
  const { appState } = useSelector((state: rootReducerI) => state);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const onClose = () => {
    dispatch(setMarketDetailsModalR({ open: false }));
  };

  useEffect(() => {
    setOpen(appState.marketDetailsModal.open);
  }, [appState.marketDetailsModal.open]);
  return (
    <Modal {...{ open, onClose }}>
      <div />
    </Modal>
  );
};

export default MarketDetails;
