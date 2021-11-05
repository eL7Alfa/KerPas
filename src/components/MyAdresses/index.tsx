import React, { useEffect, useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { setMyAddressesOpenR } from '../../redux/actions/appRActions';

const MyAdresses = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state: any) => state.appState);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const onCloseSelectAddressClicked = () => {
    dispatch(setMyAddressesOpenR(false));
  };

  useEffect(() => {
    setOpen(appState.myAddressesOpen);
  }, [appState.myAddressesOpen]);
  return (
    <Modal open={open} onClose={onCloseSelectAddressClicked}>
      <Box className={classes.root}>
        <div className={classes.header}>
          <Typography variant={'h6'}>Pilih Alamat Kamu</Typography>
        </div>
      </Box>
    </Modal>
  );
};

export default MyAdresses;
