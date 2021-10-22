import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(40px)',
      backgroundColor: 'rgba(0,0,0,0.15)',
      overflowY: 'auto',
    },
  }),
);

export default useStyles;
