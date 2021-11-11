import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
      padding: `${theme.spacing(2)} ${theme.spacing(1)}`,
      overflow: 'hidden',
      height: 360,
      [theme.breakpoints.down('md')]: {
        height: 260,
      },
      [theme.breakpoints.down('sm')]: {
        height: 'auto',
      },
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
      color: '#ffffff',
    },
    showMoreBtn: {
      marginLeft: 'auto',
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
    imgBgW: {
      position: 'absolute',
      top: 0,
      left: theme.spacing(1),
      right: theme.spacing(1),
      bottom: 0,
    },
    imgBgC: {
      position: 'relative',
      width: '100%',
      paddingTop: '30%',
      borderRadius: theme.spacing(2),
      overflow: 'hidden',
    },
    itemW: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    },
    itemC: {
      display: 'flex',
      maxWidth: '55%',
      minWidth: '45%',
      height: 'fit-content',
      marginTop: theme.spacing(10),
      marginLeft: theme.spacing(5),
      [theme.breakpoints.down('md')]: {
        maxWidth: '70%',
        minWidth: '60%',
        marginTop: theme.spacing(6),
        marginLeft: theme.spacing(3),
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: '85%',
        minWidth: '75%',
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(2),
      },
    },
  }),
);

export default useStyles;
