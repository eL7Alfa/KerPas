import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('sm')]: {
        minWidth: '600px',
        margin: 'auto 10px',
      },
      [theme.breakpoints.down('lg')]: {
        margin: '10px',
      },
      height: 'fit-content',
      borderRadius: 10,
      boxShadow: '0 25px 20px -10px rgba(0,0,0,0.3)',
    },
    header: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: theme.spacing(4),
      [theme.breakpoints.down('sm')]: {
        paddingTop: theme.spacing(2),
      },
      color: '#ffffff',
    },
    shapeA: {
      bottom: 60,
      position: 'absolute',
      backgroundColor: theme.palette.primary.main,
      width: '200%',
      paddingTop: '100%',
      borderRadius: '50%',
      boxShadow: '0 5px 15px 0 rgba(0,0,0,0.15)',
    },
    title: {
      zIndex: 1,
      maxWidth: '70%',
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        fontSize: 18,
      },
    },
    logoW: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
      '& .MuiAvatar-root': {
        width: 120,
        height: 120,
        borderRadius: 120 / 2,
        [theme.breakpoints.down('sm')]: {
          width: 80,
          height: 80,
          borderRadius: 80 / 2,
        },
        padding: 10,
        backgroundColor: '#ffffff',
      },
    },
    logoC: {
      border: `12px ${theme.palette.primary.main} solid`,
      [theme.breakpoints.down('sm')]: {
        borderWidth: 8,
      },
      borderRadius: '50%',
      boxShadow: '0 18px 15px -5px rgba(0,0,0,0.15)',
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      padding: `${theme.spacing(4)} ${theme.spacing(6)}`,
      paddingBottom: `${theme.spacing(10)}!important`,
      [theme.breakpoints.down('sm')]: {
        padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
        paddingBottom: `${theme.spacing(4)}!important`,
      },
    },
    featuredServiceW: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      margin: `${theme.spacing(1)} 0`,
      '& .MuiTypography-root': {
        marginLeft: theme.spacing(2),
        color: grey[700],
      },
    },
    fSIconW: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.palette.primary.main,
      minWidth: 50,
      height: 50,
      [theme.breakpoints.down('sm')]: {
        minWidth: 40,
        height: 40,
      },
      borderRadius: 8,
      boxShadow: '0 10px 15px -5px rgba(0,0,0,0.3)',
      '& .MuiSvgIcon-root': {
        fontSize: 32,
        [theme.breakpoints.down('sm')]: {
          fontSize: 24,
        },
        color: '#ffffff',
      },
    },
    featuredServiceText: {
      [theme.breakpoints.down('sm')]: {
        fontSize: 16,
      },
    },
  }),
);

export default useStyles;
