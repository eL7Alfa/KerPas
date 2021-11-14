import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      position: 'relative',
      width: `calc(100% - ${theme.spacing(2)})`,
      maxHeight: `calc(100% - ${theme.spacing(4)})`,
      [theme.breakpoints.up('sm')]: {
        width: 600,
      },
      backgroundColor: '#ffffff',
      borderRadius: theme.spacing(2),
      overflow: 'auto',
    },
    header: {
      position: 'relative',
      width: '100%',
      height: 400,
    },
    body: {
      display: 'flex',
      textAlign: 'justify',
      padding: theme.spacing(2),
    },
    closeBtn: {
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1),
    },
  }),
);

export default useStyles;
