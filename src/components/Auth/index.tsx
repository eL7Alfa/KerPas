import React, { useEffect, useState } from 'react';
import { Box, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setModalOpenR } from '../../redux/actions';
import useStyles from './styles';
import SignIn from './SignIn';

const Auth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: any) => state.authState);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const onClose = () => {
    dispatch(setModalOpenR(false));
  };

  useEffect(() => {
    setOpen(authState.modalOpen);
  }, [authState.modalOpen]);
  return (
    <Modal {...{ open, onClose }} className={classes.root}>
      <Box className={classes.box}>
        <SignIn />
      </Box>
    </Modal>
  );
};

export default Auth;
