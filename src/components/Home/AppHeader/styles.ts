import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { alpha } from '@mui/material';
import { green, grey, yellow } from '@mui/material/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '&.MuiPaper-root': {
        boxShadow: '0 1px 5px rgb(0 0 0 / 18%)',
        backgroundColor: '#ffffff',
        color: '#424242',
        width: '100%',
      },
    },
    title: {
      textOverflow: 'unset',
      color: theme.palette.primary.main,
      [theme.breakpoints.up('lg')]: {
        minWidth: 'calc((100% - 1200px) / 4)',
      },
    },
    searchW: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      justifyContent: 'center',
      display: 'flex',
      flex: 1,
    },
    search: {
      display: 'flex',
      position: 'relative',
      width: '60%',
      transition: theme.transitions.create('width'),
      borderRadius: 10,
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.15),
      },
      marginLeft: 0,
      overflow: 'hidden',
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.primary.main,
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
      paddingRight: theme.spacing(1),
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      [theme.breakpoints.up('sm')]: {},
    },
    toolbarItemRight: {
      display: 'flex',
      flexFlow: 'row nowrap',
      [theme.breakpoints.up('lg')]: {
        minWidth: 'calc((100% - 1200px) / 4)',
      },
    },
    cartBtn: {
      backgroundColor: 'rgba(0,0,0,0)',
      color: theme.palette.primary.main,
    },
    loginButton: {
      backgroundColor: theme.palette.secondary.main,
      color: '#ffffff',
      marginLeft: theme.spacing(1),
      borderRadius: 8,
      '&.MuiButton-root': {
        boxShadow: `0px 2px 5px -2px ${alpha(
          theme.palette.secondary.main,
          0.5,
        )}`,
        fontWeight: '800',
        '&:hover': {
          boxShadow: `0px 8px 8px -4px ${alpha(
            theme.palette.secondary.main,
            0.7,
          )}`,
          backgroundColor: theme.palette.secondary.main,
        },
      },
    },
    searchBtn: {
      backgroundColor: theme.palette.primary.main,
      color: '#ffffff',
      marginLeft: theme.spacing(1),
      borderRadius: 0,
      '&.MuiButton-root': {
        fontWeight: '800',
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
        },
      },
    },
  }),
);

export default useStyles;
