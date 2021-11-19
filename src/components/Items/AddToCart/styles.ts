import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { green, red } from '@mui/material/colors';
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
      backgroundColor: theme.palette.primary.main,
      color: '#ffffff',
      width: 36,
      height: 36,
      padding: theme.spacing(0.8),
      borderRadius: 36 / 2,
    },
    title: {
      marginLeft: theme.spacing(1),
      fontWeight: 800,
      color: '#424242',
    },
    body: {},
    productInfoW: {
      display: 'flex',
      flexDirection: 'row',
      padding: theme.spacing(2),
    },
    productImgW: {
      position: 'relative',
      padding: theme.spacing(1),
      borderRadius: theme.spacing(1),
      overflow: 'hidden',
      width: 100,
      height: 100,
      boxShadow: '0 10px 10px -5px rgba(0,0,0,0.15)',
    },
    productInfoDetails: {
      paddingLeft: theme.spacing(1),
    },
    pIDName: {
      fontWeight: 800,
      color: '#424242',
    },
    pIDPriceW: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: theme.spacing(1),
    },
    pIDFixedPrice: {
      fontWeight: 800,
      color: '#424242',
    },
    pIDProductDiscountW: {
      backgroundColor: 'rgba(0,0,0,0.05)',
      paddingLeft: `${theme.spacing(2)}`,
      height: 'fit-content',
      borderRadius: theme.spacing(2),
      marginTop: theme.spacing(-0.5),
      color: '#424242',
      marginLeft: theme.spacing(1),
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'row',
    },
    pIDPrice: {
      color: '#424242',
      fontWeight: 'normal',
      fontSize: 14,
      textDecorationLine: 'line-through',
    },
    sBDiscount: {
      marginLeft: theme.spacing(1),
      color: red[500],
      backgroundColor: 'rgba(255,0,0,0.1)',
      padding: `0 ${theme.spacing(1)}`,
      fontWeight: 800,
      fontSize: 14,
      height: 'fit-content',
      width: 'fit-content',
    },
    pIDMaxQty: {
      fontWeight: 800,
      color: green[600],
    },
    variantPickerW: {
      display: 'flex',
      flexDirection: 'column',
      padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    },
    vPWItemsW: {
      padding: `0 ${theme.spacing(2)}`,
    },
    variantTitle: {},
    radioIcon: {
      color: theme.palette.primary.main,
      '&.Mui-checked': {
        color: theme.palette.primary.main,
      },
    },
    detailVariantPickerW: {
      display: 'flex',
      flexDirection: 'column',
      padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    },
    dVPWItemsW: {
      padding: `0 ${theme.spacing(2)}`,
    },
    qtyOptionsW: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: theme.spacing(1),
      padding: `0 ${theme.spacing(4)}`,
    },
    totalPrice: {
      marginLeft: 'auto',
      fontSize: 18,
      fontWeight: 800,
      padding: `0 ${theme.spacing(1)}`,
    },
    qtyOptionsC: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: 'fit-content',
      borderRadius: theme.spacing(5),
      backgroundColor: alpha(theme.palette.tertiary.main, 0.3),
      padding: theme.spacing(0.8),
    },
    qtyOptionsText: {
      fontWeight: 800,
      padding: `0 ${theme.spacing(2)}`,
      fontSize: 18,
      color: '#424242',
    },
    qtyOptionsBtn: {
      color: '#ffffff',
      padding: theme.spacing(0.5),
      backgroundColor: theme.palette.tertiary.main,
      '&:hover': {
        backgroundColor: theme.palette.tertiary.main,
      },
    },
    footer: {
      display: 'flex',
      marginTop: 'auto',
      padding: theme.spacing(2),
      alignItems: 'center',
      justifyContent: 'center',
    },
    addToCartBtn: {
      flex: 1,
      margin: `0 ${theme.spacing(1)}`,
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.spacing(1),
      boxShadow: '0 5px 5px -2px rgba(0,0,0,0.15)',
      fontWeight: 800,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        boxShadow: '0 10px 15px -5px rgba(0,0,0,0.3)',
      },
    },
    snackbar: {
      position: 'absolute',
      top: theme.spacing(1),
      width: '95%',
    },
    closeBtn: {
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1),
    },
  }),
);

export default useStyles;
