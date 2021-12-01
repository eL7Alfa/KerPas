import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    sectionA: {
      display: 'flex',
      flexDirection: 'row',
      paddingLeft: theme.spacing(1),
    },
    catW: {
      display: 'block',
      width: 'calc(100% - 300px)',
    },
    catMW: {
      width: '100%',
      marginTop: theme.spacing(4),
    },
  }),
);

export default useStyles;
