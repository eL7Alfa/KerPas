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
    container: {
      backgroundColor: theme.palette.background.paper,
      padding: `${theme.spacing(2)}`,
      borderRadius: 10,
    },
    header: {
      padding: `0 ${theme.spacing(2)}`,
    },
    body: {
      padding: theme.spacing(2),
    },
  }),
);

export default useStyles;
