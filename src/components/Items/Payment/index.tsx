import React, { Fragment, useEffect, useState } from 'react';
import { Box, Modal, Paper, Typography } from '@mui/material';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerI } from '../../../redux/reducers';
import { setPaymentModalR } from '../../../redux/actions/appRActions';
import axios from '../../../config/axios';
import { Payment as PaymentIcon } from '@mui/icons-material';
import Image from 'next/image';
import { paymentIconUrl } from '../../../config/urls';
import toRupiah from '../../../modules/toRupiah';

const Payment = () => {
  const { appState, authState } = useSelector((state: rootReducerI) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [transaction, setTransaction] = useState<any>({});
  const totalPay =
    transaction.details.reduce(
      (
        a: number,
        b: {
          nharga_item: number;
          ndiscamount: number;
          nqty: number;
        },
      ) => {
        return (
          a +
          Math.floor(b.nharga_item - b.nharga_item * (b.ndiscamount / 100)) *
            Number(b.nqty)
        );
      },
      0,
    ) +
    transaction.shipping.nongkir +
    transaction.payment.nbiaya_layanan +
    (transaction.payment.cpayment_type.toUpperCase() === 'TRANSFER_MANUAL'
      ? transaction.payment.nunique_code
      : 0);

  const getTransactionDetail = () => {
    axios(authState.userData.token)
      .post('/market/transactions/detail', {
        ckode_user: authState.userData.ckode_user,
        cnmr_po: appState.paymentModal.transactionCode,
      })
      .then(({ data: { result, response, error } }) => {
        setTransaction(result[0]);
      });
  };

  const onClose = () => {
    dispatch(setPaymentModalR({ open: false, transactionCode: '' }));
  };

  useEffect(() => {
    setOpen(appState.paymentModal.open);
    if (appState.paymentModal.open) {
      getTransactionDetail();
    }
  }, [appState.paymentModal.open]);

  if (!Object.keys(transaction).length) {
    return <Fragment />;
  }

  return (
    <Modal {...{ open, onClose }}>
      <Box className={classes.box}>
        <Paper className={classes.paper}>
          <div className={classes.header}>
            <PaymentIcon className={classes.titleIcon} />
            <Typography variant={'h5'} className={classes.title}>
              Pembayaran
            </Typography>
          </div>
          <div className={classes.body}>
            <div className={classes.imgW}>
              <Image
                alt={transaction.payment.cbank}
                src={`${paymentIconUrl}/${transaction.payment.cicon}`}
                layout={'fill'}
                placeholder={'blur'}
                blurDataURL={`${paymentIconUrl}/${transaction.payment.cicon}`}
              />
            </div>
            <div className={classes.bPaymentInfoW}>
              <Typography
                variant={'subtitle1'}
                className={classes.bPaymentInfoBankName}>
                Pembayaran Melalui {transaction.payment.cbank} Senilai
              </Typography>
            </div>
            <div className={classes.bPaymentInfoW}>
              <Typography
                variant={'body1'}
                className={classes.bPaymentInfoPrice}>
                {toRupiah(totalPay)}
              </Typography>
            </div>
            <div className={classes.bPaymentInfoW}>
              <Typography
                variant={'subtitle1'}
                className={classes.bPaymentInfoBankName}>
                Transfer Ke No Rekening
              </Typography>
            </div>
            <div className={classes.bPaymentInfoW}>
              <Typography
                variant={'body1'}
                className={classes.bPaymentInfoBankAccount}>
                {transaction.payment.cbank_account}
              </Typography>
            </div>
            <div className={classes.bPaymentInfoProvisionW}>
              <Typography
                variant={'body1'}
                className={classes.bPaymentInfoProvision}>
                (BAYAR SESUAI HARGA DI ATAS AGAR PROSES TRANSAKSI LANCAR)
              </Typography>
            </div>
          </div>
        </Paper>
      </Box>
    </Modal>
  );
};

export default Payment;
