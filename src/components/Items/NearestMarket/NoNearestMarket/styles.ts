import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { green, yellow } from '@mui/material/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: green[50],
      padding: theme.spacing(2),
      margin: `0 ${theme.spacing(1)}`,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
      borderRadius: theme.spacing(2),
      boxShadow: '0 10px 10px -5px rgba(0,0,0,0.15)',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    imgW: {
      position: 'relative',
      width: 300,
      height: 300,
      minWidth: 300,
      minHeight: 300,
      backgroundColor: '#f7f7f7',
      borderRadius: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        width: 200,
        height: 200,
        minWidth: 200,
        minHeight: 200,
      },
    },
    infoW: {
      padding: `0 ${theme.spacing(1)}`,
    },
    oops: {
      fontSize: 60,
      fontWeight: 800,
      color: yellow[900],
      [theme.breakpoints.down('sm')]: {
        fontSize: 36,
      },
    },
    info: {
      fontSize: 40,
      fontWeight: 800,
      color: yellow[900],
      [theme.breakpoints.down('sm')]: {
        fontSize: 24,
      },
    },
    instruction: {
      fontSize: 20,
      fontWeight: 800,
      color: green[700],
      [theme.breakpoints.down('sm')]: {
        fontSize: 16,
      },
    },
    showMoreBtn: {
      backgroundColor: theme.palette.tertiary.main,
      color: '#ffffff',
      fontWeight: 800,
      borderRadius: theme.spacing(3),
      boxShadow: '0 5px 5px -2px rgba(0,0,0,0.15)',
      '&:hover': {
        backgroundColor: theme.palette.tertiary.main,
        boxShadow: '0 10px 10px -5px rgba(0,0,0,0.15)',
      },
    },
    showMoreArrowDown: {
      fontSize: 16,
      color: '#ffffff',
    },
  }),
);

export default useStyles;
