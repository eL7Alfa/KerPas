import React, { useState } from 'react';
import { SnackbarOrigin } from '@mui/material';

export const useSnackbarConst = () => {
  const [snackbarState, setSnackbarState] = useState<{
    open: boolean;
    msg: string;
    severity: 'success' | 'error' | 'warning' | 'info';
    anchorOrigin: SnackbarOrigin;
    timeout: number;
  }>({
    open: false,
    severity: 'success',
    msg: '',
    anchorOrigin: { vertical: 'top', horizontal: 'center' },
    timeout: 3000,
  });

  const onSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarState(prevState => ({ ...prevState, open: false }));
  };

  return { snackbarState, setSnackbarState, onSnackbarClose };
};
