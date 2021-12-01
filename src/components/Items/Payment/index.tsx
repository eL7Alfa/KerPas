import React, {
  ChangeEvent,
  Fragment,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerI } from '../../../redux/reducers';
import { setPaymentModalR } from '../../../redux/actions/appRActions';
import axios from '../../../config/axios';
import { ExpandMore, Payment as PaymentIcon } from '@mui/icons-material';
import Image from 'next/image';
import { paymentIconUrl } from '../../../config/urls';
import toRupiah from '../../../modules/toRupiah';

type PaymentPropsTypes = { confirmedCallback: () => void };

const Payment = ({ confirmedCallback = () => {} }: PaymentPropsTypes) => {
  const { appState, authState } = useSelector((state: rootReducerI) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [transaction, setTransaction] = useState<any>({});
  const [instruction, setInstruction] = useState<any>({});
  const [cardOwner, setCardOwner] = useState<string>('');
  const [pickedFileName, setPickedFileName] = useState<string>('');

  const onPickedFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files?.length ? setPickedFileName(e.target.files[0].name) : '';
  };

  const onConfirmPaymentBtnClicked = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authState.userData.id) {
      const formData = new FormData(e.currentTarget);
      formData.append('cnmr_po', transaction.cnmr_po);
      formData.append('ckode_user', authState.userData.ckode_user);
      axios(authState.userData.token)
        .post('market/payment/upload', formData)
        .then(({ data: { response } }) => {
          if (response === 200) {
            confirmedCallback();
            onClose();
          }
        });
    }
  };

  const getPaymentInstruction = (paymentId: number) => {
    axios(authState.userData.token)
      .post('/payment/instruction', {
        payment_id: paymentId,
      })
      .then(({ data: { result, response, error } }) => {
        if (response === 200 && !error) {
          setInstruction(result[0]);
        }
      });
  };

  const getTransactionDetail = () => {
    axios(authState.userData.token)
      .post('/market/transactions/detail', {
        ckode_user: authState.userData.ckode_user,
        cnmr_po: appState.paymentModal.transactionCode,
      })
      .then(({ data: { result, response, error } }) => {
        if (response === 200 && !error) {
          const newTransaction = result[0];
          setTransaction(newTransaction);
          getPaymentInstruction(newTransaction.cpmethod_id);
        }
      });
  };

  const onClose = () => {
    dispatch(setPaymentModalR({ open: false, transactionCode: '' }));
  };

  useEffect(() => {
    setOpen(appState.paymentModal.open);
    setPickedFileName('');
    if (appState.paymentModal.open) {
      getTransactionDetail();
    }
  }, [appState.paymentModal.open]);

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

  return (
    <Modal {...{ open, onClose }} className={classes.root}>
      <Box className={classes.box}>
        {/*@ts-ignore*/}
        <Paper
          className={classes.paper}
          component={'form'}
          method={'POST'}
          encType={'multipart/form-data'}
          onSubmit={onConfirmPaymentBtnClicked}>
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
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant={'subtitle1'}>
                  Konfirmasi Pembayaran
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.bPaymentConfirmationDetails}>
                <TextField
                  label={'Nama Pemilik Rekening'}
                  name={'cnama_pengirim'}
                  value={cardOwner}
                  onChange={({ target: { value } }) => setCardOwner(value)}
                  className={classes.bCardOwnerInput}
                  autoFocus
                  required
                />
                <Button
                  variant={'contained'}
                  component={'label'}
                  className={classes.bPickFileBtn}>
                  Pilih Foto
                  <input
                    type="file"
                    hidden
                    accept={'image/*'}
                    onChange={onPickedFile}
                  />
                </Button>
                <Typography
                  variant={'body1'}
                  className={classes.bPickedFileName}>
                  {pickedFileName}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant={'subtitle1'}>
                  Instruksi Pembayaran
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  dangerouslySetInnerHTML={{
                    __html: `<div>${instruction.cinstruction}</div>`,
                  }}
                />
              </AccordionDetails>
            </Accordion>
          </div>
          <div className={classes.footer}>
            <Button
              variant={'contained'}
              className={classes.fConfirmPaymentBtn}
              type={'submit'}>
              KONFIRMASI PEMBAYARAN
            </Button>
          </div>
        </Paper>
      </Box>
    </Modal>
  );
};

export default Payment;
