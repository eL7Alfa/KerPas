import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      backdropFilter: 'blur(30px)',
      '& .MuiBackdrop-root': {
        backgroundColor: 'rgba(0,0,0,0.15)',
      },
    },
    box: {
      display: 'flex',
      marginTop: 'auto',
      marginBottom: 'auto',
      [theme.breakpoints.down('sm')]: {
        width: '90%',
      },
    },
  }),
);

export default useStyles;
