import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import {
  blue,
  deepPurple,
  green,
  grey,
  red,
  yellow,
} from '@mui/material/colors';
import { alpha } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      padding: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    sidebar: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 250,
      height: 'fit-content',
      background: `linear-gradient(-45deg, ${theme.palette.primary.main} 0%, ${green[800]} 100%)`,
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.spacing(1),
      boxShadow: `0 25px 25px -12px ${alpha(theme.palette.primary.main, 0.5)}`,
      overflow: 'hidden',
      zIndex: 1,
    },
    sBItem: {
      padding: theme.spacing(1),
    },
    sBITitle: {
      color: '#ffffff',
      fontWeight: 800,
      padding: `0 ${theme.spacing(0.5)}`,
    },
    sBISubW: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'row',
      },
    },
    sBISubBtnW: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: `0 ${theme.spacing(1)}`,
      margin: `${theme.spacing(1)} 0`,
      [theme.breakpoints.down('sm')]: {
        padding: `0 ${theme.spacing(0.5)}`,
      },
    },
    sBISubBtn: {
      backgroundColor: 'rgba(0,0,0,0.1)',
      color: '#ffffff',
      borderRadius: theme.spacing(1),
      fontWeight: 800,
      width: '100%',
      boxShadow: 'none',
      textTransform: 'unset',
      textAlign: 'unset',
      justifyContent: 'unset',
      whiteSpace: 'nowrap',
      '&.active': {
        backgroundColor: '#ffffff',
        color: green[900],
      },
      '&:hover:not(.active)': {
        backgroundColor: alpha('#ffffff', 0.8),
        color: green[900],
      },
    },
    tTitle: {
      color: grey[700],
      fontWeight: 800,
      padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
      marginBottom: theme.spacing(1),
      position: 'sticky',
      top: 0,
      backgroundColor: '#ffffff',
      boxShadow: '0 5px 5px -2px rgba(0,0,0,0.15)',
      borderRadius: theme.spacing(0.5),
      zIndex: 1,
    },
    transactions: {
      width: '100%',
      padding: `0 ${theme.spacing(1)}`,
      paddingBottom: theme.spacing(4),
      maxHeight: `calc(100vh - (80px + ${theme.spacing(2)}))`,
      overflow: 'auto',
      [theme.breakpoints.down('sm')]: {
        maxHeight: `calc(100vh - (80px + ${theme.spacing(2)} + 100px))`,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        overflow: 'auto',
      },
    },
    tWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      width: '100%',
      height: '100%',
    },
    tContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
    tHeader: {
      display: 'flex',
      flexDirection: 'row',
      padding: theme.spacing(1),
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      backgroundColor: green[100],
    },
    tHNoInvoice: {
      fontWeight: 800,
      color: grey[800],
    },
    tBody: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    tBItem: {
      display: 'flex',
      flexDirection: 'row',
      padding: `0 ${theme.spacing(1)}`,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    tBSampleItem: {
      display: 'flex',
      flexDirection: 'row',
      padding: theme.spacing(1),
    },
    tBSIImgW: {
      position: 'relative',
      width: 60,
      height: 60,
      overflow: 'hidden',
      borderRadius: theme.spacing(0.5),
    },
    tBSIInfo: {
      display: 'flex',
      flexDirection: 'column',
      padding: `0 ${theme.spacing(1)}`,
      textAlign: 'left',
    },
    tBIStatus: {
      fontWeight: 800,
      fontSize: 15,
      textDecoration: 'underline',
      '&.checkout': {
        color: yellow[900],
      },
      '&:not(.checkout):not(.dibatalkan)': {
        color: blue[700],
      },
      '&.dibatalkan': {
        color: red[700],
      },
    },
    tFooter: {
      display: 'flex',
      flexDirection: 'row',
      padding: theme.spacing(1),
      justifyContent: 'space-between',
      marginTop: 'auto',
      '& > *': {
        marginRight: theme.spacing(1),
      },
      '& > *:last-child': {
        marginRight: 0,
      },
    },
    tFCancelPaymentBtn: {
      backgroundColor: red[700],
      '&:hover': {
        backgroundColor: red[700],
      },
    },
    tFPaymentBtn: {
      backgroundColor: yellow[900],
      '&:hover': {
        backgroundColor: yellow[900],
      },
    },
    tFReorderBtn: {
      backgroundColor: green[600],
      '&:hover': {
        backgroundColor: green[600],
      },
    },
    tFCallCourierBtn: {
      backgroundColor: deepPurple[400],
      '&:hover': {
        backgroundColor: deepPurple[400],
      },
    },
    tFStatus: {
      height: 'fit-content',
      color: blue[600],
      textTransform: 'uppercase',
      fontWeight: 500,
      padding: '2px 8px',
      border: `1px ${blue[600]} solid`,
      borderRadius: theme.spacing(2),
      backgroundColor: alpha(blue[600], 0.15),
      '&.payViaEMoney': {
        color: yellow[900],
        border: `1px ${yellow[900]} solid`,
        backgroundColor: alpha(yellow[900], 0.15),
      },
    },
  }),
);

export default useStyles;
