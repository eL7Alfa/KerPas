import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import {
  setMyAddressesOpenR,
  setSelectedAddressR,
} from '../../redux/actions/appRActions';
import MyAddress from './MyAddress';
import { rootReducerI } from '../../redux/reducers';
import usePrevious from '../../helper/usePrevious';
import { Close } from '@mui/icons-material';
import { getAddresses } from '../../Requests/HomeRequests';

const MyAddresses = () => {
  const { authState, appState } = useSelector((state: rootReducerI) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<any>({});
  const [addresses, setAddresses] = useState<any>([]);
  const prevData = usePrevious(addresses);

  const onCloseSelectAddressClicked = () => {
    dispatch(setMyAddressesOpenR(false));
  };

  useEffect(() => {
    setSelectedAddress(appState.selectedAddress);
  }, [appState.selectedAddress]);

  useEffect(() => {
    setOpen(appState.myAddressesOpen);
  }, [appState.myAddressesOpen]);

  useEffect(() => {
    if (prevData !== addresses) {
      const _selectedAddress = localStorage.getItem('selectedAddress');
      if (_selectedAddress) {
        const selectedAddress = JSON.parse(_selectedAddress);
        const newSelectedAddress = addresses.filter(
          (a: { id: any }) => a.id === selectedAddress.id,
        );
        if (newSelectedAddress.length) {
          localStorage.setItem(
            'selectedAddress',
            JSON.stringify(newSelectedAddress[0]),
          );
          dispatch(setSelectedAddressR(newSelectedAddress[0]));
        }
      }
    }
  }, [addresses]);

  useEffect(() => {
    if (!authState.userData.id) {
      setAddresses([]);
    } else {
      getAddresses({
        token: authState.userData.token,
        userCode: authState.userData.ckode_user,
      })
        .then(addresses => setAddresses(addresses))
        .catch(e => console.log(e.response));
    }
  }, [authState.userData.id]);

  return (
    <Modal open={open} onClose={onCloseSelectAddressClicked}>
      <Box className={classes.box}>
        <div className={classes.container}>
          <div className={classes.header}>
            <Typography variant={'h6'}>Pilih Alamat Tujuan</Typography>
            <Typography variant={'body2'}>
              Kirim sayur ke si dia jadi lebih mudah
            </Typography>
          </div>
          <div className={classes.body}>
            {addresses.map((d: any, key: number) => (
              <MyAddress key={key} data={d} {...{ selectedAddress }} />
            ))}
          </div>
          <div className={classes.footer}>
            <Button variant={'outlined'} className={classes.addAddressBtn}>
              TAMBAH ALAMAT
            </Button>
          </div>
        </div>
        <IconButton
          className={classes.closeBtn}
          onClick={onCloseSelectAddressClicked}>
          <Close />
        </IconButton>
      </Box>
    </Modal>
  );
};

export default MyAddresses;
