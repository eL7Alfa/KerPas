import React, { useEffect, useState } from 'react';
import { IconButton, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setMarketDetailsModalR } from '../../../redux/actions/appRActions';
import useStyles from './styles';
import { rootReducerI } from '../../../redux/reducers';
import Image from 'next/image';
import { Close } from '@mui/icons-material';

const MarketDetails = () => {
  const dispatch = useDispatch();
  const { appState } = useSelector((state: rootReducerI) => state);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const initialData = {
    address: '',
    distance: { text: '', value: 0 },
    location: '',
    marketImg: '',
    marketName: '',
    description: '',
  };
  const [data, setData] = useState<{
    marketImg: string;
    marketName: string;
    address: string;
    distance: { text: string; value: number };
    location: string;
    description: string;
  }>(initialData);

  const onClose = () => {
    dispatch(setMarketDetailsModalR({ open: false, ...initialData }));
  };

  useEffect(() => {
    setOpen(appState.marketDetailsModal.open);
    if (appState.marketDetailsModal.open) {
      const { open, ...restData } = appState.marketDetailsModal;
      setData(restData);
    }
  }, [appState.marketDetailsModal.open]);
  return (
    <Modal {...{ open, onClose }} className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Image
            alt={data.marketName}
            src={data.marketImg}
            layout={'fill'}
            placeholder={'blur'}
            blurDataURL={data.marketImg}
          />
        </div>
        <div
          className={classes.body}
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
        <IconButton className={classes.closeBtn} onClick={onClose}>
          <Close />
        </IconButton>
      </div>
    </Modal>
  );
};

export default MarketDetails;
