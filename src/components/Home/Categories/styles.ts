import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    title: {
      color: grey[800],
    },
    itemsW: {
      marginTop: theme.spacing(-5),
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(1),
      display: 'flex',
      flexFlow: 'row nowrap',
      overflowX: 'auto',
    },
    gridItem: { display: 'flex' },
  }),
);

export default useStyles;
