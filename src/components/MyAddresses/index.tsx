import React, { useEffect, useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import {
  setMyAddressesOpenR,
  setSelectedAddressR,
} from '../../redux/actions/appRActions';
import MyAddress from './MyAddress';
import { rootReducerI } from '../../redux/reducers';
import usePrevious from '../../helper/usePrevious';

export type MyAddressesTypes = {
  data: any[];
};

const MyAddresses = ({ data }: MyAddressesTypes) => {
  const selector = useSelector((state: rootReducerI) => state.appState);
  const dispatch = useDispatch();
  const appState = useSelector((state: any) => state.appState);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<any>({});
  const prevData = usePrevious(data);

  const onCloseSelectAddressClicked = () => {
    dispatch(setMyAddressesOpenR(false));
  };

  useEffect(() => {
    setSelectedAddress(selector.selectedAddress);
  }, [selector.selectedAddress]);

  useEffect(() => {
    setOpen(appState.myAddressesOpen);
  }, [appState.myAddressesOpen]);

  useEffect(() => {
    if (prevData !== data) {
      const _selectedAddress = localStorage.getItem('selectedAddress');
      if (_selectedAddress) {
        const selectedAddress = JSON.parse(_selectedAddress);
        const newSelectedAddress = data.filter(
          a => a.id === selectedAddress.id,
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
  }, [data]);

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
            {data.map((d: any, key: number) => (
              <MyAddress key={key} data={d} {...{ selectedAddress }} />
            ))}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default MyAddresses;
