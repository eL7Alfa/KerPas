import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { grey, yellow } from '@mui/material/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: grey[50],
      padding: theme.spacing(2),
      margin: `0 ${theme.spacing(1)}`,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      borderRadius: theme.spacing(2),
      boxShadow: '0 5px 5px -2px rgba(0,0,0,0.15)',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    infoW: {
      padding: `0 ${theme.spacing(1)}`,
      width: '100%',
    },
    oopsSmall: {
      fontSize: 36,
      fontWeight: 800,
      color: grey[800],
      textAlign: 'center',
    },
    infoSmall: {
      fontSize: 20,
      fontWeight: 800,
      color: yellow[900],
      textAlign: 'center',
    },
  }),
);

export default useStyles;
