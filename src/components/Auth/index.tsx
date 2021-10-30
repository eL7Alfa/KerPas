import React, { Fragment, useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthModalOpenR } from '../../redux/actions/authRActions';
import useStyles from './styles';
import SignIn from './SignIn';
import Information from './Information';

const Auth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: any) => state.authState);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalHeight, setModalHeight] = useState(0);

  const onClose = () => {
    dispatch(setAuthModalOpenR(false));
  };

  useEffect(() => {
    setOpen(authState.modalOpen);
  }, [authState.modalOpen]);
  return (
    <Modal {...{ open, onClose }} className={classes.root} hideBackdrop>
      <Fragment>
        <Information />
        <SignIn />
      </Fragment>
    </Modal>
  );
};

export default Auth;
