import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog as MaterialDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerI } from '../../../redux/reducers';
import { resetDialogR } from '../../../redux/actions/appRActions';
import { appDefStateRT } from '../../../redux/defaultStateR/appDefStateR';

type DialogPropsTypes = {
  agreeCallback: () => void;
};

const Dialog = ({ agreeCallback = () => {} }: DialogPropsTypes) => {
  const { appState } = useSelector((state: rootReducerI) => state);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState<appDefStateRT['dialog']>(
    appState.dialog,
  );

  const onClose = () => {
    dispatch(resetDialogR());
  };

  const onAgree = () => {
    agreeCallback();
    dispatch(resetDialogR());
  };

  useEffect(() => {
    setOpen(appState.dialog.open);
    setDialog(appState.dialog);
  }, [appState.dialog]);

  return (
    <MaterialDialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{dialog.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialog.body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          {dialog.disagreeBtnText}
        </Button>
        <Button onClick={onAgree}>{dialog.agreeBtnText}</Button>
      </DialogActions>
    </MaterialDialog>
  );
};

export default Dialog;
