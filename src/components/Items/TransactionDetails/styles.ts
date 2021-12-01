import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

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
      maxWidth: theme.breakpoints.values.sm - 100,
      maxHeight: '90vh',
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      borderRadius: theme.spacing(1),
      overflow: 'hidden',
      width: '100%',
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
    closeBtn: {
      marginLeft: 'auto',
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
      maxHeight: '100%',
      padding: theme.spacing(1, 1),
    },
    tBProductItem: {
      display: 'flex',
      flexDirection: 'row',
      padding: theme.spacing(1),
    },
    tBAddressInfo: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(0, 1, 2, 1),
    },
    tBAItem: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(1, 2),
      borderLeftColor: theme.palette.primary.main,
      borderLeftWidth: 2,
      borderLeftStyle: 'solid',
      borderRadius: theme.spacing(0.5),
      boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
    },
    tBProductInfo: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(0, 1, 1, 1),
    },
    tBIImgW: {
      position: 'relative',
      width: 60,
      height: 60,
      overflow: 'hidden',
      borderRadius: theme.spacing(0.5),
    },
    tBIInfo: {
      display: 'flex',
      flexDirection: 'column',
      padding: `0 ${theme.spacing(1)}`,
      textAlign: 'left',
    },
    tBItem: {
      display: 'flex',
      flexDirection: 'row',
      padding: `0 ${theme.spacing(1)}`,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  }),
);

export default useStyles;
