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
    },
    card: {
      margin: 'auto',
      width: '100%',
      maxWidth: 400,
      [theme.breakpoints.up('sm')]: {
        minWidth: 400,
      },
      borderRadius: 10,
      boxShadow: '0 15px 10px -5px rgba(0,0,0,0.3)',
    },
  }),
);

export default useStyles;
