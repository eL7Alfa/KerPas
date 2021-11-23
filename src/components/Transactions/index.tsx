import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { useSelector } from 'react-redux';
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

const Transactions = () => {
  const classes = useStyles();
  const { authState } = useSelector((state: rootReducerI) => state);
  const [transactions, setTransactions] = useState([]);
  const [statusCode, setStatusCode] = useState('0');
  const statusCodes = [
    { code: '0', label: 'Belum Bayar' },
    { code: '1', label: 'Terbayar' },
    { code: '2', label: 'Diproses' },
    { code: '9', label: 'Siap Kirim' },
    { code: '3', label: 'Dikirim' },
    { code: '4', label: 'Diterima' },
  ];

  const onSidebarItemClicked = (value: string) => () => {
    setStatusCode(value);
    getTransaction(value);
  };

  const getTransaction = (statusCode = '0') => {
    setTransactions([]);
    axios(authState.userData.token)
      .post('/market/transactions', {
        ckode_user: authState.userData.ckode_user,
        cstatus: statusCode,
      })
      .then(({ data: { result, response, error } }) => {
        if (response === 200 && !error) {
          console.log(result);
          setTransactions(result);
        }
      })
      .catch(() => setTransactions([]));
  };

  useEffect(() => {
    if (authState.userData.id) {
      getTransaction();
    }
  }, [authState.userData]);

  return (
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
                    <div className={classes.tBItem}>
                      <Typography variant={'body2'}>Jumlah:</Typography>
                      <Typography variant={'body2'}>
                        {t.details.nqty}
                      </Typography>
                    </div>
                    <div className={classes.tBItem}>
                      <Typography variant={'body2'}>
                        Sub Total Harga:
                      </Typography>
                      <Typography variant={'body2'}>
                        {toRupiah(t.details.nharga_total)}
                      </Typography>
                    </div>
                    <div className={classes.tBItem}>
                      <Typography variant={'body2'}>Total Harga:</Typography>
                      <Typography variant={'body2'}>
                        {toRupiah(t.namount)}
                      </Typography>
                    </div>
                    {t.cstatus === '0' && (
                      <div className={classes.tBItem}>
                        <Typography variant={'body2'}>
                          Bayar sebelum:
                        </Typography>
                        <Typography variant={'body2'}>
                          {t.payment_expired}
                        </Typography>
                      </div>
                    )}
                  </div>
                </ButtonBase>
                <div className={classes.tFooter}>
                  {t.cstatus === '0' && (
                    <Button variant={'text'} className={classes.tFPaymentBtn}>
                      Pembayaran
                    </Button>
                  )}
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Transactions;
