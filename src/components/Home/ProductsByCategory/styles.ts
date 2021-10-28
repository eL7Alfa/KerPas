import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      borderBottom: `1px ${grey[500]}`,
      marginTop: theme.spacing(4),
    },
    title: {
      color: grey[800],
    },
    itemsW: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(4),
      display: 'flex',
    },
    gridItem: { display: 'flex' },
  }),
);

export default useStyles;
