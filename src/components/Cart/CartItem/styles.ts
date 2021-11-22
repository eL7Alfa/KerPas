import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { grey, red, yellow } from '@mui/material/colors';
import { alpha } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: `0 ${theme.spacing(1)}`,
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
      backgroundColor: '#ffffff',
      margin: `${theme.spacing(0.5)} 0`,
      borderRadius: theme.spacing(1),
      boxShadow: '0 5px 10px -5px rgba(0,0,0,0.1)',
      overflow: 'hidden',
    },
    sectionA: {
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
    },
    imgW: {
      position: 'relative',
      width: '20vh',
      height: '20vh',
    },
    infoW: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
    },
    productName: {
      fontWeight: 800,
      color: '#424242',
    },
    fixedPriceW: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    fixedPrice: {
      color: '#424242',
      width: 'fit-content',
      fontWeight: 800,
    },
    fPUnit: {
      fontSize: 14,
      marginLeft: 3,
    },
    priceW: {
      display: 'flex',
      flexDirection: 'row',
      paddingTop: theme.spacing(0.5),
    },
    productDiscountW: {
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
    price: {
      color: '#424242',
      fontWeight: 'normal',
      fontSize: 14,
      textDecorationLine: 'line-through',
    },
    discount: {
      marginLeft: theme.spacing(1),
      color: red[500],
      backgroundColor: 'rgba(255,0,0,0.1)',
      padding: `0 ${theme.spacing(1)}`,
      fontWeight: 800,
      fontSize: 14,
      height: 'fit-content',
      width: 'fit-content',
    },
    qty: {
      fontSize: 14,
    },
    variant: {
      fontSize: 14,
    },
    variantDetail: {
      fontSize: 14,
    },
    optionsW: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(1),
      alignItems: 'flex-end',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: alpha(theme.palette.tertiary.main, 0.3),
      },
    },
    qtyOptionsW: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    qtyOptionsC: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: 'fit-content',
      borderRadius: theme.spacing(5),
      backgroundColor: alpha(theme.palette.tertiary.main, 0.3),
      padding: theme.spacing(0.5),
      marginLeft: theme.spacing(1),
    },
    qtyOptionsText: {
      fontWeight: 800,
      padding: `0 ${theme.spacing(1)}`,
      fontSize: 16,
      color: '#424242',
    },
    qtyOptionsBtn: {
      color: '#ffffff',
      width: 25,
      height: 25,
      backgroundColor: theme.palette.tertiary.main,
      '&:hover': {
        backgroundColor: theme.palette.tertiary.main,
      },
    },
    qtyOptionsDeleteBtn: {
      marginTop: 'auto',
      color: grey[500],
      width: 25,
      height: 25,
      [theme.breakpoints.down('sm')]: {
        marginTop: 'unset',
      },
    },
    totalPrice: {
      marginLeft: 'auto',
      fontWeight: 800,
      fontSize: 16,
      color: yellow[900],
    },
  }),
);

export default useStyles;
