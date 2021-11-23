import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { green, grey, yellow } from '@mui/material/colors';
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
      '&:hover': {
        backgroundColor: '#ffffff',
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
      width: '100%',
    },
    tContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    tHeader: {
      display: 'flex',
      flexDirection: 'row',
      padding: theme.spacing(1),
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
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
    tFooter: {
      display: 'flex',
      flexDirection: 'row',
      padding: theme.spacing(1),
      justifyContent: 'flex-end',
    },
    tFPaymentBtn: {
      color: yellow[900],
    },
  }),
);

export default useStyles;
