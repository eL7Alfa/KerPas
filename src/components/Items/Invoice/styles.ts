import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { green, yellow } from '@mui/material/colors';
import { alpha } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    box: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        width: '95%',
      },
      maxWidth: theme.breakpoints.values.sm,
      maxHeight: '90vh',
    },
    paper: {
      width: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: theme.spacing(1),
      overflow: 'hidden',
      height: '100vh',
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      padding: theme.spacing(2),
      alignItems: 'center',
    },
    titleIcon: {
      fontSize: theme.typography.h5.fontSize,
      color: theme.palette.primary.main,
      width: 36,
      height: 36,
    },
    title: {
      marginLeft: theme.spacing(1),
      fontWeight: 800,
      color: '#424242',
    },
    closeBtn: {
      marginLeft: 'auto',
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
      maxHeight: '100%',
      width: '100%',
      height: '100%',
    },
    imgW: {
      position: 'relative',
      minWidth: 80,
      minHeight: 80,
      maxWidth: 80,
      maxHeight: 80,
      margin: `${theme.spacing(1)} auto`,
    },
    bPaymentInfoW: {
      padding: `0 ${theme.spacing(1)}`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bPaymentInfoBankName: {
      fontWeight: 800,
      color: '#424242',
      textAlign: 'center',
    },
    bPaymentInfoPrice: {
      fontWeight: 800,
      fontSize: 24,
      color: yellow[900],
      textAlign: 'center',
    },
    bPaymentInfoBankAccount: {
      fontWeight: 800,
      fontSize: 20,
      color: yellow[900],
      textAlign: 'center',
    },
    bPaymentInfoProvisionW: {
      padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      margin: `${theme.spacing(1)} auto`,
      borderRadius: theme.spacing(1),
    },
    bPaymentInfoProvision: {
      fontWeight: 800,
      fontSize: 14,
      color: green[700],
      textAlign: 'center',
      fontStyle: 'italic',
    },
    bCardOwnerInput: {
      width: '100%',
      '& .MuiInputLabel-root': {
        color: yellow[900],
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: yellow[900],
        },
        '&:hover fieldset': {
          borderColor: yellow[900],
        },
        '&.Mui-focused fieldset': {
          borderColor: yellow[900],
        },
      },
    },
    bPaymentConfirmationDetails: {
      display: 'flex',
      flexDirection: 'column',
    },
    bPickFileBtn: {
      margin: `${theme.spacing(1)} auto`,
      width: '70%',
      backgroundColor: yellow[900],
      '&:hover': {
        backgroundColor: yellow[900],
      },
    },
    bPickedFileName: {
      margin: `0 auto`,
    },
    footer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      padding: `${theme.spacing(2)} ${theme.spacing(1)}`,
    },
    fConfirmPaymentBtn: {
      width: '100%',
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  }),
);

export default useStyles;
