import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { alpha } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    detailsW: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
      padding: theme.spacing(4),
      borderRadius: theme.spacing(2),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        padding: 0,
        paddingBottom: theme.spacing(2),
        marginLeft: 0,
        marginRight: 0,
        borderRadius: 0,
        marginTop: 0,
      },
    },
    sectionA: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end',
      [theme.breakpoints.down('md')]: {
        alignItems: 'center',
      },
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(2),
      },
    },
    sectionB: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
      [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(-4),
        padding: `0 ${theme.spacing(1)}`,
      },
    },
    imgC: {
      position: 'relative',
      width: 400,
      height: 400,
      overflow: 'hidden',
      borderTopLeftRadius: theme.spacing(1),
      borderBottomLeftRadius: theme.spacing(1),
      [theme.breakpoints.down('md')]: {
        borderRadius: theme.spacing(1),
        width: 500,
        height: 500,
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        paddingTop: '100%',
        height: 'unset',
      },
      boxShadow: '0 20px 15px -10px rgba(0,0,0,0.15)',
    },
    sBContainer: {
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 40px 25px -20px rgba(0,0,0,0.15)',
      padding: theme.spacing(2),
      borderRadius: theme.spacing(2),
      minHeight: 550,
      [theme.breakpoints.down('md')]: {
        width: 600,
      },
      [theme.breakpoints.up('md')]: {
        minWidth: 500,
        maxWidth: 500,
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    sBHeader: {
      padding: `${theme.spacing(1)} 0`,
    },
    sBProductName: {
      color: '#424242',
      fontSize: theme.typography.body1.fontSize,
    },
    sBMarketNameW: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    sBMarketIcon: {
      color: theme.palette.primary.main,
      fontSize: theme.typography.h6.fontSize,
    },
    sBMarketName: {
      color: '#424242',
      fontSize: theme.typography.body1.fontSize,
    },
    sBPriceW: {
      display: 'flex',
      flexDirection: 'row',
      padding: `${theme.spacing(1)} 0`,
      marginTop: theme.spacing(1),
    },
    sBPFixedPrice: {
      color: '#424242',
      width: 'fit-content',
    },
    sBProductDiscountW: {
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
    sBPrice: {
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
    sBBody: {
      padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
      maxHeight: 400,
      overflow: 'auto',
    },
    sBSubtitle: {
      fontWeight: 800,
      colo4: '#424242',
      marginTop: theme.spacing(2),
    },
    sBSubItem: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    sBSubItemLabel: {
      width: '40%',
    },
    sBSubItemValue: {
      width: '50%',
      textAlign: 'right',
    },
    sBDescription: {
      fontSize: theme.typography.body2.fontSize,
      fontWeight: 'normal',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    sBFooter: {
      display: 'flex',
      marginTop: 'auto',
      paddingTop: theme.spacing(2),
      alignItems: 'center',
      justifyContent: 'center',
    },
    sBAddToCartBtn: {
      flex: 1,
      margin: `0 ${theme.spacing(1)}`,
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
      borderRadius: theme.spacing(1),
      boxShadow: '0 5px 5px -2px rgba(0,0,0,0.15)',
      color: theme.palette.primary.main,
      fontWeight: 800,
      '&:hover': {
        borderColor: theme.palette.primary.main,
        boxShadow: '0 10px 15px -5px rgba(0,0,0,0.3)',
        borderWidth: 2,
      },
    },
    sBBuyNowBtn: {
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
  }),
);

export default useStyles;
