import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Modal,
  Toolbar,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setModalOpenR } from '../../redux/actions';
import useStyles from './styles';

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
        <Card className={classes.card}>
          <Toolbar>
            <Typography variant={'h5'}>Masuk</Typography>
          </Toolbar>
          <CardContent></CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

export default Auth;
