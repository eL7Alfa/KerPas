import React, { Fragment, useEffect, useState } from 'react';
import useStyles from './styles';
import { Button, Divider, IconButton, Paper, Typography } from '@mui/material';
import axios from '../../../../config/axios';
import { useSelector } from 'react-redux';
import { rootReducerI } from '../../../../redux/reducers';
import Image from 'next/image';
import { Close } from '@mui/icons-material';

const PaymentMethodPicker = ({
  open,
  onClose,
  currentPaymentMethod,
  onChange,
  marketCode,
}: {
  open: boolean;
  onClose: () => void;
  currentPaymentMethod: {
    id?: number;
    name: string;
    code: string;
    icon: string;
    providerFee: number;
    method: string;
  };
  onChange: (paymentMethod: {
    id?: number;
    name: string;
    code: string;
    icon: string;
    providerFee: number;
    method: string;
  }) => () => void;
  marketCode: string;
}) => {
  const classes = useStyles();
  const { authState } = useSelector((state: rootReducerI) => state);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);

  const getPaymentMethod = () => {
    axios(authState.userData.token)
      .post('/payment/method', {
        ckode_user: authState.userData.ckode_user,
        ckode_mitra: marketCode,
        ccod: 0,
      })
      .then(({ data: { result, response } }) => {
        if (response === 200) {
          setPaymentMethods(result);
        }
      });
  };

  useEffect(() => {
    if (authState.userData.token) {
      getPaymentMethod();
    }
  }, [authState.userData.token]);

  if (!open) {
    return <Fragment />;
  }
  return (
    <div className={classes.root}>
      <div className={classes.backdrop} onClick={onClose} />
      <Paper className={classes.container}>
        <div className={classes.header}>
          <Typography variant={'subtitle1'} className={classes.hTitle}>
            Metode Pembayaran
          </Typography>
          <IconButton className={classes.closeAuthBtn} onClick={onClose}>
            <Close />
          </IconButton>
        </div>
        <Divider sx={{ mx: 1 }} />
        <div className={classes.body}>
          {paymentMethods.map((pM, key) => {
            if (
              pM.cpayment_method.toUpperCase() === 'SAKU' &&
              pM.data[0].cbank.toUpperCase() === 'RP. 0'
            ) {
              return <Fragment key={key} />;
            }
            return (
              <div key={key}>
                <Typography variant={'subtitle1'} className={classes.subTitle}>
                  {pM.cname}
                </Typography>
                {pM.data.map((pMD: any, key: number) => (
                  <Button
                    key={key}
                    variant={'contained'}
                    className={`${classes.pickerBtn} ${
                      currentPaymentMethod.code === pMD.cbank_code
                        ? 'active'
                        : ''
                    }`}
                    onClick={onChange({
                      id: pMD.id,
                      name: pMD.cbank,
                      code: pMD.cbank_code,
                      icon: pMD.cicon,
                      providerFee: pMD.nprovider_fee,
                      method: pM.cpayment_method,
                    })}>
                    <div className={classes.pBContainer}>
                      <div className={classes.pBIcon}>
                        <Image
                          src={`https://kbi.sfo3.digitaloceanspaces.com/api/icon/payment/${pMD.cicon}`}
                          alt={pMD.cbank}
                          placeholder={'blur'}
                          blurDataURL={`https://kbi.sfo3.digitaloceanspaces.com/api/icon/payment/${pMD.cicon}`}
                          layout={'fill'}
                          objectFit={'cover'}
                        />
                      </div>
                      <Typography variant={'body1'} className={classes.pBLabel}>
                        {pMD.cbank}
                      </Typography>
                    </div>
                  </Button>
                ))}
              </div>
            );
          })}
        </div>
      </Paper>
    </div>
  );
};

export default PaymentMethodPicker;
