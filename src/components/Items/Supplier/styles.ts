import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: `calc(1200px / 6 - ${theme.spacing(2)})!important`,
      maxHeight: `calc(1200px / 6 - ${theme.spacing(2)})!important`,
      display: 'flex',
      position: 'relative',
      transition: 'all 0.3s',
      '& .MuiButton-root': {
        flex: 1,
        padding: 0,
      },
      '&:hover': {
        transform: 'scale(1.05)',
        '& $body': {
          boxShadow: '0 16px 20px -10px rgb(0 0 0 / 30%)',
        },
      },
    },
    body: {
      display: 'flex',
      position: 'relative',
      width: '100%',
      height: '100%',
      boxShadow: '0 2px 5px 0 rgb(0 0 0 / 14%)',
      borderRadius: theme.spacing(1),
      overflow: 'hidden',
      backgroundColor: '#ffffff',
    },
    imgW: {
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius: theme.spacing(0.5),
    },
    detailW: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      padding: theme.spacing(1),
      background:
        'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,212,255,0) 100%)',
      display: 'flex',
      flexDirection: 'column',
    },
    name: {
      fontSize: 14,
      fontWeight: 800,
      textAlign: 'left',
      marginTop: 'auto',
      color: '#ffffff',
    },
    marketName: {
      fontSize: 12,
      textAlign: 'left',
      color: '#ffffff',
    },
    block: {
      fontSize: 12,
      textAlign: 'left',
      color: '#ffffff',
    },
    locationIcon: {
      fontSize: 18,
      color: '#62ac42',
    },
    location: {
      display: 'flex',
      fontSize: 12,
      textAlign: 'left',
      color: '#ffffff',
      alignItems: 'center',
    },
  }),
);

export default useStyles;
