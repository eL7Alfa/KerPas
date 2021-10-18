import React from 'react';
import SnackbarBase, { SnackbarProps } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant={'filled'} {...props} />;
});

interface SnackbarTypes extends SnackbarProps {
  open: boolean;
  msg: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
}

const Snackbar = ({ onClose, severity, msg, ...props }: SnackbarTypes) => {
  return (
    <SnackbarBase {...props} {...{ onClose }}>
      <Alert {...{ severity, onClose }} sx={{ width: '100%' }}>
        {msg}
      </Alert>
    </SnackbarBase>
  );
};

export default Snackbar;
