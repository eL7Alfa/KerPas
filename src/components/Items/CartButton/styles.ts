import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

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
    popper: {
      zIndex: 9999,
    },
    cartMenuPaperW: {
      paddingTop: 10,
    },
    paperPopCartList: {
      minWidth: theme.breakpoints.values.xs,
      padding: '10px 0',
      borderRadius: 10,
      boxShadow:
        '0 13px 27px -5px rgb(50 50 93 / 25%), 0 8px 16px -8px rgb(0 0 0 / 30%), 0 -6px 16px -6px rgb(0 0 0 / 3%)',
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
    cMPItemName: {
      color: '#424242',
      fontWeight: 800,
    },
  }),
);

export default useStyles;
