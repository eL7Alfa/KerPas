import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { alpha } from '@mui/material';
import { blue } from '@mui/material/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      flex: 1,
      position: 'relative',
      margin: 'auto 10px',
      padding: `${theme.spacing(4)} ${theme.spacing(4)}`,
      maxWidth: 400,
      [theme.breakpoints.up('sm')]: {
        minWidth: 400,
      },
      borderRadius: 10,
      boxShadow: '0 25px 20px -10px rgba(0,0,0,0.3)',
    },
    textField: {
      margin: `${theme.spacing(1)} 0`,
      '& .MuiFilledInput-root': {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
      },
      '& .Mui-focused': {
        color: '#000000',
      },
    },
    submitBtn: {
      margin: `${theme.spacing(2)} 0`,
      width: '70%',
      background: `linear-gradient(47deg, ${alpha(
        theme.palette.primary.main,
        1,
      )} 0%, ${alpha(theme.palette.primary.main, 0.7)} 100%)`,
      borderRadius: 20,
      fontSize: 18,
      '&:hover': {
        background: `linear-gradient(47deg, ${alpha(
          theme.palette.primary.main,
          1,
        )} 0%, ${alpha(theme.palette.primary.main, 0.7)} 100%)`,
      },
    },
    orSocialBtnW: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    socialAuthW: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `${theme.spacing(2)} 0`,
    },
    facebookBtn: {
      padding: 0,
      '& .MuiSvgIcon-root': {
        fontSize: 45,
        color: blue[500],
      },
    },
    toRegisterW: {
      display: 'flex',
      flexDirection: 'row',
      '& .MuiButtonBase-root': {
        marginLeft: theme.spacing(1),
        color: theme.palette.primary.main,
      },
    },
    shapeA: {
      position: 'absolute',
      top: -30,
      right: 40,
      width: 80,
      height: 80,
      borderRadius: 50,
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
      boxShadow: '-8px 10px 10px -5px rgba(0,0,0,0.15)',
    },
    shapeB: {
      position: 'absolute',
      top: 65,
      right: 65,
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
      boxShadow: '-8px 10px 10px -5px rgba(0,0,0,0.15)',
    },
    shapeC: {
      position: 'absolute',
      top: '55%',
      left: -20,
      width: 80,
      height: 80,
      borderRadius: 50,
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
      boxShadow: '-8px 10px 10px -5px rgba(0,0,0,0.15)',
    },
    shapeD: {
      position: 'absolute',
      top: '70%',
      left: 60,
      width: 30,
      height: 30,
      borderRadius: 50,
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
      boxShadow: '-8px 10px 10px -5px rgba(0,0,0,0.15)',
    },
    closeAuthBtn: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
  }),
);

export default useStyles;
