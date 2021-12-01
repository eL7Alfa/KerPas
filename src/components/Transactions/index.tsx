import React, { Fragment, useEffect, useState } from 'react';
import axios from '../../config/axios';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerI } from '../../redux/reducers';
import useStyles from './styles';
import {
  Button,
  ButtonBase,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import toRupiah from '../../modules/toRupiah';
import Image from 'next/image';
import { productImgUrl } from '../../config/urls';
import {
  setDialogR,
  setInvoiceModalR,
  setPaymentModalR,
} from '../../redux/actions/appRActions';
import { Call, Close } from '@mui/icons-material';
import Payment from '../Items/Payment';
import Dialog from '../Items/Dialog';
import Invoice from '../Items/Invoice';

const Transactions = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { authState } = useSelector((state: rootReducerI) => state);
  const [transactions, setTransactions] = useState([]);
  const [transactionCodeToCancel, setTransactionCodeToCancel] = useState('');
  const [dialogName, setDialogName] = useState('');
  type statusCodeTypes = 'all' | '0' | '1' | '2' | '3' | '4' | '5' | '9';
  const [statusCode, setStatusCode] = useState<statusCodeTypes>('all');
  const statusCodes = [
    { code: 'all', label: 'Semua Transaksi', name: 'semuaTransaksi' },
    { code: '0', label: 'Checkout', name: 'checkout' },
    { code: '1', label: 'Terbayar / Dikonfirmasi', name: 'terbayar' },
    { code: '2', label: 'Diproses', name: 'diproses' },
    { code: '9', label: 'Siap Kirim', name: 'siapKirim' },
    { code: '3', label: 'Dikirim', name: 'dikirim' },
    { code: '4', label: 'Diterima', name: 'diterima' },
    { code: '5', label: 'Dibatalkan', name: 'dibatalkan' },
  ];

  const onSidebarItemClicked =
    (value: statusCodeTypes = '0') =>
    () => {
      setStatusCode(value);
      getTransaction(value);
    };

  const getTransaction = (statusCode: statusCodeTypes = 'all') => {
    setStatusCode(statusCode);
    setTransactions([]);
    if (authState.userData.id) {
      axios(authState.userData.token)
        .post('/market/transactions', {
          ckode_user: authState.userData.ckode_user,
          cstatus: statusCode,
        })
        .then(({ data: { result, response, error } }) => {
          if (response === 200 && !error) {
            setTransactions(result);
          }
        })
        .catch(() => setTransactions([]));
    }
  };

  const onShowInvoiceBtnClicked = (transactionCode: string) => () => {
    dispatch(setInvoiceModalR({ open: true, transactionCode }));
  };

  const onPaymentBtnClicked = (transactionCode: string) => () => {
    dispatch(setPaymentModalR({ open: true, transactionCode }));
  };

  const onPaymentConfirmed = () => {
    getTransaction(statusCode);
  };

  const onCancelPaymentBtnClicked = (transactionCode: string) => () => {
    if (authState.userData.id) {
      setDialogName('cancelOrder');
      setTransactionCodeToCancel(transactionCode);
      dispatch(
        setDialogR({
          open: true,
          agreeBtnText: 'IYA',
          disagreeBtnText: 'TIDAK',
          title: 'Batalkan Pesanan',
          body: `Apakah anda yakin ingin membatalkan pesanan dengan nomor invoice: ${transactionCode}`,
        }),
      );
    }
  };

  const onCancelAgreed = () => {
    axios(authState.userData.token)
      .post('/market/transactions/cancel', {
        ckode_user: authState.userData.ckode_user,
        cnmr_po: transactionCodeToCancel,
      })
      .then(({ data: { response, error } }) => {
        if (response === 200 && !error) {
          getTransaction(statusCode);
        }
      })
      .catch(() => setTransactions([]));
  };

  const onReorderBtnClicked = (transactionCode: string) => () => {
    if (authState.userData.id) {
      setDialogName('reorder');
      setTransactionCodeToCancel(transactionCode);
      dispatch(
        setDialogR({
          open: true,
          agreeBtnText: 'OK',
          // disagreeBtnText: 'TIDAK',
          title: 'Pesan Ulang',
          // body: 'Apakah anda yakin ingin memesan ulang?',
          body: 'Maaf, sedang dalam pengembangan.',
        }),
      );
    }
  };

  const onReorderAgreed = () => {
    // axios(authState.userData.token)
    //   .post('/market/transactions/cancel', {
    //     ckode_user: authState.userData.ckode_user,
    //     cnmr_po: transactionCodeToCancel,
    //   })
    //   .then(({ data: { response, error } }) => {
    //     if (response === 200 && !error) {
    //       setStatusCode('0');
    //     }
    //   })
    //   .catch(() => setTransactions([]));
  };

  const onConfirmBtnClicked = () => {
    switch (dialogName) {
      case 'cancelOrder': {
        onCancelAgreed();
        break;
      }
      case 'reorder': {
        onReorderAgreed();
        break;
      }
      default: {
        return;
      }
    }
  };

  useEffect(() => {
    getTransaction();
  }, [authState.userData]);

  return (
    <Fragment>
      <div className={classes.root}>
        <div className={classes.sidebar}>
          <div className={classes.sBItem}>
            <Typography variant={'h6'} className={classes.sBITitle}>
              Status Transaksi
            </Typography>
            <div className={classes.sBISubW}>
              {statusCodes.map((sI, key) => (
                <div key={key} className={classes.sBISubBtnW}>
                  <Button
                    variant={'contained'}
                    onClick={onSidebarItemClicked(sI.code as statusCodeTypes)}
                    className={`${classes.sBISubBtn} ${
                      sI.code === statusCode ? 'active' : ''
                    }`}>
                    {sI.label}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={classes.transactions}>
          <Typography variant={'h6'} className={classes.tTitle}>
            Transaksi
          </Typography>
          <Grid container spacing={2}>
            {transactions.map((t: any, key) => (
              <Grid key={key} item xs={12} sm={12} md={6}>
                <Paper className={classes.tContainer}>
                  <ButtonBase
                    className={classes.tHeader}
                    onClick={onShowInvoiceBtnClicked(t.cnmr_po)}>
                    <Typography variant={'subtitle1'}>No. Invoice</Typography>
                    <Typography
                      variant={'body1'}
                      className={classes.tHNoInvoice}>
                      {t.cnmr_po}
                    </Typography>
                  </ButtonBase>
                  <ButtonBase className={classes.tWrapper}>
                    <Divider sx={{ mx: 1 }} />
                    <div className={classes.tBody}>
                      <div className={classes.tBItem}>
                        <Typography variant={'body2'}>
                          Tanggal transaksi:
                        </Typography>
                        <Typography variant={'body2'}>{t.dtgl_po}</Typography>
                      </div>
                      <div className={classes.tBItem}>
                        <Typography variant={'body2'}>Pasar:</Typography>
                        <Typography variant={'body2'}>
                          {t.mitra.cnama_mitra}
                        </Typography>
                      </div>
                      <div className={classes.tBSampleItem}>
                        <div className={classes.tBSIImgW}>
                          <Image
                            src={`${productImgUrl}/${t.details.cimg_top}`}
                            layout={'fill'}
                            placeholder={'blur'}
                            blurDataURL={`${productImgUrl}/${t.details.cimg_top}`}
                            objectFit={'cover'}
                            alt={t.details.cnama_produk}
                          />
                        </div>
                        <div className={classes.tBSIInfo}>
                          <Typography variant={'body2'}>
                            {t.details.cnama_produk}
                          </Typography>
                          <Typography variant={'body2'}>
                            {toRupiah(
                              t.details.nharga_total -
                                t.details.ndiscount_total,
                            )}
                          </Typography>
                          <Typography variant={'body2'}>
                            {`${t.details.nqty} item`}
                          </Typography>
                        </div>
                      </div>
                      <div className={classes.tBItem}>
                        <Typography variant={'body2'}>Total Item:</Typography>
                        <Typography variant={'body2'}>
                          {`${t.ntotal_qty} item`}
                        </Typography>
                      </div>
                      <div className={classes.tBItem}>
                        <Typography variant={'body2'}>Total Harga:</Typography>
                        <Typography variant={'body2'}>
                          {toRupiah(t.namount)}
                        </Typography>
                      </div>
                      {t.cstatus === '0' &&
                        t.cpayment_type.toUpperCase() === 'TRANSFER_MANUAL' && (
                          <div className={classes.tBItem}>
                            <Typography variant={'body2'}>
                              Bayar sebelum:
                            </Typography>
                            <Typography variant={'body2'}>
                              {t.payment_expired}
                            </Typography>
                          </div>
                        )}
                      {t.cstatus !== '0' && (
                        <div className={classes.tBItem}>
                          <Typography variant={'body2'}>Kurir:</Typography>
                          <Typography variant={'body2'}>
                            {t.courier.cnama}
                          </Typography>
                        </div>
                      )}
                      <div className={classes.tBItem}>
                        <Typography variant={'body2'}>
                          Metode Pembayaran:
                        </Typography>
                        <Typography variant={'body2'}>
                          {t.payment_method.cbank}
                        </Typography>
                      </div>
                      <div className={classes.tBItem}>
                        <Typography variant={'body2'}>
                          Status Transaksi:
                        </Typography>
                        <Typography
                          variant={'body2'}
                          className={`${classes.tBIStatus} ${
                            statusCodes.filter(sC => sC.code === t.cstatus)[0]
                              .name
                          }`}>
                          {
                            statusCodes.filter(sC => sC.code === t.cstatus)[0]
                              .label
                          }
                        </Typography>
                      </div>
                    </div>
                  </ButtonBase>
                  <div className={classes.tFooter}>
                    {t.cstatus === '0' ? (
                      <Fragment>
                        {t.cpayment_type.toUpperCase() === 'TRANSFER_MANUAL' &&
                          (t.cupload_bukti === '0' ? (
                            <Fragment>
                              <Button
                                variant={'contained'}
                                className={classes.tFCancelPaymentBtn}
                                onClick={onCancelPaymentBtnClicked(t.cnmr_po)}>
                                <Close /> BATAL
                              </Button>
                              <Button
                                variant={'contained'}
                                className={classes.tFPaymentBtn}
                                onClick={onPaymentBtnClicked(t.cnmr_po)}>
                                Pembayaran
                              </Button>
                            </Fragment>
                          ) : (
                            <Typography
                              variant={'body2'}
                              className={classes.tFStatus}>
                              Menunggu konfirmasi admin
                            </Typography>
                          ))}
                        {t.cpayment_type.toUpperCase() === 'POINT' && (
                          <Typography
                            variant={'body2'}
                            className={classes.tFStatus}>
                            Menunggu konfirmasi admin
                          </Typography>
                        )}
                        {t.cpayment_type.toUpperCase() === 'EMONEY' && (
                          <Button
                            variant={'contained'}
                            className={classes.tFCancelPaymentBtn}
                            onClick={onCancelPaymentBtnClicked(t.cnmr_po)}>
                            <Close /> BATAL
                          </Button>
                        )}
                        {t.cpayment_type.toUpperCase() === 'COD' && (
                          <Fragment>
                            <Button
                              variant={'contained'}
                              className={classes.tFCancelPaymentBtn}
                              onClick={onCancelPaymentBtnClicked(t.cnmr_po)}>
                              <Close /> BATAL
                            </Button>
                            <Typography
                              variant={'body2'}
                              className={classes.tFStatus}>
                              Menunggu konfirmasi admin
                            </Typography>
                          </Fragment>
                        )}
                      </Fragment>
                    ) : (
                      <Fragment>
                        {t.cpayment_type.toUpperCase() === 'COD' &&
                          t.cstatus === '1' && (
                            <Button
                              variant={'contained'}
                              className={classes.tFCancelPaymentBtn}
                              onClick={onCancelPaymentBtnClicked(t.cnmr_po)}>
                              <Close /> BATAL
                            </Button>
                          )}
                        {t.cstatus === '4' && (
                          <Button
                            variant={'contained'}
                            className={classes.tFReorderBtn}
                            onClick={onReorderBtnClicked(t.cnmr_po)}>
                            Pesan Ulang
                          </Button>
                        )}
                        {t.cstatus === '2' &&
                          t.cstatus === '3' &&
                          t.cstatus === '4' &&
                          t.cstatus === '9' && (
                            <Button
                              variant={'contained'}
                              className={classes.tFCallCourierBtn}
                              href={'tel:082191732180'}>
                              <Call /> Telepon Kurir
                            </Button>
                          )}
                      </Fragment>
                    )}
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <Payment confirmedCallback={onPaymentConfirmed} />
      <Dialog agreeCallback={onConfirmBtnClicked} />
      <Invoice />
    </Fragment>
  );
};

export default Transactions;
