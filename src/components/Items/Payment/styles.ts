import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { green, yellow } from '@mui/material/colors';
import { alpha } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        width: '95%',
      },
      maxWidth: theme.breakpoints.values.sm,
    },
    paper: {
      borderRadius: theme.spacing(2),
      overflow: 'hidden',
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
      borderRadius: 36 / 2,
    },
    title: {
      marginLeft: theme.spacing(1),
      fontWeight: 800,
      color: '#424242',
    },
    body: { display: 'flex', flexDirection: 'column' },
    imgW: {
      position: 'relative',
      width: 80,
      height: 80,
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
  }),
);

export default useStyles;
