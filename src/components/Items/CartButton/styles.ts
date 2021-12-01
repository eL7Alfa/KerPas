import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { yellow } from '@mui/material/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cartButton: {
      backgroundColor: '#ffffff',
      borderRadius: 8,
      '&.MuiButton-root': {
        boxShadow:
          '0px 3px 1px -2px rgba(254,204,43,0.2), 0px 2px 2px 0px rgba(254,204,43,0.1), 0px 1px 5px 0px rgba(254,204,43,0.08)',
        color: theme.palette.background.default,
        '&:hover': {
          boxShadow:
            '0px 5px 10px 5px rgba(254,204,43,0.3), 0px 5px 2px 0px rgba(254,204,43,0.1), 0px 1px 5px 0px rgba(254,204,43,0.08)',
          backgroundColor: theme.palette.secondary.main,
        },
      },
    },
    badgeItemNumber: {
      '& .MuiBadge-badge': {
        top: '10%',
        right: '10%',
        backgroundColor: theme.palette.secondary.main,
        color: '#ffffff',
      },
    },
    popper: {
      zIndex: 9999,
    },
    cartMenuPaperW: {
      paddingTop: 10,
    },
    paperPopCartList: {
      minWidth: 300,
      padding: '10px 0',
      borderRadius: 10,
      boxShadow:
        '0 13px 27px -5px rgb(50 50 93 / 25%), 0 8px 16px -8px rgb(0 0 0 / 30%), 0 -6px 16px -6px rgb(0 0 0 / 3%)',
      [theme.breakpoints.up('sm')]: {
        minWidth: 400,
      },
    },
    cMPHeader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    },
    cMPHTitleW: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    cMPHTitleIcon: {
      color: theme.palette.primary.main,
    },
    cMPHTitle: {
      color: '#424242',
      fontWeight: 800,
      padding: `0 ${theme.spacing(1)}`,
    },
    showAllItemBtn: {
      color: theme.palette.primary.main,
      fontWeight: 800,
      padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
      fontSize: 16,
      borderRadius: theme.spacing(1),
    },
    cMPBody: {
      display: 'flex',
      flexDirection: 'column',
    },
    cMPItemImage: {
      borderRadius: theme.spacing(0.5),
      width: 50,
      height: 50,
    },
    cMPItemInfoW: {
      display: 'flex',
      flexDirection: 'column',
    },
    cMPItemName: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      [theme.breakpoints.up('sm')]: {
        maxWidth: theme.breakpoints.values.sm,
      },
      overflow: 'hidden',
      color: '#424242',
      fontWeight: 800,
    },
    cMPItemQty: {
      fontSize: 12,
      color: '#424242',
    },
    cMPItemPrice: {
      color: yellow[900],
      fontWeight: 800,
    },
    cMPThreeDotsW: {
      padding: `0 ${theme.spacing(2)}`,
    },
    cMPThreeDots: {
      color: '#424242',
      fontWeight: 800,
      fontSize: 18,
    },
    cMPFooter: {
      display: 'flex',
      flexDirection: 'column',
      padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
      alignItems: 'flex-end',
    },
    cMPItemTotal: {
      color: theme.palette.primary.main,
      fontWeight: 800,
    },
  }),
);

export default useStyles;
