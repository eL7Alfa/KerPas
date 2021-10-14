import React, { useEffect, useState } from 'react';
import { Box, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const Auth = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(selector.login.modalOpen);
  }, [selector.login.modalOpen]);
  return (
    <Modal open={open}>
      <Box>LOL</Box>
    </Modal>
  );
};

export default Auth;
