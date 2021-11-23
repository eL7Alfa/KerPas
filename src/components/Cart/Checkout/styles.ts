import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { grey, yellow } from '@mui/material/colors';
import { alpha } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: `0 ${theme.spacing(1)}`,
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: `${theme.spacing(1)}`,
    },
    headerIcon: {
      color: theme.palette.tertiary.main,
      fontSize: theme.spacing(3.5),
    },
    headerTitle: {
      marginLeft: theme.spacing(1),
      color: '#424242',
      fontWeight: 800,
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      minWidth: 300,
      background: `linear-gradient(-45deg, ${theme.palette.tertiary.main} 0%, ${yellow[900]} 100%)`,
      backgroundColor: theme.palette.tertiary.main,
      borderRadius: theme.spacing(1),
      boxShadow: `0 25px 25px -12px ${alpha(theme.palette.tertiary.main, 0.5)}`,
      overflow: 'hidden',
    },
    subItem: {
      padding: theme.spacing(1),
    },
    subItemTitle: {
      color: '#ffffff',
      fontWeight: 800,
    },
    sIInfo: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: `0 ${theme.spacing(1)}`,
    },
    sIInfoLabel: {
      color: '#ffffff',
      fontWeight: 800,
      paddingRight: theme.spacing(1),
    },
    sIInfoValue: {
      color: '#ffffff',
      fontWeight: 800,
    },
    shippingTimePickerBtn: {
      backgroundColor: '#ffffff',
      color: yellow[900],
      borderRadius: theme.spacing(1),
      fontWeight: 800,
      width: '100%',
      '&:hover': {
        backgroundColor: '#ffffff',
        color: yellow[900],
      },
    },
    paymentMethodPickerBtn: {
      backgroundColor: '#ffffff',
      color: yellow[900],
      borderRadius: theme.spacing(1),
      fontWeight: 800,
      width: '100%',
      '&:hover': {
        backgroundColor: '#ffffff',
        color: yellow[900],
      },
    },
    switchBtn: {
      '& .MuiSwitch-switchBase': {
        color: yellow[700],
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        color: '#ffffff',
        '&:hover': {
          backgroundColor: alpha('#ffffff', theme.palette.action.hoverOpacity),
        },
      },
      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#ffffff',
      },
    },
    paymentDetailsW: {
      margin: `${theme.spacing(1)} 0`,
      padding: `0 ${theme.spacing(1)}`,
    },
    paymentDetailsC: {
      backgroundColor: alpha(grey[900], 0.1),
      width: '100%',
      borderRadius: theme.spacing(1),
      padding: `${theme.spacing(1)} 0`,
    },
    noteInputW: {
      margin: `${theme.spacing(1)} 0`,
      padding: `0 ${theme.spacing(1)}`,
    },
    nITextField: {
      width: '100%',
      '& textarea': {
        color: '#ffffff',
      },
      '& label': {
        color: '#ffffff',
      },
      '& label.Mui-focused': {
        color: '#ffffff',
      },
      '& .MuiFilledInput-underline:after': {
        borderBottomColor: '#ffffff',
      },
      '& .MuiFilledInput-underline:before': {
        borderBottomColor: '#cccccc',
      },
      '& .MuiFilledInput-root': {
        '&:hover:not(.Mui-disabled):before': {
          borderBottomColor: '#ffffff',
        },
      },
    },
    totalPay: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: alpha(grey[900], 0.1),
      width: '100%',
      borderRadius: theme.spacing(1),
      padding: `${theme.spacing(1)}`,
    },
    footer: {
      marginTop: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(1),
    },
    orderBtn: {
      backgroundColor: '#ffffff',
      color: yellow[900],
      borderRadius: theme.spacing(1),
      fontWeight: 800,
      width: '100%',
      '&:hover': {
        backgroundColor: '#ffffff',
        color: yellow[900],
      },
    },
    divider: {
      margin: `0 ${theme.spacing(2)}`,
      borderColor: '#ffffff',
    },
    snackbar: {
      position: 'absolute',
      top: theme.spacing(1),
      width: '95%',
    },
  }),
);

export default useStyles;
