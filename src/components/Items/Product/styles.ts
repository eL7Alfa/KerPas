import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { green, grey, red, yellow } from '@mui/material/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      display: 'flex',
      position: 'relative',
      transition:
        'opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 0.3s!important',
      '& .MuiButton-root': {
        flex: 1,
        padding: 0,
      },
      '&:hover': {
        [theme.breakpoints.up('sm')]: {
          transform: 'scale(1.05)',
        },
        '& $body': {
          boxShadow: '0 16px 20px -10px rgb(0 0 0 / 20%)',
          backgroundColor: '#ffffff',
        },
        '& $addToCartBtn': {
          opacity: 1,
        },
      },
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: '100%',
      borderRadius: theme.spacing(1),
      overflow: 'hidden',
      boxShadow: '0 1px 5px 0 rgb(0 0 0 / 14%)',
      backgroundColor: '#ffffff',
      padding: '0!important',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      textTransform: 'unset',
    },
    imgW: {
      position: 'relative',
      width: '100%',
      paddingTop: '100%',
      overflow: 'hidden',
      borderRadius: theme.spacing(1),
      boxShadow: '0 5px 5px -3px rgb(0 0 0 / 15%)',
      // minHeight: `calc(1200px / 6 - ${theme.spacing(2)})!important`,
      // maxHeight: `calc(1200px / 6 - ${theme.spacing(2)})!important`,
    },
    detailW: {
      padding: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    name: {
      fontSize: 12,
      textAlign: 'left',
      marginTop: 'auto',
      color: grey[800],
      textOverflow: 'ellipsis',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
      display: '-webkit-box',
      overflow: 'hidden',
    },
    priceW: {
      display: 'flex',
      flexDirection: 'row',
      fontSize: 14,
      fontWeight: 800,
      textAlign: 'left',
      color: grey[700],
      alignItems: 'center',
    },
    price: {
      textDecorationLine: 'line-through',
    },
    discount: {
      color: '#ffffff',
      backgroundColor: red[500],
      textDecorationLine: 'unset',
      padding: '2px 6px',
      textAlign: 'center',
      borderRadius: 20,
      marginLeft: theme.spacing(1),
    },
    fixedPrice: {
      fontSize: 14,
      fontWeight: 800,
      textAlign: 'left',
      color: green[800],
    },
    maxRequest: {
      fontSize: 11,
      textAlign: 'left',
      color: red[500],
    },
    addToCartBtn: {
      [theme.breakpoints.up('sm')]: {
        opacity: 0,
      },
      transition: 'opacity 0.3s, background-color 0.3s, box-shadow 0.3s',
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1),
      zIndex: 1,
      backgroundColor: yellow[600],
      boxShadow: '0 2px 5px 0 rgb(0 0 0 / 20%)',
      color: grey[800],
      '&:hover': {
        backgroundColor: yellow[700],
        boxShadow: '0 8px 10px -1px rgb(0 0 0 / 15%)',
      },
    },
  }),
);

export default useStyles;
