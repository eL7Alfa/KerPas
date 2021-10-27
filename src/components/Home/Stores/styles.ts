import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { alpha } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(1),
      position: 'relative',
      borderRadius: theme.spacing(1),
      background: `linear-gradient(45deg, ${
        theme.palette.tertiary.main
      } 0%, ${alpha(theme.palette.tertiary.main, 0.7)} 100%)`,
      [theme.breakpoints.down('lg')]: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: theme.spacing(0),
        borderTopLeftRadius: theme.spacing(0),
      },
      '&:hover': {
        '& $nextIconBtn': {
          right: theme.spacing(2),
          opacity: 1,
        },
        '& $prevIconBtn': {
          left: theme.spacing(2),
          opacity: 1,
        },
      },
    },
    title: {
      color: '#ffffff',
    },
    itemsW: {
      paddingTop: theme.spacing(2),
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
      left: -15,
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
      right: -15,
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
