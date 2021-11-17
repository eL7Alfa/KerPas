import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    detailsW: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.1)',
      padding: theme.spacing(4),
      borderRadius: theme.spacing(2),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    sectionA: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    sectionB: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imgC: {
      position: 'relative',
      width: 400,
      height: 400,
      overflow: 'hidden',
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      boxShadow: '0 20px 15px -10px rgba(0,0,0,0.15)',
    },
    sBContainer: {
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 40px 25px -20px rgba(0,0,0,0.15)',
      padding: theme.spacing(2),
      minWidth: 500,
      borderRadius: theme.spacing(2),
      minHeight: 550,
    },
    sBHeader: {
      padding: `${theme.spacing(1)} 0`,
    },
    sBProductName: {
      color: '#424242',
    },
    sBMarketNameW: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    sBMarketIcon: {
      color: theme.palette.primary.main,
      fontSize: 30,
    },
    sBMarketName: {
      color: '#424242',
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
      width: '100%',
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.spacing(1),
      boxShadow: '0 5px 5px -2px rgba(0,0,0,0.15)',
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        boxShadow: '0 10px 15px -5px rgba(0,0,0,0.3)',
      },
    },
  }),
);

export default useStyles;
