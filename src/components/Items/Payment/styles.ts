import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { green, red } from '@mui/material/colors';
import { alpha } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        width: '95%',
      },
      maxWidth: theme.breakpoints.values.sm,
    },
    paper: {
      borderRadius: theme.spacing(2),
      overflow: 'hidden',
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      padding: theme.spacing(2),
      alignItems: 'center',
    },
    titleIcon: {
      fontSize: theme.typography.h5.fontSize,
      backgroundColor: theme.palette.primary.main,
      color: '#ffffff',
      width: 36,
      height: 36,
      padding: theme.spacing(0.8),
      borderRadius: 36 / 2,
    },
    title: {
      marginLeft: theme.spacing(1),
      fontWeight: 800,
      color: '#424242',
    },
    body: {},
  }),
);

export default useStyles;
