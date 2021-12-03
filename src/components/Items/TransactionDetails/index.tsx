import React, { Fragment, useEffect, useState } from 'react';
import {
  Box,
  Divider,
  IconButton,
  Modal,
  Paper,
  Typography,
} from '@mui/material';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerI } from '../../../redux/reducers';
import { setTransactionDetailsModalR } from '../../../redux/actions/appRActions';
import axios from '../../../config/axios';
import { Close, ListAlt } from '@mui/icons-material';
import Image from 'next/image';
import { productImgUrl } from '../../../config/urls';
import toRupiah from '../../../modules/toRupiah';
import { grey, yellow } from '@mui/material/colors';
import Direction from '../Direction';

const TransactionDetails = () => {
  const { appState, authState } = useSelector((state: rootReducerI) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [transaction, setTransaction] = useState<any>({});
  const [courierLoc, setCourierLoc] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  const getTransactionDetail = () => {
    setTransaction({});
    axios(authState.userData.token)
      .post('/market/transactions/detail', {
        ckode_user: authState.userData.ckode_user,
        cnmr_po: appState.transactionDetails.transactionCode,
      })
      .then(({ data: { result, response, error } }) => {
        if (response === 200 && !error) {
          const newTransaction = result[0];
          setTransaction(newTransaction);
        }
      });
  };

  let getCourierLocInterval: any = null;
  const getCourierLoc = () => {
    setCourierLoc({ lat: 0, lng: 0 });
    axios(authState.userData.token)
      .post('/market/courier/location', {
        cnmr_po: appState.transactionDetails.transactionCode,
      })
      .then(({ data: { result, response, error } }) => {
        if (response === 200 && !error) {
          const newCourierLoc = {
            lat: Number(result.ccourier_lat),
            lng: Number(result.ccourier_lng),
          };
          setCourierLoc(newCourierLoc);
        }
      });

    getCourierLocInterval = setInterval(() => {
      axios(authState.userData.token)
        .post('/market/courier/location', {
          cnmr_po: appState.transactionDetails.transactionCode,
        })
        .then(({ data: { result, response, error } }) => {
          if (response === 200 && !error) {
            const newCourierLoc = {
              lat: Number(result.ccourier_lat),
              lng: Number(result.ccourier_lng),
            };
            setCourierLoc(newCourierLoc);
          }
        });
    }, 20000);
  };

  const onClose = () => {
    dispatch(setTransactionDetailsModalR({ open: false, transactionCode: '' }));
  };

  useEffect(() => {
    setOpen(appState.transactionDetails.open);
    if (appState.transactionDetails.open) {
      getTransactionDetail();
      getCourierLoc();
    } else {
      !!getCourierLocInterval && clearInterval(getCourierLocInterval);
    }
    return () => {
      !!getCourierLocInterval && clearInterval(getCourierLocInterval);
    };
  }, [appState.transactionDetails.open]);

  if (!Object.keys(transaction).length) {
    return <Fragment />;
  }

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
          (b.nharga_item - Math.floor(b.nharga_item * (b.ndiscamount / 100))) *
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

  const totalItems = transaction.details.reduce(
    (
      a: number,
      b: {
        nqty: number;
      },
    ) => {
      return a + Number(b.nqty);
    },
    0,
  );

  return (
    <Modal {...{ open, onClose }} className={classes.root}>
      <Box className={classes.box}>
        <Paper className={classes.paper}>
          <div className={classes.header}>
            <ListAlt className={classes.titleIcon} />
            <Typography variant={'h5'} className={classes.title}>
              Detail Transaksi
            </Typography>
            <IconButton className={classes.closeBtn} onClick={onClose}>
              <Close />
            </IconButton>
          </div>
          {transaction.cstatus === '3' && courierLoc.lat && (
            <Fragment>
              <Divider />
              <Direction
                origin={courierLoc}
                destination={{
                  lat: Number(transaction.address.shipping_address.dlat),
                  lng: Number(transaction.address.shipping_address.dlng),
                }}
                className={classes.mapW}
              />
            </Fragment>
          )}
          <Divider />
          <div className={classes.body}>
            <div className={classes.tBAddressInfo}>
              <Typography variant={'subtitle1'}>Alamat Pengiriman</Typography>
              <div className={classes.tBAItem}>
                <Typography
                  variant={'body1'}
                  fontWeight={800}
                  color={grey[900]}>
                  {transaction.address.shipping_address.cnama_alamat}
                </Typography>
                <Typography variant={'body2'} color={grey[900]}>
                  {transaction.address.shipping_address.calamat}
                </Typography>
              </div>
            </div>
            <Divider />
            <div className={classes.tBProductInfo}>
              <Typography variant={'subtitle1'}>Produk</Typography>
              {transaction.details.map((tD: any, key: number) => (
                <div key={key} className={classes.tBProductItem}>
                  <div className={classes.tBIImgW}>
                    <Image
                      src={`${productImgUrl}/${tD.cimg_top}`}
                      layout={'fill'}
                      placeholder={'blur'}
                      blurDataURL={`${productImgUrl}/${tD.cimg_top}`}
                      objectFit={'cover'}
                      alt={tD.cnama_produk}
                    />
                  </div>
                  <div className={classes.tBIInfo}>
                    <Typography variant={'body2'}>{tD.cnama_produk}</Typography>
                    <Typography variant={'body2'}>
                      {toRupiah(
                        tD.nharga_item -
                          Math.floor((tD.nharga_item * tD.ndiscamount) / 100),
                      )}
                    </Typography>
                    <Typography
                      variant={'body2'}>{`${tD.nqty} item`}</Typography>
                  </div>
                </div>
              ))}
            </div>
            <Divider />
            <div className={classes.tBItem}>
              <Typography variant={'body2'}>Total Item:</Typography>
              <Typography variant={'body2'}>{`${totalItems} item`}</Typography>
            </div>
            <div className={classes.tBItem}>
              <Typography variant={'body2'}>Sub Total Harga:</Typography>
              <Typography variant={'body2'}>
                {toRupiah(transaction.payment.nharga_produk)}
              </Typography>
            </div>
            <div className={classes.tBItem}>
              <Typography variant={'body2'}>Biaya Layanan:</Typography>
              <Typography variant={'body2'}>
                {toRupiah(transaction.payment.nbiaya_layanan)}
              </Typography>
            </div>
            <div className={classes.tBItem}>
              <Typography variant={'body2'}>Ongkos kirim:</Typography>
              <Typography variant={'body2'}>
                {toRupiah(transaction.shipping.nongkir)}
              </Typography>
            </div>
            {transaction.payment.cpayment_type.toUpperCase() ===
              'TRANSFER_MANUAL' && (
              <div className={classes.tBItem}>
                <Typography variant={'body2'}>Kode pembayaran:</Typography>
                <Typography variant={'body2'}>
                  {toRupiah(transaction.payment.nunique_code)}
                </Typography>
              </div>
            )}
            <div className={classes.tBItem}>
              <Typography variant={'body2'}>Metode Pembayaran:</Typography>
              <Typography variant={'body2'}>
                {transaction.payment.cbank}
              </Typography>
            </div>
            <div className={classes.tBItem}>
              <Typography variant={'body2'} fontWeight={800}>
                Total Harga:
              </Typography>
              <Typography
                variant={'body2'}
                fontWeight={800}
                color={yellow[900]}>
                {toRupiah(totalPay)}
              </Typography>
            </div>
          </div>
        </Paper>
      </Box>
    </Modal>
  );
};

export default TransactionDetails;
