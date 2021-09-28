import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
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
      overflowX: 'hidden',
    },
    gridItem: { display: 'flex' },
    prevIconBtn: {
      position: 'absolute',
      left: 15,
      boxShadow: '0px 2px 5px 5px rgba(0,0,0,0.1)',
      transition: 'right 0.3s, opacity 0.3s',
      backgroundColor: '#ffffff',
      '&.Mui-disabled': {
        backgroundColor: '#dfdfdf',
        pointerEvents: 'unset',
      },
      '&:hover': {
        backgroundColor: '#ffffff',
        boxShadow: '0px 10px 10px 5px rgba(0,0,0,0.1)',
        '&.Mui-disabled': {
          backgroundColor: '#dfdfdf',
          pointerEvents: 'unset',
          boxShadow: 'unset',
        },
      },
    },
    nextIconBtn: {
      position: 'absolute',
      right: 15,
      boxShadow: '0px 2px 5px 5px rgba(0,0,0,0.1)',
      transition: 'right 0.3s, opacity 0.3s',
      backgroundColor: '#ffffff',
      '&.Mui-disabled': {
        backgroundColor: '#dfdfdf',
        pointerEvents: 'unset',
      },
      '&:hover': {
        backgroundColor: '#ffffff',
        boxShadow: '0px 10px 10px 5px rgba(0,0,0,0.1)',
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
