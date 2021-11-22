import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { Payment } from '@mui/icons-material';
import { Button, Divider, Typography } from '@mui/material';
import { CartProductTypes } from '../../constants';
import toRupiah from '../../../modules/toRupiah';
import ShippingTimePicker from './ShippingTimePicker';
import axios from '../../../config/axios';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerI } from '../../../redux/reducers';
import PaymentMethodPicker from './PaymentMethodPicker';
import mathRandomRange from '../../../modules/mathRandomRange';
import { LoadingButton } from '@mui/lab';
import { triggerCartUpdateR } from '../../../redux/actions/appRActions';

const CheckOut = ({ data }: { data: CartProductTypes[] }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { appState, authState } = useSelector((state: rootReducerI) => state);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [paymentCode, setPaymentCode] = useState(0);
  const [settings, setSettings] = useState<any>({ id: undefined, nongkir: 0 });
  const [shippingTimePickerOpen, setShippingTimePickerOpen] = useState(false);
  const [currentPaymentMethodPickerOpen, setCurrentPaymentMethodPickerOpen] =
    useState(false);
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
        setPaymentCode(mathRandomRange(400, 500));
      } else {
        setPaymentCode(0);
      }
    };

  const onOrderBtnClicked = () => {
    if (!Object.keys(appState.selectedAddress).length) {
      return;
    }
    if (!appState.nearestMarket.id) {
      return;
    }
    if (
      !data.filter(d => d.marketCode === appState.nearestMarket.ckode_mitra)
        .length
    ) {
      return;
    }
    if (!currentShippingTime) {
      return;
    }
    if (!currentPaymentMethod.id) {
      return;
    }
    setIsOrdering(true);
    let postData = {
      ckode_user: authState.userData.ckode_user,
      cuser_address: appState.selectedAddress.id,
      cstore_location: appState.nearestMarket.cloc,
      nweight: totalWeight,
      nservice: currentPaymentMethod.id,
      ua: 'W',
      nunique_code: paymentCode,
      npoint_kerbel: 0,
      ccod: 0,
      cinsurance: 0,
      ddelivery: currentShippingTime,
    };
    axios(authState.userData.token)
      .post('/market/transaction', postData)
      .then(({ data: { response, result, error } }) => {
        if (!error && response === 200) {
          setCurrentPaymentMethod(initialCurrentPaymentMethod);
          setCurrentShippingTime('');
          setTotalOrder(0);
          setServiceFee(0);
          setTotalWeight(0);
          setSubTotalPrice(0);
          setPaymentCode(0);
          setSettings({ id: undefined, nongkir: 0 });
          dispatch(triggerCartUpdateR());
        }
      })
      .finally(() => setIsOrdering(false));
  };

  const getSettings = () => {
    axios()
      .get('/market/setting')
      .then(({ data: dataS }) => {
        const { result } = dataS;
        setSettings(
          result.filter(
            (r: { ckode_mitra: string }) =>
              r.ckode_mitra === data[0].marketCode,
          )[0],
        );
      });
  };

  useEffect(() => {
    if (data.length) {
      getSettings();
      let newTotalOrder = 0;
      let newSubTotalPrice = 0;
      let newTotalWeight = 0;
      data.map(d => {
        newTotalOrder += d.qty!;
        newSubTotalPrice += d.fixedPrice * d.qty!;
        newTotalWeight += d.weight! * d.qty!;
      });
      setTotalOrder(newTotalOrder);
      setSubTotalPrice(newSubTotalPrice);
      setTotalWeight(newTotalWeight);
    } else {
      setCurrentPaymentMethod(initialCurrentPaymentMethod);
      setCurrentShippingTime('');
      setTotalOrder(0);
      setServiceFee(0);
      setTotalWeight(0);
      setSubTotalPrice(0);
      setPaymentCode(0);
      setSettings({ id: undefined, nongkir: 0 });
    }
  }, [data]);

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
              Total Jenis
            </Typography>
            <Typography variant={'body1'} className={classes.sIInfoValue}>
              {`${data.length} item`}
            </Typography>
          </div>
          <div className={classes.sIInfo}>
            <Typography variant={'subtitle1'} className={classes.sIInfoLabel}>
              Total Pesanan
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
        </div>
        <Divider className={classes.divider} />
        <div className={classes.subItem}>
          <Typography variant={'h6'} className={classes.subItemTitle}>
            Waktu Pengantaran
          </Typography>
          <div className={classes.sIInfo}>
            <Button
              variant={'contained'}
              onClick={onShippingTimePickerBtnClicked}
              className={classes.shippingTimePickerBtn}
              disabled={!data.length || !settings.id}>
              {currentShippingTime
                ? currentShippingTime
                : `Pilih waktu pengantaran`}
            </Button>
          </div>
        </div>
        <div className={classes.subItem}>
          <Typography variant={'h6'} className={classes.subItemTitle}>
            Metode Pengiriman
          </Typography>
          <div className={classes.sIInfo}>
            <Button
              variant={'contained'}
              onClick={onPaymentMethodPickerBtnClicked}
              className={classes.paymentMethodPickerBtn}
              disabled={!data.length}>
              {currentPaymentMethod.code
                ? currentPaymentMethod.name
                : `Pilih metode pengiriman`}
            </Button>
          </div>
        </div>
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
          </div>
        </div>
        <div className={classes.paymentDetailsW}>
          <div className={classes.totalPay}>
            <Typography variant={'subtitle1'} className={classes.sIInfoLabel}>
              Total bayar
            </Typography>
            <Typography variant={'h6'} className={classes.sIInfoValue}>
              {toRupiah(
                subTotalPrice + settings.nongkir + serviceFee + paymentCode,
              )}
            </Typography>
          </div>
        </div>
        <div className={classes.footer}>
          <LoadingButton
            variant={'contained'}
            className={classes.orderBtn}
            onClick={onOrderBtnClicked}
            disabled={!data.length || !settings.id}
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
          marketCode={
            data.length ? (data[0].marketCode ? data[0].marketCode : '') : ''
          }
          {...{ currentPaymentMethod }}
        />
      </div>
    </div>
  );
};

export default CheckOut;
