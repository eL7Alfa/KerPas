import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      '&:hover': {
        '& $autoPlay': {
          boxShadow: '0 15px 20px -5px rgb(0 0 0 / 15%)',
        },
        '& $nextIconButton': {
          right: theme.spacing(3),
          opacity: 1,
        },
        '& $backIconButton': {
          left: theme.spacing(3),
          opacity: 1,
        },
      },
    },
    autoPlay: {
      transition: 'box-shadow 0.3s',
      borderRadius: 16,
      overflow: 'hidden',
      width: '100%',
      boxShadow: '0 10px 15px -5px rgb(0 0 0 / 10%)',
      '& div': {
        position: 'relative!important',
        height: '100%',
      },
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      height: 50,
      paddingLeft: theme.spacing(4),
      backgroundColor: theme.palette.background.default,
    },
    imgW: {
      display: 'block',
      height: (1200 - 16) / 4,
      minHeight: (1200 - 16) / 4,
      [theme.breakpoints.down('md')]: {
        height: 'calc((100vw - 16px) / 3)',
        minHeight: 'calc((100vw - 16px) / 3)',
      },
      width: '100%',
      minWidth: '100%',
      padding: 0,
      position: 'relative',
    },
    mobileStepper: {
      position: 'absolute',
      bottom: theme.spacing(1),
      backgroundColor: 'unset',
      right: theme.spacing(2),
      '& .MuiMobileStepper-dotActive': {
        backgroundColor: theme.palette.primary.main,
      },
    },
    backIconButton: {
      opacity: 0,
      transition: 'left 0.3s, opacity 0.3s, box-shadow 0.3s',
      backgroundColor: '#ffffff',
      position: 'absolute',
      left: -20,
      boxShadow: '0px 2px 5px 2px rgba(0,0,0,0.1)',
      '&:disabled': {
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
    nextIconButton: {
      opacity: 0,
      transition: 'right 0.3s, opacity 0.3s, box-shadow 0.3s',
      backgroundColor: '#ffffff',
      position: 'absolute',
      right: -20,
      boxShadow: '0px 2px 5px 2px rgba(0,0,0,0.1)',
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
