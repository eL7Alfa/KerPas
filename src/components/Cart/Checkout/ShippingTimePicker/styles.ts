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
      boxShadow: '0 20px 20px -10px rgba(0,0,0,0.3)',
      zIndex: 1,
      overflow: 'hidden',
    },
    header: {
      padding: theme.spacing(1),
    },
    hTitle: {
      color: grey[800],
      fontWeight: 800,
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
    },
    pickerBtn: {
      backgroundColor: '#ffffff',
      color: yellow[900],
      borderRadius: 0,
      fontWeight: 800,
      width: '100%',
      boxShadow: 'none',
      '&.active': {
        backgroundColor: alpha(theme.palette.tertiary.main, 0.3),
        '&:hover': {
          backgroundColor: alpha(theme.palette.tertiary.main, 0.3),
        },
      },
      '&:hover': {
        backgroundColor: '#ffffff',
        color: yellow[900],
        boxShadow: 'none',
      },
    },
  }),
);

export default useStyles;
