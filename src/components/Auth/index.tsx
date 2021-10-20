import React, { useEffect, useState } from 'react';
import { Box, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthModalOpenR } from '../../redux/actions';
import useStyles from './styles';
import SignIn from './SignIn';
import Information from './Information';
import { fbAppId } from '../../config/auth';
import FacebookLogin from 'react-facebook-login';

const Auth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: any) => state.authState);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const onClose = () => {
    dispatch(setAuthModalOpenR(false));
  };

  const fbRes = (e: any) => {
    console.log(e);
  };

  useEffect(() => {
    setOpen(authState.modalOpen);
  }, [authState.modalOpen]);
  return (
    <Modal {...{ open, onClose }} className={classes.root}>
      <Box className={classes.box}>
        <Information />
        <SignIn />
        <FacebookLogin
          appId={fbAppId}
          autoLoad={true}
          fields="name,email,picture"
          callback={fbRes}
          cssClass="my-facebook-button-class"
          icon="fa-facebook"
        />
      </Box>
    </Modal>
  );
};

export default Auth;
