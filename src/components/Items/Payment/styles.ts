import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

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
      color: theme.palette.primary.main,
      width: 36,
      height: 36,
      borderRadius: 36 / 2,
    },
    title: {
      marginLeft: theme.spacing(1),
      fontWeight: 800,
      color: '#424242',
    },
    body: { display: 'flex', flexDirection: 'column' },
    imgW: {
      position: 'relative',
      width: 80,
      height: 80,
      margin: '0 auto',
    },
  }),
);

export default useStyles;
