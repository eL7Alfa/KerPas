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
    header: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    title: {
      color: grey[800],
    },
    showMoreBtn: {
      color: '#424242',
      fontWeight: 800,
      borderRadius: theme.spacing(3),
    },
    showMoreArrowDown: {
      fontSize: 16,
      color: '#424242',
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
