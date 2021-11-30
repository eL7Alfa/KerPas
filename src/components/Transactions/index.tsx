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
import { setDialogR, setPaymentModalR } from '../../redux/actions/appRActions';
import Payment from '../Items/Payment';
import { Close } from '@mui/icons-material';
import Dialog from '../Items/Dialog';

const Transactions = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { authState } = useSelector((state: rootReducerI) => state);
  const [transactions, setTransactions] = useState([]);
  const [transactionCodeToCancel, setTransactionCodeToCancel] = useState('');
  const [statusCode, setStatusCode] = useState('0');
  const statusCodes = [
    { code: '0', label: 'Checkout' },
    { code: '1', label: 'Terbayar' },
    { code: '2', label: 'Diproses' },
    { code: '9', label: 'Siap Kirim' },
    { code: '3', label: 'Dikirim' },
    { code: '4', label: 'Diterima' },
    { code: '5', label: 'Dibatalkan' },
  ];

  const onSidebarItemClicked = (value: string) => () => {
    setStatusCode(value);
    getTransaction(value);
  };

  const getTransaction = (statusCode = '0') => {
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

  const onPaymentBtnClicked = (transactionCode: string) => () => {
    dispatch(setPaymentModalR({ open: true, transactionCode }));
  };

  const onCancelPaymentBtnClicked = (transactionCode: string) => () => {
    if (authState.userData.id) {
      setTransactionCodeToCancel(transactionCode);
      dispatch(
        setDialogR({
          open: true,
          agreeBtnText: 'IYA',
          title: 'Batalkan Pesanan',
          body: `Apakah anda yakin ingin membatalkan pesanan dengan nomor invoice: ${transactionCode}`,
        }),
      );
    }
  };

  const onConfirmCancelPaymentBtnClicked = () => {
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
                    onClick={onSidebarItemClicked(sI.code)}
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
                  <ButtonBase className={classes.tWrapper}>
                    <div className={classes.tHeader}>
                      <Typography variant={'subtitle1'}>No. Invoice</Typography>
                      <Typography variant={'body1'}>{t.cnmr_po}</Typography>
                    </div>
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
                    </div>
                  </ButtonBase>
                  <div className={classes.tFooter}>
                    {t.cstatus === '0' ? (
                      t.cpayment_type.toUpperCase() !== 'EMONEY' &&
                      t.cpayment_type.toUpperCase() !== 'POINT' &&
                      t.cpayment_type.toUpperCase() !== 'COD' ? (
                        t.cpayment_type.toUpperCase() === 'TRANSFER_MANUAL' &&
                        t.cupload_bukti === '0' ? (
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
                        )
                      ) : (
                        t.cpayment_type.toUpperCase() === 'POINT' && (
                          <Typography
                            variant={'body2'}
                            className={classes.tFStatus}>
                            Menunggu konfirmasi admin
                          </Typography>
                        )
                      )
                    ) : (
                      <Button
                        variant={'contained'}
                        className={classes.tFPaymentBtn}>
                        Pesan Ulang
                      </Button>
                    )}
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <Payment />
      <Dialog agreeCallback={onConfirmCancelPaymentBtnClicked} />
    </Fragment>
  );
};

export default Transactions;
