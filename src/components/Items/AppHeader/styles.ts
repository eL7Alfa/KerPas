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
    sectionAToolbar: {
      minHeight: 'unset',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(0.5),
    },
    titleW: {
      [theme.breakpoints.up('lg')]: {
        minWidth: `calc((100% - 1200px) / 2)`,
      },
      justifyContent: 'unset',
    },
    title: {
      marginLeft: theme.spacing(1),
      fontWeight: 800,
      textOverflow: 'unset',
      color: theme.palette.primary.main,
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
        minWidth: `calc((100% - 1200px) / 2)`,
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: 'auto',
      },
      justifyContent: 'flex-end',
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
    userProfileBtn: {
      marginLeft: theme.spacing(1),
      position: 'relative',
      width: 40,
      minWidth: 40,
      height: 40,
      minHeight: 40,
      borderRadius: 20,
      overflow: 'hidden',
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
    sectionBToolbar: {
      padding: `${theme.spacing(0.5)} 0`,
      minHeight: `0!important`,
    },
    sectionBC: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: `0 ${theme.spacing(2)}`,
      overflow: 'hidden',
    },
    sBAddressW: {
      marginLeft: 'auto',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    sBAddressIcon: { color: theme.palette.primary.main },
    sBAddressLabel: {
      whiteSpace: 'nowrap',
    },
    sBAddressBtn: {
      textTransform: 'unset',
      padding: 0,
      minWidth: 0,
      whiteSpace: 'nowrap',
    },
    sBAddressName: {
      margin: `0 ${theme.spacing(0.5)}`,
      fontWeight: 800,
      color: '#000000',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    sBAddressSeparator: {
      margin: `0 ${theme.spacing(0.5)}`,
      fontWeight: 800,
      color: '#000000',
    },
    sBAddress: {
      margin: `0 ${theme.spacing(0.5)}`,
      fontWeight: 'normal',
      color: '#000000',
      maxWidth: 200,
      [theme.breakpoints.down('sm')]: {
        maxWidth: 150,
      },
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    sBAddressKArrowDown: {
      fontSize: 16,
      color: '#000000',
    },
    sBSelectAddress: {
      margin: `0 ${theme.spacing(0.5)}`,
      fontWeight: 800,
      color: theme.palette.secondary.main,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  }),
);

export default useStyles;
