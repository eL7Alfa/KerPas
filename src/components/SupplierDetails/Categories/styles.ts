import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      '&:hover': {
        '& $nextIconBtn': {
          right: theme.spacing(3),
          opacity: 1,
        },
        '& $prevIconBtn': {
          left: theme.spacing(3),
          opacity: 1,
        },
      },
    },
    title: {
      color: grey[800],
    },
    hListW: {
      display: 'flex',
      alignItems: 'center',
    },
    itemsW: {
      marginTop: theme.spacing(-5),
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(4),
      display: 'flex',
      flexFlow: 'row nowrap',
      overflowX: 'auto',
      [theme.breakpoints.down('sm')]: {
        scrollSnapType: 'x mandatory',
      },
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    gridItem: { display: 'flex' },
    prevIconBtn: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
      opacity: 0,
      position: 'absolute',
      left: 15,
      boxShadow: '0px 2px 5px 2px rgba(0,0,0,0.1)',
      transition: 'left 0.3s, opacity 0.3s, box-shadow 0.3s',
      backgroundColor: '#ffffff',
      '&.Mui-disabled': {
        backgroundColor: '#dfdfdf',
        pointerEvents: 'unset',
      },
      '&:hover': {
        backgroundColor: '#ffffff',
        boxShadow: '0px 5px 10px 2px rgba(0,0,0,0.1)',
        '&.Mui-disabled': {
          backgroundColor: '#dfdfdf',
          pointerEvents: 'unset',
          boxShadow: 'unset',
        },
      },
    },
    nextIconBtn: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
      opacity: 0,
      position: 'absolute',
      right: 15,
      boxShadow: '0px 2px 5px 2px rgba(0,0,0,0.1)',
      transition: 'right 0.3s, opacity 0.3s, box-shadow 0.3s',
      backgroundColor: '#ffffff',
      '&.Mui-disabled': {
        backgroundColor: '#dfdfdf',
        pointerEvents: 'unset',
      },
      '&:hover': {
        backgroundColor: '#ffffff',
        boxShadow: '0px 5px 10px 2px rgba(0,0,0,0.1)',
        '&.Mui-disabled': {
          backgroundColor: '#dfdfdf',
          pointerEvents: 'unset',
          boxShadow: 'unset',
        },
      },
    },
  }),
);

export default useStyles;
