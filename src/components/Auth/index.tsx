import React, { useEffect, useState } from 'react';
import { Box, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setModalOpenR } from '../../redux/actions';

const Auth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: any) => state.authState);
  const [open, setOpen] = useState(false);

  const onClose = () => {
    dispatch(setModalOpenR(false));
  };

  useEffect(() => {
    setOpen(authState.modalOpen);
  }, [authState.modalOpen]);
  return (
    <Modal {...{ open, onClose }}>
      <Box>LOL</Box>
    </Modal>
  );
};

export default Auth;
