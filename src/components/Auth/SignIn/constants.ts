import React, { useState } from 'react';
import { SnackbarOrigin } from '@mui/material';

export type snackbarStateT = {
  open: boolean;
  msg: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  anchorOrigin?: SnackbarOrigin;
  timeout?: number;
  key: number;
};

export const useSnackbarConst = () => {
  const [snackPack, setSnackPack] = React.useState<readonly snackbarStateT[]>(
    [],
  );
  const [snackbarState, setSnackbarState] = useState<snackbarStateT>({
    open: false,
    severity: 'success',
    msg: '',
    anchorOrigin: { vertical: 'top', horizontal: 'center' },
    timeout: 3000,
    key: new Date().getTime(),
  });

  React.useEffect(() => {
    if (snackPack.length && !snackbarState.open) {
      setSnackPack(prev => prev.slice(1));
      setSnackbarState(prev => ({ ...prev, ...snackPack[0], open: true }));
    } else if (snackPack.length && snackbarState.open) {
      setSnackbarState(prev => ({ ...prev, open: false }));
    }
  }, [snackPack, snackbarState.open]);

  const onSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarState(prev => ({ ...prev, open: false }));
  };

  return { snackbarState, setSnackPack, onSnackbarClose };
};