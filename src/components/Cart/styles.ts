import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
    },
    cartSection: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    cartHeader: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: `${theme.spacing(1)}`,
    },
    cartHeaderIcon: {
      color: theme.palette.primary.main,
      fontSize: theme.spacing(3.5),
    },
    cartHeaderTitle: {
      marginLeft: theme.spacing(1),
      color: '#424242',
      fontWeight: 800,
    },
  }),
);

export default useStyles;
