import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      backgroundColor: theme.palette.background.paper,
      padding: `${theme.spacing(2)} 0`,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: theme.breakpoints.values.sm,
      minWidth: theme.breakpoints.values.sm,
      borderRadius: 10,
    },
    header: {
      padding: `0 ${theme.spacing(2)}`,
    },
  }),
);

export default useStyles;
