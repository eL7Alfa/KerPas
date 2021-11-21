import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { alpha } from '@mui/material';
import { grey, yellow } from '@mui/material/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      padding: theme.spacing(1),
    },
    backdrop: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: alpha('#000000', 0.3),
      zIndex: 0,
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 20px 20px -10px rgba(0,0,0,0.3)',
      zIndex: 1,
      overflow: 'hidden',
      height: '100%',
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing(1),
    },
    closeAuthBtn: {
      marginLeft: 'auto',
      width: 30,
      height: 30,
    },
    hTitle: {
      color: grey[800],
      fontWeight: 800,
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
    },
    subTitle: {
      color: grey[800],
      fontWeight: 700,
      fontSize: 14,
      padding: theme.spacing(1),
    },
    pickerBtn: {
      backgroundColor: '#ffffff',
      borderRadius: 0,
      width: '100%',
      boxShadow: 'none',
      padding: 0,
      justifyContent: 'flex-start',
      textTransform: 'unset',
      '&.active': {
        backgroundColor: alpha(theme.palette.tertiary.main, 0.3),
        '&:hover': {
          backgroundColor: alpha(theme.palette.tertiary.main, 0.3),
        },
      },
      '&:hover': {
        backgroundColor: alpha(theme.palette.tertiary.main, 0.2),
        boxShadow: 'none',
      },
    },
    pBContainer: {
      display: 'flex',
      flexDirection: 'row',
      padding: theme.spacing(1),
    },
    pBIcon: {
      position: 'relative',
      width: 50,
      height: 50,
    },
    pBLabel: {
      padding: `0 ${theme.spacing(1)}`,
      fontWeight: 800,
      color: yellow[900],
    },
  }),
);

export default useStyles;
