import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { useSelector } from 'react-redux';
import { rootReducerI } from '../../redux/reducers';
import useStyles from './styles';
import { Button, Typography } from '@mui/material';

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
    getTransaction();
  };

  const getTransaction = () => {
    axios(authState.userData.token)
      .post('/market/transactions', {
        ckode_user: authState.userData.ckode_user,
        cstatus: statusCode,
      })
      .then(({ data }) => {
        console.log(data);
      });
  };

  useEffect(() => {
    if (authState.userData.id) {
      getTransaction();
    }
  }, [authState.userData]);

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <div className={classes.subItem}>
          <Typography variant={'h6'} className={classes.subItemTitle}>
            Status Transaksi
          </Typography>
          {statusCodes.map((sI, key) => (
            <div key={key} className={classes.sbItemW}>
              <Button
                variant={'contained'}
                onClick={onSidebarItemClicked(sI.code)}
                className={`${classes.sidebarItemBtn} ${
                  sI.code === statusCode ? 'active' : ''
                }`}>
                {sI.label}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
