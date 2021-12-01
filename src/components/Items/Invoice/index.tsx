import React, { useEffect, useState } from 'react';
import { Box, IconButton, Modal, Paper, Typography } from '@mui/material';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerI } from '../../../redux/reducers';
import { resetInvoiceModalR } from '../../../redux/actions/appRActions';
import { Close, FeaturedPlayList } from '@mui/icons-material';

const Invoice = () => {
  const { appState } = useSelector((state: rootReducerI) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [html, setHtml] = useState<string>('');

  const onClose = () => {
    dispatch(resetInvoiceModalR());
  };

  useEffect(() => {
    setOpen(appState.invoice.open);
    if (appState.invoice.open) {
      setHtml(
        `<object
          type='text/html'
          data='https://keranjangbelanja.co.id/invoice-kerpas/${appState.invoice.transactionCode}'
          height="100%"
          onload="console.clear()"
        />`,
      );
    }
  }, [appState.invoice.open]);

  return (
    <Modal {...{ open, onClose }} className={classes.root}>
      <Box className={classes.box}>
        <Paper className={classes.paper}>
          <div className={classes.header}>
            <FeaturedPlayList className={classes.titleIcon} />
            <Typography variant={'h5'} className={classes.title}>
              Invoice
            </Typography>
            <IconButton className={classes.closeBtn} onClick={onClose}>
              <Close />
            </IconButton>
          </div>
          <div
            className={classes.body}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Paper>
      </Box>
    </Modal>
  );
};

export default Invoice;
