import React, { ChangeEvent, useEffect, useState } from 'react';
import useStyles from './styles';
import { Edit, Payment } from '@mui/icons-material';
import {
  Button,
  Divider,
  InputAdornment,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { CartProductTypes, useSnackbarConst } from '../../constants';
import toRupiah from '../../../modules/toRupiah';
import ShippingTimePicker from './ShippingTimePicker';
import axios from '../../../config/axios';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerI } from '../../../redux/reducers';
import PaymentMethodPicker from './PaymentMethodPicker';
import mathRandomRange from '../../../modules/mathRandomRange';
import {
  LoadingButton,
  LocalizationProvider,
  MobileDatePicker,
} from '@mui/lab';
import { triggerCartUpdateR } from '../../../redux/actions/appRActions';
import Snackbar from '../../../smallComponents/Snackbar';
import { useRouter } from 'next/router';
import moment, { Moment } from 'moment';
import DateAdapter from '@mui/lab/AdapterMoment';

const CheckOut = ({ cartProducts }: { cartProducts: CartProductTypes[] }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const { appState, authState } = useSelector((state: rootReducerI) => state);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [paymentCode, setPaymentCode] = useState(0);
  const [usePointEnabled, setUsePointEnabled] = useState(true);
  const [wallet, setWallet] = useState({
    nsaku_kerbel: 0,
    npoint_kerbel: 0,
    cicon: '',
    cicon_point: '',
  });
  const [settings, setSettings] = useState({
    id: undefined,
    nongkir: 0,
    nmax_berat: 0,
    nmax_amount_po_cod: 0,
    nmax_amount_po_non_cod: 0,
  });
  const [shippingTimePickerOpen, setShippingTimePickerOpen] = useState(false);
  const [currentPaymentMethodPickerOpen, setCurrentPaymentMethodPickerOpen] =
    useState(false);
  const [shippingDate, setShippingDate] = useState<Moment>(moment());
  const [currentShippingTime, setCurrentShippingTime] = useState('');
  const initialCurrentPaymentMethod = {
    id: undefined,
    method: '',
    code: '',
    icon: '',
    name: '',
    providerFee: 0,
  };
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState<{
    id?: number;
    name: string;
    code: string;
    icon: string;
    providerFee: number;
    method: string;
  }>(initialCurrentPaymentMethod);
  const [isOrdering, setIsOrdering] = useState(false);
  const [noteInputValue, setNoteInputValue] = useState('');
  const totalPay =
    Number(subTotalPrice) +
    Number(settings.nongkir) +
    Number(serviceFee) +
    Number(paymentCode);
  const { snackbarState, setSnackPack, onSnackbarClose } = useSnackbarConst();

  const onDatePicked = (value: Moment | null) => {
    setShippingDate(value!);
    cartProducts.length && getSettings({ date: value?.format('Y-MM-DD') });
  };

  const onShippingTimePickerClose = () => {
    setShippingTimePickerOpen(false);
  };

  const onShippingTimePickerBtnClicked = () => {
    setShippingTimePickerOpen(true);
  };

  const onPaymentMethodPickerClose = () => {
    setCurrentPaymentMethodPickerOpen(false);
  };

  const onPaymentMethodPickerBtnClicked = () => {
    setCurrentPaymentMethodPickerOpen(true);
  };

  const onShippingTimePickerChanged = (shippingTime: string) => () => {
    setCurrentShippingTime(shippingTime);
    setShippingTimePickerOpen(false);
  };

  const onPaymentMethodPickerChanged =
    ({
      id,
      name,
      code,
      icon,
      providerFee,
      method,
    }: {
      id?: number;
      name: string;
      code: string;
      icon: string;
      providerFee: number;
      method: string;
    }) =>
    () => {
      setCurrentPaymentMethod({
        id,
        name,
        code,
        icon,
        providerFee: Number(providerFee),
        method,
      });
      setCurrentPaymentMethodPickerOpen(false);
      setServiceFee(providerFee);
      if (method.toUpperCase() === 'BANK_TRANSFER') {
        setPaymentCode(mathRandomRange(100, 300));
      } else {
        if (method.toUpperCase() === 'KPCOD') {
          setUsePointEnabled(false);
        }
        setPaymentCode(0);
      }
    };

  const onUsePointBtnChange = () => {
    setUsePointEnabled(prevState => !prevState);
  };

  const onNoteInputChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNoteInputValue(value);
  };

  const onOrderBtnClicked = () => {
    if (!Object.keys(appState.selectedAddress).length) {
      setSnackPack(prev => [
        ...prev,
        {
          ...snackbarState,
          open: true,
          severity: 'error',
          msg: 'Silahkan pilih alamat pengiriman terlebih dahulu.',
          key: new Date().getTime(),
          anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        },
      ]);
      return;
    }
    if (!appState.nearestMarket.id) {
      setSnackPack(prev => [
        ...prev,
        {
          ...snackbarState,
          open: true,
          severity: 'error',
          msg: 'Market terdekat tidak ditemukan atau belum dalam jangkauan kami',
          key: new Date().getTime(),
          anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        },
      ]);
      return;
    }
    if (
      cartProducts.filter(
        cP => cP.marketCode !== appState.nearestMarket.ckode_mitra,
      ).length > 0
    ) {
      setSnackPack(prev => [
        ...prev,
        {
          ...snackbarState,
          open: true,
          severity: 'error',
          msg: 'Item di keranjang bukan dari market terdekat',
          key: new Date().getTime(),
          anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        },
      ]);
      return;
    }
    if (!currentShippingTime) {
      setSnackPack(prev => [
        ...prev,
        {
          ...snackbarState,
          open: true,
          severity: 'error',
          msg: 'Silahkan pilih waktu pengantaran terlebih dahulu',
          key: new Date().getTime(),
          anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        },
      ]);
      return;
    }
    if (!currentPaymentMethod.id && !usePointEnabled) {
      setSnackPack(prev => [
        ...prev,
        {
          ...snackbarState,
          open: true,
          severity: 'error',
          msg: 'Silahkan pilih metode pembayaran terlebih dahulu',
          key: new Date().getTime(),
          anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        },
      ]);
      return;
    }
    if (
      usePointEnabled &&
      Number(wallet.npoint_kerbel) < totalPay &&
      !currentPaymentMethod.id
    ) {
      setSnackPack(prev => [
        ...prev,
        {
          ...snackbarState,
          open: true,
          severity: 'error',
          msg: 'Silahkan pilih metode pembayaran terlebih dahulu',
          key: new Date().getTime(),
          anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        },
      ]);
      return;
    }
    if (currentPaymentMethod.method.toUpperCase() === 'KPCOD') {
      if (subTotalPrice > settings.nmax_amount_po_cod) {
        setSnackPack(prev => [
          ...prev,
          {
            ...snackbarState,
            open: true,
            severity: 'error',
            msg: `Sub total harga melebihi maksimal total harga ${toRupiah(
              settings.nmax_amount_po_cod,
            )}`,
            key: new Date().getTime(),
            anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
          },
        ]);
        return;
      }
    }
    if (subTotalPrice > settings.nmax_amount_po_non_cod) {
      setSnackPack(prev => [
        ...prev,
        {
          ...snackbarState,
          open: true,
          severity: 'error',
          msg: `Sub total harga melebihi maksimal total harga ${toRupiah(
            settings.nmax_amount_po_non_cod,
          )}`,
          key: new Date().getTime(),
          anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        },
      ]);
      return;
    }
    // if (totalWeight > settings.nmax_berat) {
    //   setSnackPack(prev => [
    //     ...prev,
    //     {
    //       ...snackbarState,
    //       open: true,
    //       severity: 'error',
    //       msg: `Berat melebihi batas maksimal ${settings.nmax_berat}gr`,
    //       key: new Date().getTime(),
    //     },
    //   ]);
    //   return;
    // }

    setIsOrdering(true);
    let postData = {
      ckode_user: authState.userData.ckode_user,
      cuser_address: appState.selectedAddress.id,
      cstore_location: appState.nearestMarket.cloc,
      nweight: totalWeight,
      nongkir: settings.nongkir,
      nservice:
        usePointEnabled && wallet.npoint_kerbel > totalPay
          ? 19
          : currentPaymentMethod.id,
      ua: 'W',
      nunique_code: paymentCode,
      npoint_kerbel:
        Number(wallet.npoint_kerbel) > 0 ? (usePointEnabled ? 1 : 0) : 0,
      ccod: 0,
      cinsurance: 0,
      ddelivery: currentShippingTime,
      cnote: noteInputValue,
    };
    axios(authState.userData.token)
      .post('/market/transaction', postData)
      .then(({ data: { response, result, error } }) => {
        if (!error && response === 200) {
          setCurrentShippingTime('');
          setTotalOrder(0);
          setServiceFee(0);
          setTotalWeight(0);
          setSubTotalPrice(0);
          setPaymentCode(0);
          setSettings({
            id: undefined,
            nongkir: 0,
            nmax_berat: 0,
            nmax_amount_po_cod: 0,
            nmax_amount_po_non_cod: 0,
          });
          setNoteInputValue('');
          dispatch(triggerCartUpdateR());
          if (currentPaymentMethod.method.toUpperCase() === 'EMONEY') {
            window.open(result.actions[0].url);
          }
          setCurrentPaymentMethod(initialCurrentPaymentMethod);
          setSnackPack(prev => [
            ...prev,
            {
              ...snackbarState,
              open: true,
              severity: 'success',
              msg: 'Pemesanan sukses',
              key: new Date().getTime(),
              anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
            },
          ]);
          getUserWallet();
          router.push('/transactions');
        }
      })
      .finally(() => setIsOrdering(false));
  };

  const getUserWallet = () => {
    axios(authState.userData.token)
      .post('/user/retrieve', { ckode_user: authState.userData.ckode_user })
      .then(({ data: { result, response, error } }) => {
        if (response === 200 && !error) {
          setWallet(result.ewallet[0]);
        }
      });
  };

  const getSettings = ({
    date = moment().format('yyyy-MM-DD'),
  }: {
    tzOffset?: number;
    date?: string;
  }) => {
    axios()
      .post('/market/setting/specific', {
        ckode_market: cartProducts[0].marketCode,
        tz_offset: (new Date().getTimezoneOffset() / 60) * -1,
        date,
      })
      .then(({ data: { result } }) => {
        setSettings(result);
      });
  };

  useEffect(() => {
    if (usePointEnabled && wallet.npoint_kerbel > totalPay) {
      setCurrentPaymentMethod(initialCurrentPaymentMethod);
    }
  }, [usePointEnabled]);

  useEffect(() => {
    if (authState.userData.id) {
      getUserWallet();
    }
  }, [authState.userData.id]);

  useEffect(() => {
    if (cartProducts.length) {
      getSettings({});
      let newTotalOrder = 0;
      let newSubTotalPrice = 0;
      let newTotalWeight = 0;
      cartProducts.map(d => {
        newTotalOrder += d.qty!;
        newSubTotalPrice += d.fixedPrice * d.qty!;
        newTotalWeight += d.weight! * d.qty!;
      });
      setTotalOrder(newTotalOrder);
      setSubTotalPrice(newSubTotalPrice);
      setTotalWeight(newTotalWeight);

      setIsOrdering(true);
      axios(authState.userData.token)
        .post('/market/payment/method', {
          ckode_user: authState.userData.ckode_user,
          ckode_mitra: cartProducts[0].marketCode,
          ccod: 1,
        })
        .then(({ data: { result, response } }) => {
          if (response === 200) {
            let newCurrentPaymentMethod: any = {};
            result.map((r: any) => {
              const pMD = r.data.map((a: any) => {
                if (a.id === currentPaymentMethod.id) {
                  newCurrentPaymentMethod = {
                    ...a,
                    cpayment_method: r.cpayment_method,
                  };
                }
              });
            });
            if (Object.keys(newCurrentPaymentMethod).length) {
              setCurrentPaymentMethod({
                id: newCurrentPaymentMethod.id,
                name: newCurrentPaymentMethod.cbank,
                code: newCurrentPaymentMethod.cbank_code,
                icon: newCurrentPaymentMethod.cicon,
                providerFee: newCurrentPaymentMethod.nprovider_fee,
                method: newCurrentPaymentMethod.cpayment_method,
              });
              setServiceFee(newCurrentPaymentMethod.nprovider_fee);
            }
          }
        })
        .catch(() => setCurrentPaymentMethod(initialCurrentPaymentMethod))
        .finally(() => setIsOrdering(false));
    } else {
      setCurrentPaymentMethod(initialCurrentPaymentMethod);
      setCurrentShippingTime('');
      setTotalOrder(0);
      setServiceFee(0);
      setTotalWeight(0);
      setSubTotalPrice(0);
      setPaymentCode(0);
      setSettings({
        id: undefined,
        nongkir: 0,
        nmax_berat: 0,
        nmax_amount_po_non_cod: 0,
        nmax_amount_po_cod: 0,
      });
      setNoteInputValue('');
    }
  }, [cartProducts]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Payment className={classes.headerIcon} />
        <Typography variant={'h5'} className={classes.headerTitle}>
          Pemesanan
        </Typography>
      </div>
      <div className={classes.container}>
        <div className={classes.subItem}>
          <Typography variant={'h6'} className={classes.subItemTitle}>
            Ringkasan Pesanan
          </Typography>
          <div className={classes.sIInfo}>
            <Typography variant={'subtitle1'} className={classes.sIInfoLabel}>
              Jumlah Item
            </Typography>
            <Typography variant={'body1'} className={classes.sIInfoValue}>
              {`${totalOrder} item`}
            </Typography>
          </div>
          <div className={classes.sIInfo}>
            <Typography variant={'subtitle1'} className={classes.sIInfoLabel}>
              Total Berat
            </Typography>
            <Typography variant={'body1'} className={classes.sIInfoValue}>
              {`${totalWeight}gr`}
            </Typography>
          </div>
          {/*<div className={classes.sIInfo}>*/}
          {/*  <Typography variant={'subtitle1'} className={classes.sIInfoLabel}>*/}
          {/*    Maksimal Berat*/}
          {/*  </Typography>*/}
          {/*  <Typography variant={'body1'} className={classes.sIInfoValue}>*/}
          {/*    {`${settings.nmax_berat}gr`}*/}
          {/*  </Typography>*/}
          {/*</div>*/}
        </div>
        <Divider className={classes.divider} />
        <div className={classes.subItem}>
          <Typography variant={'h6'} className={classes.subItemTitle}>
            Waktu Pengantaran
          </Typography>
          <div className={classes.sIInfo}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <MobileDatePicker
                openTo={'day'}
                views={['year', 'month', 'day']}
                label={'Tanggal'}
                value={shippingDate}
                onChange={onDatePicked}
                minDate={moment()}
                disableCloseOnSelect={false}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant={'standard'}
                    helperText={null}
                  />
                )}
                //@ts-ignore
                TextFieldProps={{
                  className: classes.sIIDatePickerInput,
                }}
              />
            </LocalizationProvider>
          </div>
          <div className={classes.sIInfo}>
            <Button
              variant={'contained'}
              onClick={onShippingTimePickerBtnClicked}
              className={classes.shippingTimePickerBtn}
              disabled={!cartProducts.length || !settings.id}>
              {currentShippingTime ? currentShippingTime : `Jam`}
            </Button>
          </div>
        </div>
        {((Number(wallet.npoint_kerbel) < totalPay && usePointEnabled) ||
          Number(wallet.npoint_kerbel) === 0 ||
          !usePointEnabled) && (
          <div className={classes.subItem}>
            <Typography variant={'h6'} className={classes.subItemTitle}>
              Metode Pembayaran
            </Typography>
            <div className={classes.sIInfo}>
              <Button
                variant={'contained'}
                onClick={onPaymentMethodPickerBtnClicked}
                className={classes.paymentMethodPickerBtn}
                disabled={
                  !cartProducts.length ||
                  (usePointEnabled && wallet.npoint_kerbel > totalPay)
                }>
                {currentPaymentMethod.code
                  ? currentPaymentMethod.name
                  : `Pilih metode pembayaran`}
              </Button>
            </div>
          </div>
        )}
        <div className={classes.paymentDetailsW}>
          <div className={classes.paymentDetailsC}>
            <div className={classes.sIInfo}>
              <Typography variant={'subtitle1'} className={classes.sIInfoLabel}>
                Sub total harga
              </Typography>
              <Typography variant={'body1'} className={classes.sIInfoValue}>
                {toRupiah(subTotalPrice)}
              </Typography>
            </div>
            <div className={classes.sIInfo}>
              <Typography variant={'subtitle1'} className={classes.sIInfoLabel}>
                Maksimal total harga:
              </Typography>
              <Typography variant={'body1'} className={classes.sIInfoValue}>
                {currentPaymentMethod.id && settings.id
                  ? toRupiah(
                      currentPaymentMethod.method.toUpperCase() === 'KPCOD'
                        ? settings.nmax_amount_po_cod
                        : settings.nmax_amount_po_non_cod,
                    )
                  : usePointEnabled && wallet.npoint_kerbel > totalPay
                  ? toRupiah(settings.nmax_amount_po_non_cod)
                  : toRupiah(0)}
              </Typography>
            </div>
            <div className={classes.sIInfo}>
              <Typography variant={'subtitle1'} className={classes.sIInfoLabel}>
                Ongkos kirim
              </Typography>
              <Typography variant={'body1'} className={classes.sIInfoValue}>
                {toRupiah(settings.nongkir)}
              </Typography>
            </div>
            <div className={classes.sIInfo}>
              <Typography variant={'subtitle1'} className={classes.sIInfoLabel}>
                Biaya layanan
              </Typography>
              <Typography variant={'body1'} className={classes.sIInfoValue}>
                {toRupiah(serviceFee)}
              </Typography>
            </div>
            {currentPaymentMethod.method.toUpperCase() === 'BANK_TRANSFER' && (
              <div className={classes.sIInfo}>
                <Typography
                  variant={'subtitle1'}
                  className={classes.sIInfoLabel}>
                  Kode Pembayaran
                </Typography>
                <Typography variant={'body1'} className={classes.sIInfoValue}>
                  {toRupiah(paymentCode)}
                </Typography>
              </div>
            )}
            <Divider sx={{ mx: 1, borderColor: '#cccccc' }} />
            <div className={classes.sIInfo}>
              <Typography variant={'subtitle1'} className={classes.sIInfoLabel}>
                Total Harga
              </Typography>
              <Typography variant={'body1'} className={classes.sIInfoValue}>
                {toRupiah(totalPay)}
              </Typography>
            </div>
          </div>
        </div>
        <div className={classes.noteInputW}>
          <TextField
            variant={'filled'}
            label={'Catatan'}
            value={noteInputValue}
            onChange={onNoteInputChange}
            className={classes.nITextField}
            multiline
            maxRows={5}
            InputProps={{
              endAdornment: (
                <InputAdornment position={'end'}>
                  <Edit sx={{ color: '#ffffff' }} />
                </InputAdornment>
              ),
            }}
          />
        </div>
        {currentPaymentMethod.method.toUpperCase() !== 'KPCOD' &&
          Number(wallet.npoint_kerbel) > 0 && (
            <div className={classes.subItem}>
              <Typography variant={'h6'} className={classes.subItemTitle}>
                Pakai Point
              </Typography>
              <div className={classes.sIInfo}>
                <Switch
                  defaultChecked={usePointEnabled}
                  onChange={onUsePointBtnChange}
                  className={classes.switchBtn}
                />
                <Typography variant={'body1'} className={classes.sIInfoValue}>
                  {toRupiah(wallet.npoint_kerbel)}
                </Typography>
              </div>
              {usePointEnabled && (
                <div className={classes.sIInfo}>
                  <Typography
                    variant={'subtitle1'}
                    className={classes.sIInfoLabel}>
                    Sisa Point
                  </Typography>
                  <Typography variant={'body1'} className={classes.sIInfoValue}>
                    {toRupiah(
                      usePointEnabled
                        ? totalPay < wallet.npoint_kerbel
                          ? wallet.npoint_kerbel - totalPay
                          : 0
                        : wallet.npoint_kerbel,
                    )}
                  </Typography>
                </div>
              )}
            </div>
          )}
        <div className={classes.paymentDetailsW}>
          <div className={classes.totalPay}>
            <Typography variant={'subtitle1'} className={classes.sIInfoLabel}>
              Total bayar
            </Typography>
            <Typography variant={'h6'} className={classes.sIInfoValue}>
              {usePointEnabled && Number(wallet.npoint_kerbel) > 0
                ? toRupiah(
                    totalPay < Number(wallet.npoint_kerbel)
                      ? 0
                      : totalPay - Number(wallet.npoint_kerbel),
                  )
                : toRupiah(totalPay)}
            </Typography>
          </div>
        </div>
        <div className={classes.footer}>
          <LoadingButton
            variant={'contained'}
            className={classes.orderBtn}
            onClick={onOrderBtnClicked}
            disabled={!cartProducts.length || !settings.id}
            loading={isOrdering}>
            Pesan
          </LoadingButton>
        </div>
        <ShippingTimePicker
          open={shippingTimePickerOpen}
          onClose={onShippingTimePickerClose}
          onChange={onShippingTimePickerChanged}
          {...{ settings, currentShippingTime }}
        />
        <PaymentMethodPicker
          open={currentPaymentMethodPickerOpen}
          onClose={onPaymentMethodPickerClose}
          onChange={onPaymentMethodPickerChanged}
          {...{ cartProducts }}
          marketCode={
            cartProducts.length
              ? cartProducts[0].marketCode
                ? cartProducts[0].marketCode
                : ''
              : ''
          }
          {...{ currentPaymentMethod }}
        />
        <Snackbar
          key={snackbarState.key}
          open={snackbarState.open}
          msg={snackbarState.msg}
          severity={snackbarState.severity}
          onClose={onSnackbarClose}
          anchorOrigin={snackbarState.anchorOrigin}
          className={classes.snackbar}
          autoHideDuration={snackbarState.timeout}
        />
      </div>
    </div>
  );
};

export default CheckOut;
