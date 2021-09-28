import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { alpha } from '@mui/material';

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
      paddingRight: theme.spacing(1),
    },
    searchW: {
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
      backgroundColor: alpha(theme.palette.secondary.main, 0.25),
      '&:hover': {
        backgroundColor: alpha(theme.palette.secondary.main, 0.25),
      },
      marginLeft: 0,
      paddingRight: theme.spacing(1),
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
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      [theme.breakpoints.up('sm')]: {},
    },
    toolbarItemRight: {
      display: 'flex',
      flexFlow: 'row nowrap',
      // marginLeft: 'auto',
    },
    loginButton: {
      backgroundColor: theme.palette.secondary.main,
      marginLeft: theme.spacing(1),
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
  }),
);

export default useStyles;
